import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store"


export const useUiStore = () => {

    const dispatch = useDispatch()

    const {isDateModalOpen} = useSelector( state => state.ui )
  //UseSelector es un hook de React Redux para extraer datos del store a un componente de React.

 
    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }





return {
    //*Propiedades
    isDateModalOpen,


    //*Metodos
    openDateModal,
    closeDateModal


}

}