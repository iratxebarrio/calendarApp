import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root"); //El elemento html donde se recoge todo el html

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  // Con isDateModalOpen de uiSlice.js evitamos un useState de isOpenModal

  const [formSubmitted, setformSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    //Añadir una className de validación si corresponde

    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    //Actualiza el formulario con la información del evento activo
    if (activeEvent !== null) {
      setFormValues({
        ...activeEvent,
      });
    }
  }, [activeEvent]);

  //Change title and description
  const onInputChanged = ({ target }) => {
    setFormValues({
      //Trae las propiedades de formValues
      ...formValues,
      //Sobreescribe solo la que viene en el parametro
      [target.name]: target.value,
    });
  };
  // Change date (start and end)
  const onDateChanged = (event, changing) => {
    //changing es el start o el end
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  //Close modal
  const onCloseModal = () => {
    closeDateModal();
  };

  // Send form
  const onSubmit = async (event) => {
    event.preventDefault();
    setformSubmitted(true);
    //Calcular diferencia entre fecha final y fecha inicial
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      //Si falta una fecha por incluir dará difference = isNaN
      //Si coincide la fecha de start y end
      Swal.fire("Fechas incorrectas", "Revisar fechas introducidas", "error");
      return;
    }

    if (formValues.title.length <= 0) return;

    console.log(formValues);


    await startSavingEvent(formValues);
    closeDateModal();
    setformSubmitted(false)
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <div className="customDatePickerWidth">
            <label>Fecha y hora inicio</label>
            <DatePicker
              dateFormat={"Pp"}
              showTimeSelect
              selected={formValues.start}
              className="form-control"
              onChange={(event) => onDateChanged(event, "start")}
              locale="es" //calendario en español
              timeCaption="Hora" //Hora en español
            />
          </div>
        </div>

        <div className="form-group mb-2">
          <div className="customDatePickerWidth">
            <label>Fecha y hora fin</label>
            <DatePicker
              minDate={formValues.start} //No puede seleccionar fecha anterior a la de inicio
              dateFormat={"Pp"} //Poner la fecha en español y añadir la hora
              showTimeSelect
              selected={formValues.end}
              className="form-control"
              onChange={(event) => onDateChanged(event, "end")}
              locale="es"
              timeCaption="Hora"
            />
          </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
