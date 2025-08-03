



// ===== Theme Toggle Logic =====
const themeToggleBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.className = theme;
  themeToggleBtn.textContent = theme === "dark" ? "🌞" : "🌙";
  localStorage.setItem("calendarTheme", theme);
}

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
});

// On load, apply saved theme or default to light
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("calendarTheme") || "light";
  applyTheme(savedTheme);
});

// ===== Hide Theme Toggle on Scroll =====
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const toggleBtn = document.getElementById("themeToggle");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    // scrolling down
    toggleBtn.style.opacity = "0";
    toggleBtn.style.pointerEvents = "none";
  } else {
    // scrolling up
    toggleBtn.style.opacity = "1";
    toggleBtn.style.pointerEvents = "auto";
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});







document.addEventListener("DOMContentLoaded", () => {
  const updateProgress = () => {
    // Loop through each service-section individually
    document.querySelectorAll(".service-section").forEach(section => {
      const checkboxes = section.querySelectorAll("input[type='checkbox']");
      const progress = section.querySelector(".progress-fill");
      
      if (!progress || checkboxes.length === 0) return;
      
      const checked = [...checkboxes].filter(cb => cb.checked).length;
      const percent = (checked / checkboxes.length) * 100;
      
      progress.style.width = `${percent}%`;
    });
  };
  
  // Add change listeners to all checkboxes
  document.querySelectorAll("input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", updateProgress);
  });
  
  updateProgress(); // Initialize on load
});




// Export to PDF
document.getElementById('exportPDF').addEventListener('click', () => {
  window.print(); // Basic browser-based export
});

// Reset all tasks
document.getElementById('resetAll').addEventListener('click', () => {
  if (confirm("Are you sure you want to reset all tasks? This can't be undone.")) {
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    // Clear all text inputs
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    document.querySelectorAll('input[type="time"]').forEach(input => input.value = '');
    document.querySelectorAll('textarea').forEach(ta => ta.value = '');
    
    // Clear progress bars
    document.querySelectorAll('.progress-fill').forEach(bar => bar.style.width = '0%');
    
    // Clear local storage
    localStorage.clear();
    alert("All tasks reset successfully.");
  }
});


const fabContainer = document.querySelector('.fab-container');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    // Scrolling down
    fabContainer.classList.add('hidden');
  } else {
    // Scrolling up
    fabContainer.classList.remove('hidden');
  }
  
  lastScrollY = window.scrollY;
});

// Login Logic
function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const error = document.getElementById("login-error");
  
  // Set your own login credentials
  if (username === "admin" && password === "1234") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("calendar-app").style.display = "block";
  } else {
    error.textContent = "Incorrect username or password!";
  }
}

// Show Password Toggle
document.getElementById("showPassword").addEventListener("change", function() {
  const passField = document.getElementById("login-password");
  passField.type = this.checked ? "text" : "password";
});

// In cal.js - Replace your current code with this
document.addEventListener('DOMContentLoaded', function() {
  // 1. Clean up previous storage
  localStorage.removeItem('calendar-data');
  localStorage.removeItem('calendar-data-v2');
  const STORAGE_KEY = 'calendar-data-v3';

  // 2. Initialize textareas with unique IDs
  let noteCounter = 0;
  document.querySelectorAll('.auto-expand').forEach(textarea => {
    if (!textarea.id) {
      textarea.id = `notes-${noteCounter++}`;
    }
    // Auto-expand functionality
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  });

  // 3. Improved save/load system
  function saveAllData() {
    const data = {};
    document.querySelectorAll('input[type="checkbox"], textarea').forEach(el => {
      data[el.id] = el.type === 'checkbox' ? el.checked : el.value;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function loadAllData() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    Object.entries(saved).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (!el) return;
      
      if (el.type === 'checkbox') {
        el.checked = value;
      } else {
        el.value = value;
        // Trigger resize
        setTimeout(() => {
          el.style.height = 'auto';
          el.style.height = el.scrollHeight + 'px';
        }, 10);
      }
    });
  }

  // 4. Event listeners
  document.querySelectorAll('.auto-expand').forEach(textarea => {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
      debouncedSave();
    });
  });

  // 5. Debounced auto-save
  let saveTimer;
  const debouncedSave = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveAllData, 1000);
  };

  // 6. Manual save button
  document.querySelectorAll('.saveBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      saveAllData();
      alert('Saved successfully!');
    });
  });

  // 7. Initial load
  loadAllData();
});
