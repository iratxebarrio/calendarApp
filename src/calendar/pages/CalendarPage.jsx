import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";
import { localizer, getMessagesEs } from "../../helpers";
import { useUiStore, useCalendarStore } from "../../hooks/";


export const CalendarPage = () => {

  //Recarga con la última vista
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week"
  );

  const {openDateModal} = useUiStore()
  const {events, setActiveEvent} = useCalendarStore()

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  //EVENTOS DEL CALENDARIO
  const onDoubleCLick = (event) => {
    console.log(event)
    openDateModal()
  };

  const onSelect = (event) => {
   setActiveEvent(event)
  };

  const onViewChanged = (event) => {
    console.log(event);
    //Guarda la última vista (mes, semana, dia, agenda) en LocalStorage para que al recargar salga la misma vista que en la última visita.
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  return (
    <>
      <NavBar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleCLick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
