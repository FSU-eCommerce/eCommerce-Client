document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal', 
      loop: true, 
      autoplay: {
        delay: 3000, 
        disableOnInteraction: false, 
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true, 
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  });
