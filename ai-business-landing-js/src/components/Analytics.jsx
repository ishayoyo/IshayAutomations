import { useEffect } from 'react'

const Analytics = () => {
  useEffect(() => {
    // Track page views
    const trackPageView = () => {
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
    };

    // Track clicks on important buttons
    const trackButtonClick = (buttonName) => {
      if (window.clarity) {
        window.clarity("event", `click_${buttonName}`);
      }
      if (window.gtag) {
        window.gtag('event', 'button_click', {
          button_name: buttonName
        });
      }
    };

    // Track form submissions
    const trackFormSubmission = (formName) => {
      if (window.clarity) {
        window.clarity("event", `form_submit_${formName}`);
      }
      if (window.gtag) {
        window.gtag('event', 'form_submission', {
          form_name: formName
        });
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

    // Initial page view
    trackPageView();

    // Track page views on route change
    const handleRouteChange = () => {
      trackPageView();
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