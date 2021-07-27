// Check that service workers are supported
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {

        if (Notification.permission == "default") {
            Notification.requestPermission(() => {
                if (Notification.permission == "denied") {
                    document.getElementById("notification").innerText = "Notification permission denied";
                } else if (Notification.permission == "granted") {
                    document.getElementById("notification").innerText = "Notification permission granted";
                }
            });
        } else if (Notification.permission == "denied") {
            document.getElementById("notification").innerText = "Notification permission denied";
        } else if (Notification.permission == "granted") {
            document.getElementById("notification").innerText = "Notification permission granted";
        }
        navigator.serviceWorker.register('./service-worker.js', {
                scope: '/'
            })
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                console.log('Service Worker is registered', registration);


                if (registration.active) {
                    // Background Sync
                    registration.sync.register('syncTag');
                }
            })
            .catch(err => {
                console.error('Registration failed:', err);
            });
    });
} else {
    console.log("Service worker not supported");
}

function backgroundSync() {
    document.getElementById("background-sync").innerText = document.getElementById("background-sync").innerText + "A";
}

function sendNotification() {
    new Notification("Test from Demo PWA");
}