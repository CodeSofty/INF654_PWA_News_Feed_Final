// Check if browser supports service worker

if('serviceWorker' in navigator){
    // defer service worker installation until page completes loading
    window.addEventListener('load', () => {
                // Register service worker if supported
                navigator.serviceWorker.register('/sw.js').then(reg => {
                    // Display a success message
                    console.log(`Service Worker Registration (Scope: ${reg.scope}`);
                }).catch(error => {
                    // Display error message
                    console.log(`Service Worker Error (Error: ${error})`);
                });
    })
}else {
     // Happens when the app isn't served over TLS connection (HTTPS)

    // or if the browser doesn't support the service worker 
    console.log('Service Worker not available');
}