const questionsButtons = document.querySelectorAll(".questionButton");


questionsButtons.forEach((button) => {

button.addEventListener('click', () => {

    const answer = button.nextElementSibling;

    if(answer.style.display === 'none' || answer.style.display === ''){
        answer.style.display = 'block';
    } else {
        answer.style.display = 'none';
    }
    
});
});