



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


document.querySelectorAll('.saveBtn').forEach(button => {
  button.addEventListener('click', () => {
    const section = button.getAttribute('data-section');
    const card = button.closest('.day-card');
    const inputs = card.querySelectorAll('input, textarea');
    const data = [];
    
    inputs.forEach(input => {
      if (input.type === 'checkbox') {
        data.push({ type: 'checkbox', checked: input.checked });
      } else {
        data.push({ type: 'text', value: input.value });
      }
    });
    
    localStorage.setItem(section, JSON.stringify(data));
    alert(`Saved: ${section}`);
  });
});

// Load data for each section
document.querySelectorAll('.saveBtn').forEach(button => {
  const section = button.getAttribute('data-section');
  const card = button.closest('.day-card');
  const savedData = JSON.parse(localStorage.getItem(section));
  
  if (savedData) {
    const inputs = card.querySelectorAll('input, textarea');
    inputs.forEach((input, i) => {
      const item = savedData[i];
      if (item.type === 'checkbox') {
        input.checked = item.checked;
      } else {
        input.value = item.value;
      }
    });
  }
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

// cal.js - Put this in your cal.js file
document.addEventListener('DOMContentLoaded', function() {
  // 1. AUTO-SAVE SYSTEM
  const STORAGE_KEY = 'calendar-data-v2';
  let saveTimeout;
  
  // 2. INITIALIZE ALL TEXTAREAS
  document.querySelectorAll('.auto-expand').forEach(textarea => {
    // Auto-expand functionality
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
      scheduleAutoSave();
    });
  });

  // 3. LOAD SAVED DATA
  function loadAllData() {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!savedData) return;
    
    // Restore checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      const key = getElementKey(checkbox);
      if (savedData[key] !== undefined) {
        checkbox.checked = savedData[key];
      }
    });
    
    // Restore textareas
    document.querySelectorAll('textarea').forEach(textarea => {
      const key = getElementKey(textarea);
      if (savedData[key] !== undefined) {
        textarea.value = savedData[key];
        // Trigger resize
        setTimeout(() => {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }, 10);
      }
    });
  }

  // 4. SAVE FUNCTIONS
  function scheduleAutoSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveAllData, 1000);
  }

  function saveAllData() {
    const dataToSave = {};
    
    // Save all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      dataToSave[getElementKey(checkbox)] = checkbox.checked;
    });
    
    // Save all textareas
    document.querySelectorAll('textarea').forEach(textarea => {
      dataToSave[getElementKey(textarea)] = textarea.value;
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    console.log('Auto-saved all data');
  }

  // 5. HELPER FUNCTIONS
  function getElementKey(element) {
    // Create unique key based on element's position in DOM
    const path = [];
    let current = element;
    
    while (current && current !== document) {
      const parent = current.parentNode;
      if (parent) {
        const index = Array.from(parent.children).indexOf(current);
        path.unshift(index);
      }
      current = parent;
    }
    
    return path.join('-');
  }

  // 6. MANUAL SAVE BUTTON
  document.querySelectorAll('.saveBtn').forEach(button => {
    button.addEventListener('click', function() {
      saveAllData();
      showSaveFeedback(this);
    });
  });

  // 7. RESET BUTTON
  document.getElementById('resetAll').addEventListener('click', function() {
    if (confirm('Are you sure you want to reset ALL data?')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload(); // Refresh to clear all inputs
    }
  });

  // 8. VISUAL FEEDBACK
  function showSaveFeedback(button) {
    const feedback = document.createElement('span');
    feedback.className = 'save-feedback';
    feedback.textContent = '✓ Saved';
    button.parentNode.appendChild(feedback);
    setTimeout(() => feedback.remove(), 2000);
  }

  // Initial load
  loadAllData();
});



