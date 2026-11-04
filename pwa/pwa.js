// pwa/pwa.js

let mySavedInstallPromptEvent = null;

// Register the service worker using async/await
async function myRegisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      // Automatically extracts the repository name (e.g., "/local-gemma4-pwa/")
      const myRepoScope = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
      
      const myRegistration = await navigator.serviceWorker.register(`${myRepoScope}sw.js`, {
        scope: myRepoScope
      });
      console.log("Dynamic PWA registered on scope:", myRegistration.scope);

      // Check if a new service worker is waiting or finds an update
      myRegistration.addEventListener("updatefound", () => {
        const myNewWorker = myRegistration.installing;
        myNewWorker.addEventListener("statechange", () => {
          if (myNewWorker.state === "installed" && navigator.serviceWorker.controller) {
            myShowUpdateNotification();
          }
        });
      });

      // Also check immediately on load if a worker is already waiting
      if (myRegistration.waiting && navigator.serviceWorker.controller) {
        myShowUpdateNotification();
      }

    } catch (myError) {
      console.error("PWA registration failed:", myError);
    }
  }
}

// Function to display an update button or banner to the user
function myShowUpdateNotification() {
  const myUpdateButton = document.getElementById("myPwaUpdateButton");
  if (myUpdateButton) {
    myUpdateButton.style.display = "inline-block";
  } else {
    // Fallback prompt if no button element exists in HTML yet
    if (confirm("A new version of this tool is available! Click OK to update.")) {
      myHandleUpdateButtonClick();
    }
  }
}

// Triggered via inline onclick handler from index.html for updating
function myHandleUpdateButtonClick() {
  navigator.serviceWorker.getRegistration().then((myReg) => {
    if (myReg && myReg.waiting) {
      // Send message to the service worker to skip waiting
      myReg.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  });
}

// Reload page once the new service worker takes control
let myRefreshing = false;
navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (!myRefreshing) {
    myRefreshing = true;
    window.location.reload();
  }
});

// Listen for the native browser install availability prompt
window.addEventListener("beforeinstallprompt", (myEvent) => {
  myEvent.preventDefault();
  mySavedInstallPromptEvent = myEvent;
  
  const myInstallButton = document.getElementById("myPwaInstallButton");
  if (myInstallButton) {
    myInstallButton.style.display = "inline-block";
  }
});

// Triggered via inline onclick handler from index.html for installing
async function myHandleInstallButtonClick() {
  if (!mySavedInstallPromptEvent) {
    return;
  }
  
  mySavedInstallPromptEvent.prompt();
  const myUserChoice = await mySavedInstallPromptEvent.userChoice;
  console.log("User installation choice outcome:", myUserChoice.outcome);
  
  mySavedInstallPromptEvent = null;
  
  const myInstallButton = document.getElementById("myPwaInstallButton");
  if (myInstallButton) {
    myInstallButton.style.display = "none";
  }
});

// Reset if already installed
window.addEventListener("appinstalled", () => {
  console.log("Application successfully installed!");
  mySavedInstallPromptEvent = null;
  const myInstallButton = document.getElementById("myPwaInstallButton");
  if (myInstallButton) {
    myInstallButton.style.display = "none";
  }
});

// Execute registration
myRegisterServiceWorker();
