import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function useDisableBackNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    // Push current page to history and disable back button functionality
    window.history.pushState(null, '', window.location.href);
    
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      navigate('/');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState); // Clean up on unmount
    };
  }, [navigate]);
}

export default useDisableBackNavigation;
