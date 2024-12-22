import { useEffect } from 'react'

const Analytics = () => {
  useEffect(() => {
    // Debug environment variables
    console.log('Environment Variables Check:', {
      GA_ID: import.meta.env.VITE_GA_ID,
      CLARITY_ID: import.meta.env.VITE_CLARITY_ID
    });

    // Track clicks on important buttons
    const trackButtonClick = (buttonName) => {
      try {
        if (window.clarity) {
          window.clarity("event", "button_click", { buttonName });
        }
        if (window.gtag) {
          window.gtag('event', 'button_click', {
            button_name: buttonName
          });
        }
      } catch (error) {
        console.error('Error tracking button click:', error);
      }
    };

    // Track form submissions
    const trackFormSubmission = (formName) => {
      try {
        if (window.clarity) {
          window.clarity("event", "form_submit", { formName });
        }
        if (window.gtag) {
          window.gtag('event', 'form_submission', {
            form_name: formName
          });
        }
      } catch (error) {
        console.error('Error tracking form submission:', error);
      }
    };

    // Add event listeners
    const addEventListeners = () => {
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
    };

    // Track route changes
    const handleRouteChange = () => {
      try {
        if (window.clarity) {
          window.clarity("pageview");
        }
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
          });
        }
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    // Add event listeners after a short delay to ensure DOM is ready
    setTimeout(addEventListeners, 1000);

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null;
};

export default Analytics; 