import { useState, useEffect } from 'react';

const MATCH_STATS = {
  totalGoals: 'Total goals',
  totalShots: 'Total shots',
  totalShots_on_target: 'Shots on target',
  totalTotal_Cards: 'Total cards',
  totalRed_Cards: 'Red cards',
  totalFouls: 'Total fouls',
  totalPenalty_shots: 'Penalties',
  totalDribbles_won: 'Successful dribbles',
  totalLong_Balls: 'Long balls',
  totalCorners: 'Corners',
};

const TEAM_STATS = {
  Goals: 'Goals',
  Shots: 'Shots',
  Shots_on_target: 'Shots on target',
  Fouls: 'Fouls',
  Total_Cards: 'Cards',
  Total_Passes: 'Passes',
  Crosses: 'Crosses',
  Long_Balls: 'Long balls',
  Possession_percent: 'Possession (%)',
  Dribbles_won: 'Successful dribbles',
};

function Matches() {
  const [matchStats, setMatchStats] = useState([]);
  const [teamStats, setTeamStats] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedMatchStat, setSelectedMatchStat] = useState('totalGoals');
  const [selectedTeamStat, setSelectedTeamStat] = useState('Goals');

  useEffect(() => {
    Promise.all([
      fetch('/match_cum_agg_stats.json').then(r => r.json()),
      fetch('/team_match_stats.json').then(r => r.json()),
      fetch('/matches.json').then(r => r.json()),
      fetch('/teams.json').then(r => r.json()),
    ]).then(([matchCumStats, teamMatchStats, matchesData, teamsData]) => {
      setMatchStats(matchCumStats);
      setTeamStats(teamMatchStats);
      setMatches(matchesData);
      setTeams(teamsData);
    });
  }, []);

  const getMatchName = (matchId) => {
    const m = matches.find(m => m.WS_match_id === matchId);
    return m ? m.Match_name : matchId;
  };

  const getTeamName = (teamCode) => {
    const t = teams.find(t => t.team_code === teamCode);
    return t ? t.team_name : teamCode;
  };

  const top10Matches = [...matchStats]
    .sort((a, b) => b[selectedMatchStat] - a[selectedMatchStat])
    .slice(0, 10);

  const top10Teams = [...teamStats]
    .sort((a, b) => b[selectedTeamStat] - a[selectedTeamStat])
    .slice(0, 10);

  return (
    <div className="container">
      <h1 className="fw-bold text-center mb-4">Matches</h1>
      <div className="row g-4">

        <div className="col-md-7">
          <div className="d-flex align-items-center mb-3 gap-3">
            <h5 className="mb-0">Standout team performances:</h5>
            <select className="form-select w-auto"
              value={selectedTeamStat} onChange={e => setSelectedTeamStat(e.target.value)}>
              {Object.entries(TEAM_STATS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <table className="table table-striped table-hover bg-white shadow-sm">
            <thead>
              <tr>
                <th style={{backgroundColor: '#FF4B44', color: 'white'}}>Match</th>
                <th style={{backgroundColor: '#FF4B44', color: 'white'}}>Team</th>
                <th style={{backgroundColor: '#FF4B44', color: 'white'}}>{TEAM_STATS[selectedTeamStat]}</th>
              </tr>
            </thead>
            <tbody>
              {top10Teams.map((row, i) => (
                <tr key={i}>
                  <td>{getMatchName(row.match_id)}</td>
                  <td>{getTeamName(row.Team_Code)}</td>
                  <td>{row[selectedTeamStat]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-5">
          <div className="d-flex align-items-center mb-3 gap-3">
            <h5 className="mb-0">Standout matches:</h5>
            <select className="form-select w-auto"
              value={selectedMatchStat} onChange={e => setSelectedMatchStat(e.target.value)}>
              {Object.entries(MATCH_STATS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <table className="table table-striped table-hover bg-white shadow-sm">
            <thead>
              <tr>
                <th style={{backgroundColor: '#FF4B44', color: 'white'}}>Match</th>
                <th style={{backgroundColor: '#FF4B44', color: 'white'}}>{MATCH_STATS[selectedMatchStat]}</th>
              </tr>
            </thead>
            <tbody>
              {top10Matches.map((row, i) => (
                <tr key={i}>
                  <td>{getMatchName(row.WS_match_id)}</td>
                  <td>{row[selectedMatchStat]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Matches;
