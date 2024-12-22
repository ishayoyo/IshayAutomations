import { useEffect } from 'react'

const Analytics = () => {
  useEffect(() => {
    // Debug environment variables
    console.log('Environment Variables Check:', {
      GA_ID: import.meta.env.VITE_GA_ID,
      CLARITY_ID: import.meta.env.VITE_CLARITY_ID
    });

    // Function to check analytics initialization
    const checkAnalytics = () => {
      console.log('Checking analytics initialization...');
      
      // Check Clarity
      if (window.clarity) {
        console.log('✅ Clarity is available');
        try {
          window.clarity("set", "analytics_check", "true");
          console.log('✅ Clarity set call successful');
        } catch (e) {
          console.error('❌ Clarity set call failed:', e);
        }
      } else {
        console.warn('❌ Clarity is not available');
      }

      // Check Google Analytics
      if (window.gtag) {
        console.log('✅ Google Analytics is available');
        try {
          window.gtag('event', 'test_event');
          console.log('✅ GA event call successful');
        } catch (e) {
          console.error('❌ GA event call failed:', e);
        }
      } else {
        console.warn('❌ Google Analytics is not available');
      }
    };

    // Initial check after a short delay
    setTimeout(checkAnalytics, 2000);

    // Track clicks on important buttons
    const trackButtonClick = (buttonName) => {
      console.log('Tracking button click:', buttonName);
      try {
        if (window.clarity) {
          window.clarity("set", "button_clicked", buttonName);
          console.log('✅ Clarity button click tracked');
        }
        if (window.gtag) {
          window.gtag('event', 'button_click', {
            button_name: buttonName
          });
          console.log('✅ GA button click tracked');
        }
      } catch (error) {
        console.error('Error tracking button click:', error);
      }
    };

    // Track form submissions
    const trackFormSubmission = (formName) => {
      console.log('Tracking form submission:', formName);
      try {
        if (window.clarity) {
          window.clarity("set", "form_submitted", formName);
          console.log('✅ Clarity form submission tracked');
        }
        if (window.gtag) {
          window.gtag('event', 'form_submission', {
            form_name: formName
          });
          console.log('✅ GA form submission tracked');
        }
      } catch (error) {
        console.error('Error tracking form submission:', error);
      }
    };

    // Add event listeners
    const addEventListeners = () => {
      console.log('Adding event listeners...');
      // Track CTA button clicks
      document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', () => {
          trackButtonClick(button.textContent.trim());
        });
      });

      // Track form submissions
      document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
          trackFormSubmission(form.id || 'contact_form');
        });
      });
      console.log('✅ Event listeners added');
    };

    // Track route changes
    const handleRouteChange = () => {
      console.log('Tracking page view');
      try {
        // For Clarity, we'll set the current page info instead of using pageview
        if (window.clarity) {
          window.clarity("set", "page_info", {
            title: document.title,
            url: window.location.href,
            path: window.location.pathname
          });
          console.log('✅ Clarity page info tracked');
        }
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
          });
          console.log('✅ GA pageview tracked');
        }
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    // Add event listeners after a delay to ensure DOM is ready
    setTimeout(addEventListeners, 2000);

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);

    // Initial page view
    setTimeout(handleRouteChange, 2000);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null;
};

export default Analytics; 