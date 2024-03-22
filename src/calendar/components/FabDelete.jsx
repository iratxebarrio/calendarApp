
import { useCalendarStore, useUiStore } from "../../hooks"


export const FabDelete = () => {

    const {startDelitingEvent, hasEventSelected} = useCalendarStore()
    const {isDateModalOpen} = useUiStore()

    const handleDelete = () => {
      startDelitingEvent()
    }

  return (
   <button
   className="btn btn-danger fab-danger"
   onClick={handleDelete}
   style={{
    display: hasEventSelected && !isDateModalOpen ? '' : 'none'
   }}
   >
    <i className="fas fa-trash-alt"></i>
   </button>
  )
}
