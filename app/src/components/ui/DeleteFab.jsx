import { useDispatch } from 'react-redux';

import { calendarEventStartDelete } from '../../actions/calendar';

export const DeleteFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(calendarEventStartDelete());
  };

  return (
    <button className="btn btn-danger fab fab-delete" onClick={handleClick}>
      <i className="fa-regular fa-calendar-minus"></i>
    </button>
  );
};
