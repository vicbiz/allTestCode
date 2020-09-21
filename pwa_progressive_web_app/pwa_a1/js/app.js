if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((register) => console.log("service worker registered"))
    .catch((error) => console.log("service worker not registered", error));
}
