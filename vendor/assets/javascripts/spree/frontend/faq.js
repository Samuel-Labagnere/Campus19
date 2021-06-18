$(document).ready(function() {
    const questions = document.querySelectorAll('.question')
    const answers = document.querySelectorAll('.question-answer')
    const arrows = document.querySelectorAll('.answer-arrow')

    for (let i = 0 ; i < questions.length ; i++) {
        let question = questions[i];
        let answer = answers[i];
        let arrow = arrows[i]
        question.addEventListener('click', ()=> {
            answer.classList.toggle('none')
            arrow.classList.toggle('rotate');
        })
    }
})