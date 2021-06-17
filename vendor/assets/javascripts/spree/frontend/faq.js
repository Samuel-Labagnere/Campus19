$(document).ready(function() {
    const questions = document.querySelectorAll('.question')
    const answers = document.querySelectorAll('.question-answer')

    for (let i = 0 ; i < questions.length ; i++) {
        let question = questions[i];
        let answer = answers[i];
        question.addEventListener('click', ()=> {
            answer.classList.toggle('none')
        })
    }
})