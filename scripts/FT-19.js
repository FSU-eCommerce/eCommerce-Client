document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal', 
      loop: true, 
      autoplay: {
        delay: 3000, 
        disableOnInteraction: false, 
      },

    });
  });
