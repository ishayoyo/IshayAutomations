import { useEffect } from 'react'

const Analytics = () => {
  useEffect(() => {
    // Debug environment variables
    console.log('Environment Variables Check:', {
      GA_ID: import.meta.env.VITE_GA_ID,
      CLARITY_ID: import.meta.env.VITE_CLARITY_ID
    });

    // Function to check if scripts are loaded
    const checkScriptsLoaded = () => {
      return new Promise((resolve) => {
        const check = () => {
          // Check if both clarity and gtag are defined and ready
          if (
            typeof window.clarity === 'function' && 
            typeof window.gtag === 'function'
          ) {
            resolve(true);
          } else {
            setTimeout(check, 1000); // Check every second
          }
        };
        check();
      });
    };

    // Initialize analytics after scripts are loaded
    const initializeAnalytics = async () => {
      try {
        await checkScriptsLoaded();

        // Verify analytics are working
        const verifyAnalytics = () => {
          try {
            // Check Clarity
            if (typeof window.clarity === 'function') {
              console.log('✅ Microsoft Clarity is working');
              // Test custom event
              window.clarity("event", "analytics_check");
            } else {
              console.warn('❌ Microsoft Clarity is not initialized');
            }

            // Check Google Analytics
            if (typeof window.gtag === 'function') {
              console.log('✅ Google Analytics is working');
              // Test event
              window.gtag('event', 'analytics_check', {
                'event_category': 'verification',
                'event_label': 'startup'
              });
            } else {
              console.warn('❌ Google Analytics is not initialized');
            }
          } catch (error) {
            console.error('Error verifying analytics:', error);
          }
        };

        // Run verification
        verifyAnalytics();

        // Track page views
        const trackPageView = () => {
          try {
            if (typeof window.clarity === 'function') {
              window.clarity("pageview");
            }
            if (typeof window.gtag === 'function') {
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

        // Track clicks on important buttons
        const trackButtonClick = (buttonName) => {
          try {
            if (typeof window.clarity === 'function') {
              window.clarity("event", `click_${buttonName}`);
            }
            if (typeof window.gtag === 'function') {
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
            if (typeof window.clarity === 'function') {
              window.clarity("event", `form_submit_${formName}`);
            }
            if (typeof window.gtag === 'function') {
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
      } catch (error) {
        console.error('Error initializing analytics:', error);
      }
    };

    // Start initialization
    initializeAnalytics();
  }, []);

  return null;
};

export default Analytics; 