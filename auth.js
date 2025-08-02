const MAX_SESSION_MINUTES = 0.083;

function checkLoginStatus(redirectIfInvalid = true) {
  try {
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
        // Check again every 1 minute
        setTimeout(() => {
          checkLoginStatus();
        }, 60000);
      }
    } else {
      if (redirectIfInvalid) {
        window.location.href = "index.html";
      }
    }
  } catch (e) {
    console.error("Login check failed:", e);
    if (redirectIfInvalid) {
      window.location.href = "index.html";
    }
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loginTime");
}
