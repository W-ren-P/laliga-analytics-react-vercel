import { useState, useEffect } from 'react';

function Referees() {
  const [refereeStats, setRefereeStats] = useState([]);
  const [view, setView] = useState('average');

  useEffect(() => {
    Promise.all([
      fetch('/referees.json').then(r => r.json()),
      fetch('/matches.json').then(r => r.json()),
      fetch('/match_cum_agg_stats.json').then(r => r.json()),
    ]).then(([referees, matches, stats]) => {

      // Sum cards per match (stats has 2 rows per match)
        const cardsByMatch = {};
        stats.forEach(s => {
        cardsByMatch[s.WS_match_id] = s.totalTotal_Cards || 0;
        });


      // For each referee, find their matches and total cards
      const result = referees.map(ref => {
        const refMatches = matches.filter(m => m.refereeCode === ref.ref_code);
        const totalCards = refMatches.reduce((sum, m) => sum + (cardsByMatch[m.WS_match_id] || 0), 0);
        const gamesRefereed = refMatches.length;
        const cardsPerGame = gamesRefereed > 0 ? (totalCards / gamesRefereed).toFixed(2) : 0;
        return {
          name: ref.ref_name,
          totalCards,
          gamesRefereed,
          cardsPerGame: parseFloat(cardsPerGame)
        };
      }).filter(r => r.gamesRefereed > 0);

      result.sort((a, b) => b.cardsPerGame - a.cardsPerGame);
      setRefereeStats(result);
    });
  }, []);

  const sorted = view === 'total'
    ? [...refereeStats].sort((a, b) => b.totalCards - a.totalCards)
    : [...refereeStats].sort((a, b) => b.cardsPerGame - a.cardsPerGame);

  const metric = view === 'total' ? 'totalCards' : 'cardsPerGame';
  const label = view === 'total' ? 'Total Cards' : 'Cards Per Game';

  return (
    <div className="container">
      <h1 className="fw-bold text-center mb-4">Referees</h1>

      <div className="mb-3">
        <select className="form-select w-auto"
          value={view} onChange={e => setView(e.target.value)}>
          <option value="average">Cards per game</option>
          <option value="total">Total cards</option>
        </select>
      </div>

      <table className="table table-striped table-hover bg-white shadow-sm">
        <thead>
          <tr>
            <th style={{backgroundColor: '#FF4B44', color: 'white'}}>Referee</th>
            <th style={{backgroundColor: '#FF4B44', color: 'white'}}>Games</th>
            <th style={{backgroundColor: '#FF4B44', color: 'white'}}>{label}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(ref => (
            <tr key={ref.name}>
              <td>{ref.name}</td>
              <td>{ref.gamesRefereed}</td>
              <td>{ref[metric]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Referees;
