import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../actions/auth';

export const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleClick = () => {
    dispatch(startLogout());
  };

  return (
    <div className="container">
      <header className="d-flex justify-content-between py-3 mb-4 border-bottom">
        <div>
          <span className="fs-4">{name}</span>
        </div>

        <button type="button" className="btn btn-outline-danger me-2" onClick={handleClick}>
          <i className="fa-solid fa-right-from-bracket me-2"></i>
          Logout
        </button>
      </header>
    </div>
  );
};
