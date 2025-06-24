const quizData = [
  {
    question: "What is the capital city of Australia?",
    answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: 2
  },
  {
    question: "What is the smallest prime number?",
    answers: ["0", "1", "2", "3"],
    correct: 2
  },
  {
    question: "What does HTML stand for?",
    answers: [
      "HyperText Markdown Language",
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyper Transfer Markup Language"
    ],
    correct: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "Which company created the iPhone?",
    answers: ["Samsung", "Google", "Apple", "Microsoft"],
    correct: 2
  },
  {
    question: "How many continents are there on Earth?",
    answers: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "What year did World War II end?",
    answers: ["1945", "1939", "1950", "1942"],
    correct: 0
  },
  {
    question: "What is the boiling point of water (in Celsius)?",
    answers: ["90°C", "100°C", "110°C", "120°C"],
    correct: 1
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
    correct: 2
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: ["Gd", "Au", "Ag", "Go"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
  clearState();
  const current = quizData[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${current.question}`;
  current.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.classList.add('answer-btn');
    btn.textContent = answer;
    btn.addEventListener('click', () => selectAnswer(btn, index));
    answersEl.appendChild(btn);
  });
}

function clearState() {
  nextBtn.classList.add('hidden');
  while (answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
  }
}

function selectAnswer(btn, index) {
  const correct = quizData[currentQuestion].correct;
  const allButtons = answersEl.querySelectorAll('button');

  allButtons.forEach((button, i) => {
    button.disabled = true;
    if (i === correct) button.classList.add('correct');
    else if (button === btn) button.classList.add('wrong');
  });

  if (index === correct) score++;
  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.classList.add('hidden');
  answersEl.classList.add('hidden');
  nextBtn.classList.add('hidden');
  resultBox.classList.remove('hidden');
  scoreEl.textContent = score;
  totalEl.textContent = quizData.length;
}

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  resultBox.classList.add('hidden');
  questionEl.classList.remove('hidden');
  answersEl.classList.remove('hidden');
  loadQuestion();
});

loadQuestion();
