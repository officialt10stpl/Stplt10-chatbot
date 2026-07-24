import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import RegistrationForm from './components/Registration';
import './index.css';
import About from './pages/About';
import Teams from './pages/Teams';
import Sponsorship from './pages/Sponsorship';
import TrialCities from './pages/TrialCities';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import TermsConditions from './components/Terms';
import PrivacyPolicy from './components/PrivacyPolicy';
import TeamOwnerTerms from './components/TeamOwnerTerms';
import STPLBook from './components/STPLBook';
import RefundPolicy from './components/RefundPolicy';
import MediaPage from './components/Media';
import SuccessPage from './components/SuccessPage';
import PlayerDashboard from './components/PlayerDashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="about" element={<About />} />
          <Route path="teams" element={<Teams />} />
          <Route path="/sponsors" element={<Sponsorship />} />
          <Route path="/trial-cities" element={<TrialCities />} />
          <Route path="/secure-dashboard-stplt10admin-2026" element={<AdminPanel />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/team-owner-terms" element={<TeamOwnerTerms />} />
          <Route path="/stpl-book" element={<STPLBook />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/success" element={<SuccessPage />} />
          
          {/* 🔄 अगर कोई बिना आईडी के /dashboard खोले, तो उसे /login पर भेज दें */}
          <Route path="/dashboard" element={<Navigate to="/login" replace />} />
          
          {/* 🎫 खिलाड़ी का पर्सनल डैशबोर्ड (डायनेमिक आईडी के साथ) */}
          <Route path="/dashboard/:playerId" element={<PlayerDashboardRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

function PlayerDashboardRoute() {
  const { playerId } = useParams<{ playerId: string }>();
  return <PlayerDashboard playerId={playerId || ''} />;
}