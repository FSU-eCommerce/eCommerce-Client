document.querySelector('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name= document.querySelector('#name').value; //hämta namn
    const pass= document.querySelector('#pass').value; //hämta lösenord

    try {
        const res= await fetch('https://e-commerce-server-beta-flax.vercel.app/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, pass }), //skicka data
        });

        // om det funkar
        if (res.ok) {
            const msg = await res.text(); 
            alert(msg); 
            window.location.href = 'index.html';

        // hämta meddelande från servern och skicka vid fel
        } else {
            const msg = await res.text(); 
            alert(msg); // 
        }
    } catch (err) {
        console.log(err);
        alert('Kunde inte logga in');
    }
});