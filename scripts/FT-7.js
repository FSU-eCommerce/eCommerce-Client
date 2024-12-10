document.getElementById('cart-icon').addEventListener('click', () => {
    document.getElementById('shopping-cart').classList.add('open');
});

document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('shopping-cart').classList.remove('open');
});