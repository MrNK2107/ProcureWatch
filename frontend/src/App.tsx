import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import TenderExplorer from './pages/TenderExplorer';
import TenderDetail from './pages/TenderDetail';
import ClosingSoon from './pages/ClosingSoon';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tenders" element={<TenderExplorer />} />
        <Route path="/tender/:id" element={<TenderDetail />} />
        <Route path="/closing-soon" element={<ClosingSoon />} />
      </Routes>
    </Router>
  );
}

export default App;
