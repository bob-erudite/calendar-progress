// auth.js

(function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const loginTime = localStorage.getItem('loginTime');

  if (!isLoggedIn || !loginTime) {
    window.location.href = "login.html";
    return;
  }

  const currentTime = Date.now();
  const maxSessionTime = 20 * 60 * 1000; // 20 minutes
  const timePassed = currentTime - parseInt(loginTime, 10);

  if (timePassed > maxSessionTime) {
    alert("Session expired. Please log in again.");
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');
    window.location.href = "login.html";
  }
})();
