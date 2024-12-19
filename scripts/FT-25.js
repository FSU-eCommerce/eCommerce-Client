document.querySelector('#register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const pass = document.querySelector('#pass').value;

    try {
        // skicka datan till servern med POST
        const res = await fetch('http://localhost:5000/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, pass }),
        });

        // Hämta meddelandet från servern
        const msg = await res.text(); //hämta svarstexten från servern
        alert(msg); // visa meddelande

    } catch (err) {
        alert('Kunde inte registrera användaren'); // felmeddelande
    }
});
