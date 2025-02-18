import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas , PageLoder } from "./components";
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to check if the page is fully rendered
    const checkPageLoad = () => {
      if (document.readyState === 'complete') {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    // Add event listener for page load
    window.addEventListener('load', checkPageLoad);
    
    // Check immediately in case the page is already loaded
    checkPageLoad();

    // Cleanup
    return () => window.removeEventListener('load', checkPageLoad);
  }, []);


  return (
    <BrowserRouter>
          {isLoading && <PageLoder />}
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
