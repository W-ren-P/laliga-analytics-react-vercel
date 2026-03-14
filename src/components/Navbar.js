import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-4" style={{backgroundColor: '#FF4B44'}}>
      <div className="container">
        <div className="d-flex align-items-center">
          <Link className="nav-link text-white p-0" to="/">Home</Link>
        </div>
        <div className="position-absolute start-50 translate-middle-x">
          <span className="text-white fw-bold" style={{fontSize: '1.5rem'}}>La Liga 2024-25 stats</span>
        </div>
        <div className="navbar-nav">
          <Link className="nav-link text-white" to="/teams">Teams</Link>
          <Link className="nav-link text-white" to="/players">Players</Link>
          <Link className="nav-link text-white" to="/referees">Referees</Link>
          <Link className="nav-link text-white" to="/matches">Matches</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
