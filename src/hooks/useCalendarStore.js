import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"


export const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { events, activeEvent} = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {

        if(calendarEvent._id) {
           // Si calendarEvent tiene id es que existe y se actualiza
           dispatch(onUpdateEvent( {...calendarEvent} ))
        } else {
            // Se crea añadiendo a la info de calendarEvent un id
            dispatch(onAddNewEvent( {...calendarEvent, _id: new Date().getTime()}))
        }

    }

    const startDelitingEvent =  () => {
        dispatch (onDeleteEvent())
    }


    return {
        //* Propiedades
        activeEvent,
        events, 
        hasEventSelected: !!activeEvent,

        //* Metodos
        startDelitingEvent,
        setActiveEvent,
        startSavingEvent,
    }
}
//hasEventSelected se ha creado con su valor directamente en el return