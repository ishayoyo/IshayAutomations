import { useEffect } from 'react'

//update
const Analytics = () => {
  useEffect(() => {
    // Verify analytics are working
    const verifyAnalytics = () => {
      // Check Clarity
      if (window.clarity) {
        console.log('✅ Microsoft Clarity is working');
        // Test custom event
        window.clarity("event", "analytics_check");
      } else {
        console.warn('❌ Microsoft Clarity is not initialized');
      }

      // Check Google Analytics
      if (window.gtag) {
        console.log('✅ Google Analytics is working');
        // Test event
        window.gtag('event', 'analytics_check', {
          'event_category': 'verification',
          'event_label': 'startup'
        });
      } else {
        console.warn('❌ Google Analytics is not initialized');
      }
    };

    // Run verification after a short delay to ensure scripts are loaded
    setTimeout(verifyAnalytics, 2000);

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