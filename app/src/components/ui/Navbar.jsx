export const Navbar = () => {
  return (
    <div className="container">
      <header className="d-flex justify-content-between py-3 mb-4 border-bottom">
        <div>
          <span className="fs-4">Name</span>
        </div>

        <button type="button" className="btn btn-outline-danger me-2">
          <i className="fa-solid fa-right-from-bracket me-2"></i>
          Login
        </button>
      </header>
    </div>
  );
};
