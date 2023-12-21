import { questions } from "./questions.js";

const correctAnswers = questions.map((question) => question.correctAnswer);
console.log(correctAnswers);
const form = document.querySelector('.quiz-form');
const usedQuestionIndexes = [];
let currentQuestionIndex = 0;
let userAnswers = [];

console.log(questions[0].id);
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


shuffleArray(questions);

function getRandomQuestion() {
  if (questions.length === 0) {
    shuffleArray(questions);
  }

  const selectedQuestion = questions.pop();
  usedQuestionIndexes.push(selectedQuestion.id);
    
  return selectedQuestion;
}

function updateQuizForm() {
  for (let i = 1; i <= 10; i++) {
    const randomQuestion = getRandomQuestion();
    

    const questionHTML = `<div class="my-5 ">
      <p class="lead font-weight-normal">${i}.${randomQuestion.question}</p>
      ${randomQuestion.choices.map((choice, index) => `
        <div class="form-check my-2 text-white-50">
          <input id="${randomQuestion.id}" type="radio" name="q${i}" value="${String.fromCharCode(65 + index)}">
          <label class="form-check-label">${choice}</label>
        </div>
      `).join('')}
    </div>`;

    form.insertAdjacentHTML('beforeend', questionHTML);
  }
}



function loadNextQuestions() {
  userAnswers.length = 0;
  form.innerHTML = '';

  if (currentQuestionIndex < questions.length) {
    
    for (let i = 1; i <= 10; i++) {
      const randomQuestion = getRandomQuestion();
      const questionHTML = `<div class="my-5 ">
        <p class="lead font-weight-normal">${i}.${randomQuestion.question}</p>
        ${randomQuestion.choices.map((choice, index) => `
          <div class="form-check my-2 text-white-50">
            <input type="radio" name="q${i}" value="${String.fromCharCode(65 + index)}">
            <label class="form-check-label">${choice}</label>
          </div>
        `).join('')}
      </div>`;
      form.insertAdjacentHTML('beforeend', questionHTML);
    }
  } else {
    
    form.insertAdjacentHTML('beforeend', '<div class="text-center my-3"><button id="submitButton" class="btn btn-light">Submit</button></div>');
    document.querySelector('.quiz h2').textContent = "Press SUBMIT to see the score";
    
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', function () {
      
      event.preventDefault();
      displayScore();

    
    });

    nextButton.style.display = 'none';
  }
}







let score=0;

const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', function () {
  event.preventDefault();

  // Adăugare texte răspunsuri la array
  const form = document.querySelector('.quiz-form');
  const selectedAnswers = Array.from(form.elements).filter(element => element.type === 'radio' && element.checked);
  userAnswers = userAnswers.concat(selectedAnswers.map(answer => answer.nextElementSibling.textContent.trim()));
  console.log(userAnswers);

  const commonElements = userAnswers.filter(answer => correctAnswers.includes(answer));
  score=score+commonElements.length;
  console.log(score);
  // Încărcare următoare întrebări
  loadNextQuestions();
});


function displayScore(score) {
  const resultSection = document.querySelector('.result');
  const scorePercentage = (score / 10) * 100; // Assuming 10 questions in total
  console.log(score);
  // Update the result section with the score
  resultSection.innerHTML = `
    <div class="container lead">
      <p>Correct answers: <span class="text-primary display-4 p-3">${score}</span></p>
    </div>
  `;

  // Show the result section
  resultSection.classList.remove('d-none');
}

updateQuizForm();








