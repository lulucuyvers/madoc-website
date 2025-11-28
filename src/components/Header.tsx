import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isProjectsPage = location.pathname.startsWith('/projecten');
  const isAboutPage = location.pathname === '/over-ons';
  
  return (
    <>
      <div className="col-span-1 pl-[6px] py-6">
        <Link to="/">
          <h1 className={isHomePage ? "text-black" : ""}>Madoc</h1>
        </Link>
      </div>
      {isHomePage && (
        <div className="col-span-1 pl-[6px] py-6 text-sm">
          <button className="text-blue-600 hover:text-blue-700 transition-colors">Nl</button>
          <span className="mx-1">|</span>
          <button className="hover:text-blue-600 transition-colors">En</button>
        </div>
      )}
      {!isHomePage && (
        <div className="col-span-1"></div>
      )}
      <div className="col-span-1 pl-[6px] py-6">
        <Link 
          to="/projecten" 
          className={isProjectsPage ? "text-blue-600 underline decoration-[0.5px] hover:text-blue-700 transition-colors" : "hover:text-blue-600 transition-colors"}
        >
          Projecten
        </Link>
      </div>
      <div className="col-span-1 pl-[6px] py-6">
        <Link 
          to="/over-ons" 
          className={isAboutPage ? "text-blue-600 underline decoration-[0.5px] hover:text-blue-700 transition-colors" : "hover:text-blue-600 transition-colors"}
        >
          Over ons
        </Link>
      </div>
    </>
  );
}
