
// ========== data-theme... ==========
// Function to get the system's default theme
function getSystemDefaultTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  
  // Function to apply the theme from localStorage
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  
    // Update button icon and text based on the theme
    const themeToggleButton = document.getElementById("themeToggleButton");
    if (themeToggleButton) {
      themeToggleButton.innerHTML =
        theme === "dark"
          ? //
            '<i class="icon-sun"></i> Switch to Light'
          : '<i class="icon-moon"></i> Switch to Dark';
    }
  }
  
  console.log("getSystemDefaultTheme", getSystemDefaultTheme());
  
  // Load the saved theme from localStorage or default to "dark"
  const savedTheme = localStorage.getItem("theme") || getSystemDefaultTheme();
  applyTheme(savedTheme);
  
  // Wait for DOM to load
  document.addEventListener("DOMContentLoaded", () => {
    // Define the button HTML with an initial icon and text
    const themeToggleButtonHTML = `
        <button class="contrast" id="themeToggleButton">
          ${
            savedTheme === "dark"
              ? //
                '<i class="icon-sun"></i> Switch to Light'
              : '<i class="icon-moon"></i> Switch to Dark'
          }
        </button>
    `;
  
    // Insert the button into the body
    document.body.insertAdjacentHTML("beforeend", themeToggleButtonHTML);
  
    // Add click event to toggle the theme
    const themeToggleButton = document.getElementById("themeToggleButton");
    themeToggleButton.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
  
      // Apply the new theme
      applyTheme(newTheme);
  
      // Save the new theme in localStorage
      localStorage.setItem("theme", newTheme);
    });
  });
  
  // ========== data-theme. ==========