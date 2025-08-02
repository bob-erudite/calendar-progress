// auth.js

const MAX_SESSION_MINUTES = 20;

// Call this in cal.html to check login before showing the page
function checkLoginStatus(redirectIfInvalid = true) {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const loginTime = localStorage.getItem("loginTime");

  if (isLoggedIn && loginTime) {
    const now = new Date().getTime();
    const minutesPassed = (now - parseInt(loginTime)) / (1000 * 60);

    if (minutesPassed >= MAX_SESSION_MINUTES) {
      logout();
      if (redirectIfInvalid) {
        alert("⏰ Session expired. Please log in again.");
        window.location.href = "index.html";
      }
    } else {
      // Still logged in, so check every minute if it has expired
      setTimeout(() => {
        checkLoginStatus();
      }, 60000); // 60,000 ms = 1 minute
    }
  } else {
    if (redirectIfInvalid) {
      window.location.href = "index.html";
    }
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loginTime");
}
