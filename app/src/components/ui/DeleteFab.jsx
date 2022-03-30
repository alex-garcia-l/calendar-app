import { useDispatch } from 'react-redux';

import { calendarDeleted } from '../../actions/calendar';

export const DeleteFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(calendarDeleted());
  };

  return (
    <button className="btn btn-danger fab fab-delete" onClick={handleClick}>
      <i className="fa-regular fa-calendar-minus"></i>
    </button>
  );
};
