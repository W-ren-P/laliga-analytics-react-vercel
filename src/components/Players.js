import { useState, useEffect } from 'react';

function Players() {
  const [goals, setGoals] = useState([]);
  const [beforeMins, setBeforeMins] = useState(15);
  const [afterMins, setAfterMins] = useState(75);

  useEffect(() => {
    fetch('/goals.json')
      .then(r => r.json())
      .then(data => setGoals(data));
  }, []);

  const topScorers = (filterFn) => {
    const counts = {};
    goals.filter(filterFn).forEach(g => {
      if (g.scorer_name) counts[g.scorer_name] = (counts[g.scorer_name] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([name, count]) => ({ name, count }));
  };

  const scorersBefore = topScorers(g => g.minute < beforeMins);
  const scorersAfter = topScorers(g => g.minute > afterMins);

  return (
    <div className="container">
      <h1 className="fw-bold text-center mb-4">Players</h1>
      <div className="row g-4">

        <div className="col-md-6">
          <div className="d-flex align-items-center mb-3 gap-3">
            <h5 className="mb-0">Goals before minute:</h5>
            <select className="form-select w-auto"
              value={beforeMins} onChange={e => setBeforeMins(Number(e.target.value))}>
              {[10, 15, 20, 30].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <table className="table table-striped table-hover bg-white shadow-sm">
            <thead>
              <tr>
                <th style={{backgroundColor: '#FF4B44', color: 'white'}}>Player</th>
                <th style={{backgroundColor: '#FF4B44', color: 'white'}}>Goals</th>
              </tr>
            </thead>
            <tbody>
              {scorersBefore.map(s => (
                <tr key={s.name}>
                  <td>{s.name}</td>
                  <td>{s.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
          <div className="d-flex align-items-center mb-3 gap-3">
            <h5 className="mb-0">Goals after minute:</h5>
            <select className="form-select w-auto"
              value={afterMins} onChange={e => setAfterMins(Number(e.target.value))}>
              {[60, 70, 75, 80, 85].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <table className="table table-striped table-hover bg-white shadow-sm">
            <thead>
              <tr>
                <th style={{backgroundColor: '#FF4B44', color: 'white'}}>Player</th>
                <th style={{backgroundColor: '#FF4B44', color: 'white'}}>Goals</th>
              </tr>
            </thead>
            <tbody>
              {scorersAfter.map(s => (
                <tr key={s.name}>
                  <td>{s.name}</td>
                  <td>{s.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Players;
