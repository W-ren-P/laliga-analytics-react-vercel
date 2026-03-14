import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function TeamDetail() {
  const { teamName } = useParams();
  const [teamInfo, setTeamInfo] = useState(null);
  const [tableInfo, setTableInfo] = useState(null);
  const [topScorer, setTopScorer] = useState(null);

  useEffect(() => {
    const teamCode = (info) => info.team_code;

    fetch('/teams_info.json')
      .then(res => res.json())
      .then(data => {
        const team = data.find(t => t.team_name === teamName);
        setTeamInfo(team);

        fetch('/goals.json')
          .then(res => res.json())
          .then(goals => {
            const teamGoals = goals.filter(g => g.team_code === teamCode(team));
            const counts = {};
            teamGoals.forEach(g => {
              if (g.scorer_name) counts[g.scorer_name] = (counts[g.scorer_name] || 0) + 1;
            });
            const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
            setTopScorer(top ? { name: top[0], goals: top[1] } : null);
          });
      });

    fetch('/table.json')
      .then(res => res.json())
      .then(data => {
        const row = data.find(t => t.Team === teamName);
        setTableInfo(row);
      });
  }, [teamName]);

  if (!teamInfo || !tableInfo) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="text-center mb-4">
        <img src={`/badges/${teamName}.png`} alt={teamName}
          style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
        <h1 className="fw-bold mt-3">{teamName}</h1>
        <p>Established: {teamInfo.established}</p>
        <p>Stadium: {teamInfo.stadium}</p>
      </div>

      <div className="row justify-content-center g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title text-white p-2 rounded-top" style={{backgroundColor: '#FF4B44'}}>Top Scorer</h5>
              <p className="mb-1 mt-3 fs-5">{topScorer ? topScorer.name : 'N/A'}</p>
              <p className="fs-4 fw-bold">{topScorer ? topScorer.goals : 0} goals</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title text-white p-2 rounded-top" style={{backgroundColor: '#FF4B44'}}>Final Position</h5>
              <p className="fs-1 fw-bold mt-3">{tableInfo.Pos}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title text-white p-2 rounded-top" style={{backgroundColor: '#FF4B44'}}>Wins</h5>
              <p className="fs-1 fw-bold mt-3">{tableInfo.W}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title text-white p-2 rounded-top" style={{backgroundColor: '#FF4B44'}}>Goals Scored</h5>
              <p className="fs-1 fw-bold mt-3">{tableInfo.GF}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/teams" className="btn btn-secondary">← Back to Teams</Link>
      </div>
    </div>
  );
}

export default TeamDetail;
