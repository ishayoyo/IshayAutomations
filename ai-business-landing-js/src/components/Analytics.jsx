import { useEffect } from 'react'

const Analytics = () => {
  useEffect(() => {
    // Debug environment variables
    console.log('Environment Variables Check:', {
      GA_ID: import.meta.env.VITE_GA_ID,
      CLARITY_ID: import.meta.env.VITE_CLARITY_ID
    });

    // Load Google Analytics Script
    const loadGoogleAnalytics = () => {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', import.meta.env.VITE_GA_ID);
      };
    };

    // Load Clarity Script
    const loadClarity = () => {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${import.meta.env.VITE_CLARITY_ID}");
      `;
      document.head.appendChild(script);
    };

    // Load analytics scripts if environment variables are present
    if (import.meta.env.VITE_GA_ID) {
      loadGoogleAnalytics();
    } else {
      console.warn('Google Analytics ID not found in environment variables');
    }

    if (import.meta.env.VITE_CLARITY_ID) {
      loadClarity();
    } else {
      console.warn('Clarity ID not found in environment variables');
    }

    // Function to check if scripts are loaded
    const checkScriptsLoaded = () => {
      return new Promise((resolve) => {
        const check = () => {
          if (window.clarity && window.gtag) {
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
      await checkScriptsLoaded();

      // Verify analytics are working
      const verifyAnalytics = () => {
        // Check Clarity
        if (window.clarity) {
          console.log('✅ Microsoft Clarity is working');
          // Test custom event
          window.clarity("event", "analytics_check");
        } else {
          console.warn('❌ Microsoft Clarity is not initialized');
          console.log('Clarity ID:', import.meta.env.VITE_CLARITY_ID);
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
          console.log('GA ID:', import.meta.env.VITE_GA_ID);
        }
      };

      // Run verification
      verifyAnalytics();

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
    };

    // Start initialization
    initializeAnalytics().catch(console.error);
  }, []);

  return null;
};

export default Analytics; 