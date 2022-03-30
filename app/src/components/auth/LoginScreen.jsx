import './login.css';

export const LoginScreen = () => {
  return (
    <div className="container">
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Ingreso</h3>
            <form>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Correo" />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Contraseña" />
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
            <form>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Nombre" />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Correo" />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Contraseña" />
              </div>

              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Repita la contraseña" />
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
