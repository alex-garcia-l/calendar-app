import { useDispatch } from 'react-redux';

import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

import './login.css';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  /**
   * Login
   */

  const [formLoginValues, handleLoginInputChange] = useForm({
    loginEmail: 'mail@mail.com',
    loginPassword: 'password0',
  });
  const { loginEmail, loginPassword } = formLoginValues;

  const hanleLoginSubmit = (evt) => {
    evt.preventDefault();
    dispatch(startLogin(loginEmail, loginPassword));
  };

  /**
   * Register
   */

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    registerName: 'Nombre Prueba',
    registerEmail: 'mail@mail.com',
    registerPassword: 'password0',
    registerConfirmPassword: 'password0',
  });
  const { registerName, registerEmail, registerPassword, registerConfirmPassword } = formRegisterValues;

  const hanleRegisterSubmit = async (evt) => {
    evt.preventDefault();
    console.log(await dispatch(startRegister(registerName, registerEmail, registerPassword, registerConfirmPassword)));
  };

  return (
    <div className="container">
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Ingreso</h3>
            <form onSubmit={hanleLoginSubmit}>
              <div className="mb-3">
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Correo"
                  name="loginEmail"
                  value={loginEmail}
                  onChange={handleLoginInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  autoComplete="off"
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={handleLoginInputChange}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btnSubmit">
                  Login
                  <i className="fa-solid fa-right-to-bracket ms-2"></i>
                </button>
              </div>
            </form>
          </div>

          <div className="col-md-6 login-form-2">
            <h3>Registro</h3>
            <form onSubmit={hanleRegisterSubmit}>
              <div className="mb-3">
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="registerName"
                  value={registerName}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  autoComplete="off"
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="registerEmail"
                  value={registerEmail}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  autoComplete="off"
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="registerPassword"
                  value={registerPassword}
                  onChange={handleRegisterInputChange}
                />
              </div>

              <div className="mb-3">
                <input
                  autoComplete="off"
                  type="password"
                  className="form-control"
                  placeholder="Repita la contraseña"
                  name="registerConfirmPassword"
                  value={registerConfirmPassword}
                  onChange={handleRegisterInputChange}
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btnSubmit">
                  Crear cuenta
                  <i className="fa-solid fa-user-plus ms-2"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
