document.addEventListener('DOMContentLoaded', () => {
    const startTestButton = document.getElementById('start-test-button');
    const submitTestButton = document.getElementById('submit-test-button');
    const retakeTestButton = document.getElementById('retake-test-button');
    const shareResultsButton = document.getElementById('share-results-button');
    const testSection = document.getElementById('test-section');
    const resultSection = document.getElementById('result-section');
    const welcomeSection = document.getElementById('welcome-section');
    const leaderboardSection = document.getElementById('leaderboard-section');
    const resultScore = document.getElementById('result-score');
    const testForm = document.getElementById('test-form');
    const timerElement = document.getElementById('timer');
    const themeToggleButton = document.getElementById('theme-toggle');
    const leaderboardLink = document.getElementById('leaderboard-link');

    let score = 0;
    let timer;
    let timeLeft = 300; // 5 minutes for the test

    const questions = [
        { question: 'Which number should come next in the pattern? 37, 34, 31, 28', options: ['25', '24', '23', '22'], answer: 0 },
        { question: 'Find the answer that best completes the analogy: Book is to Reading as Fork is to:', options: ['drawing', 'writing', 'stirring', 'eating'], answer: 3 },
        { question: 'Find the answer that best completes the analogy: Finger is to Hand as Leaf is to:', options: ['twig', 'tree', 'branch', 'blossom'], answer: 2 },
        { question: 'If you rearrange the letters "CIFAIPC" you would have the name of a(n):', options: ['city', 'animal', 'ocean', 'river'], answer: 2 },
        { question: 'Choose the number that is 1/4 of 1/2 of 1/5 of 200:', options: ['2', '5', '10', '25'], answer: 1 },
        { question: 'John needs 13 bottles of water from the store. John can only carry 3 at a time. What is the minimum number of trips John needs to make to the store?', options: ['3', '4', '5', '6'], answer: 2 },
        { question: 'What is the missing number in the sequence shown: 1, 3, 6, 10, 15, ___?', options: ['20', '21', '22', '23'], answer: 1 },
        { question: 'Which number should come next in the pattern? 1, 1, 2, 3, 5, 8, 13', options: ['20', '21', '22', '23'], answer: 2 },
        { question: 'Ravi is 4 years old and his sister is three times as old as he is. When Ravi is 12 years old, how old will his sister be?', options: ['16', '20', '24', '28'], answer: 2 },
        { question: 'Choose the word that is the closest in meaning to the word "antagonist":', options: ['protagonist', 'villain', 'supporter', 'character'], answer: 1 },
        { question: 'Which number logically follows this series: 4, 6, 9, 6, 14, 6, ___?', options: ['19', '20', '21', '22'], answer: 0 },
        { question: 'Which one of the five choices makes the best comparison? Tree is to ground as chimney is to:', options: ['smoke', 'brick', 'house', 'sky', 'roof'], answer: 2 },
        { question: 'Which one of the five is least like the other four?', options: ['Dog', 'Mouse', 'Lion', 'Snake', 'Elephant'], answer: 3 },
        { question: 'Which number should come next in the series? 2, 3, 5, 8, 12, 17, ___?', options: ['22', '23', '24', '25'], answer: 0 },
        { question: 'Which one of the five choices makes the best comparison? Finger is to Hand as Leaf is to:', options: ['twig', 'tree', 'branch', 'blossom'], answer: 2 }
    ];

    startTestButton.addEventListener('click', () => {
        welcomeSection.classList.add('hidden');
        testSection.classList.remove('hidden');
        loadQuestions();
        startTimer();
    });

    submitTestButton.addEventListener('click', () => {
        clearInterval(timer);
        calculateScore();
        testSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        resultScore.textContent = `Your score: ${score}`;
    });

    retakeTestButton.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        welcomeSection.classList.remove('hidden');
        score = 0;
        timeLeft = 300;
    });

    shareResultsButton.addEventListener('click', () => {
        const shareData = {
            title: 'IQ Test',
            text: `I scored ${score} on the IQ Test!`,
            url: window.location.href
        };
        navigator.share(shareData).then(() => {
            console.log('Results shared successfully');
        }).catch(console.error);
    });

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggleButton.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    leaderboardLink.addEventListener('click', () => {
        welcomeSection.classList.add('hidden');
        leaderboardSection.classList.remove('hidden');
        loadLeaderboard();
    });

    function loadQuestions() {
        testForm.innerHTML = '';
        questions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="question${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            `;
            testForm.appendChild(questionElement);
        });
        submitTestButton.classList.remove('hidden');
    }

    function calculateScore() {
        const formData = new FormData(testForm);
        questions.forEach((q, index) => {
            if (parseInt(formData.get(`question${index}`)) === q.answer) {
                score++;
            }
        });
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                submitTestButton.click();
            }
        }, 1000);
    }

    function loadLeaderboard() {
        const leaderboard = [
            // Add leaderboard data here
        ];
        const leaderboardElement = document.getElementById('leaderboard');
        leaderboardElement.innerHTML = '';
        leaderboard.forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${entry.username} - ${entry.score}`;
            leaderboardElement.appendChild(listItem);
        });
    }
});
