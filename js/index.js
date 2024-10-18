document.getElementById('categoryFilter').addEventListener('change', function (e) {
  const selectedCategory = e.target.value;
  const panels = document.querySelectorAll('.panel');

  panels.forEach(panel => {
    if (selectedCategory === '' || panel.dataset.category === selectedCategory) {
      panel.style.display = 'block'; 
    } else {
      panel.style.display = 'none'; 
    }
  });
});


