document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-icon');
    const menu = document.getElementById('menu');
  
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('show'); // Toggle visibility
      hamburger.classList.toggle('active'); // Transform hamburger to "X"
    });
  });
  