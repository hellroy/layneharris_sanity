export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-33ESMK20KY'); // Replace 'G-XXXXXXXXXX' with your GA4 Measurement ID
  
      const scriptUrl = `https://www.googletagmanager.com/gtag/js?id=${'G-33ESMK20KY'}`; // Ensure Measurement ID is correct here too
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptUrl;
      document.head.appendChild(script);
    }
  });
  