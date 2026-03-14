import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Teams from './components/Teams';
import TeamDetail from './components/TeamDetail';
import Players from './components/Players';
import Referees from './components/Referees';
import Matches from './components/Matches';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamName" element={<TeamDetail />} />
        <Route path="/players" element={<Players />} />
        <Route path="/referees" element={<Referees />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </Router>
  );
}

export default App;