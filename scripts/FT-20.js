document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal', // Horizontal slider
    loop: true, // Enable looping
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // Allows clicking on pagination bullets
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})
});