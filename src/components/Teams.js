import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('/teams.json')
      .then(res => res.json())
      .then(data => {
        const teamList = data.map(t => t.team_name).sort();
        setTeams(teamList);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="fw-bold text-center mb-4">Teams</h1>

        <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1rem'
        }}>
        {teams.map(team => (

            <Link to={`/teams/${team}`} className="text-decoration-none text-dark" key={team}>
            <div className="card h-100 shadow-sm text-center p-3">
                <img src={`/badges/${team}.png`} alt={team} style={{ width: '80px', height: '80px', objectFit: 'contain', margin: '0 auto' }} />
                <div className="card-body">
                <p className="fw-semibold mb-0">{team}</p>
                </div>
            </div>
            </Link>
            
        ))}
        </div>

    </div>
  );
}

export default Teams;
