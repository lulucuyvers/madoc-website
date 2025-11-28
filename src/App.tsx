import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { ContactInfo } from './components/ContactInfo';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isProjectsPage = location.pathname === '/projecten' || location.pathname.startsWith('/projecten/');
  const isAboutPage = location.pathname === '/over-ons';

  return (
    <div className="min-h-screen bg-white relative">
      {/* Vertical grid lines with page-specific visibility */}
      {/* First line (left-1/4): only on About page */}
      {isAboutPage && (
        <div className="fixed left-1/4 top-6 bottom-0 w-px bg-blue-600 z-50 pointer-events-none"></div>
      )}
      {/* Middle line (left-1/2): only on Projects pages */}
      {isProjectsPage && (
        <div className="fixed left-1/2 top-6 bottom-0 w-px bg-blue-600 z-50 pointer-events-none"></div>
      )}
      {/* Last line (left-3/4): on all pages except homepage */}
      {!isHomePage && (
        <div className="fixed left-3/4 top-6 bottom-0 w-px bg-blue-600 z-50 pointer-events-none"></div>
      )}
      
      {/* Sticky header */}
      <header className="sticky top-0 bg-white z-40 grid grid-cols-4">
        <Header />
      </header>
      
      <div className="grid grid-cols-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/over-ons" element={<About />} />
          <Route path="/projecten" element={<Projects />} />
          <Route path="/projecten/:slug" element={<ProjectDetail />} />
        </Routes>
        {!isHomePage && (
          <aside className="col-span-1">
            <ContactInfo />
          </aside>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
