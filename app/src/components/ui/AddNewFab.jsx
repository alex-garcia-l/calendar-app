import { useDispatch } from 'react-redux';

import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(uiOpenModal());
  };

  return (
    <button className="btn btn-primary fab fab-new" onClick={handleClick}>
      <i className="fa-regular fa-calendar-plus"></i>
    </button>
  );
};
