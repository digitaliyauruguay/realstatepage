import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function RootLayout() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  // Listen for custom page transition events
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    const handlePageTransition = () => {
      console.log('pageTransition event received in RootLayout');
      setIsTransitioning(true);
      timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    };

    window.addEventListener('pageTransition', handlePageTransition);
    return () => {
      window.removeEventListener('pageTransition', handlePageTransition);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC]">
      <Navbar />
      <main className="relative">
        <div className={`transition-all duration-300 ease-in-out ${
          isTransitioning 
            ? 'opacity-0 transform scale-95' 
            : 'opacity-100 transform scale-100'
        }`}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
