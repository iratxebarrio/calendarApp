

export const CalendarEvent = ({event}) => {
    const {user, title, notes} = event;


  return (
    <>
    <strong>{title} </strong>
    <span>{user.name} </span>
    <span>{notes}</span>

    </>
  ) 
}
