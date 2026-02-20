// ==========================================
// AUTOMATIC COPYRIGHT YEAR UPDATER
// ==========================================
// This script automatically updates the copyright year
// Add this to any page with a copyright notice

// METHOD 1: Using element ID (Recommended)
// Add id="currentYear" to your copyright span
// Example: Copyright &copy; <span id="currentYear"></span> Your Name
document.addEventListener('DOMContentLoaded', function() {
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});

// METHOD 2: Using class name (if you have multiple copyright notices)
// Add class="auto-year" to your copyright spans
// Example: Copyright &copy; <span class="auto-year"></span> Your Name
document.addEventListener('DOMContentLoaded', function() {
  const yearElements = document.querySelectorAll('.auto-year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });
});

// METHOD 3: Inline script (add directly in HTML before closing </body> tag)
/*
<script>
  document.getElementById('currentYear').textContent = new Date().getFullYear();
</script>
*/

// METHOD 4: One-liner for simple cases
// document.getElementById('currentYear').textContent = new Date().getFullYear();
