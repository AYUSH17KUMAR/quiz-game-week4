document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 0;
    let score = 0;
    let questionsData; // Store the fetched questions

    const quizContainer = document.getElementById('quiz');
    const scoreDisplay = document.getElementById('score');
    const nextButton = document.getElementById('next');
    const resultsDiv = document.getElementById('results'); // Get the results div
    const finalScoreDisplay = document.getElementById('finalScore');
    const restartButton = document.getElementById('restart');


    fetch('/questions')
        .then(response => response.json())
        .then(data => {
            questionsData = data.questions; // Assign fetched questions to questionsData
            if (!questionsData || !Array.isArray(questionsData)) {
                console.error("Invalid questions data:", data);
                quizContainer.innerHTML = `<p>Error loading questions. Please try again later.</p>`;
                return;
            }

            displayQuestion(questionsData[currentQuestion]);
        })
        .catch(error => {
            console.error("Fetch error:", error);
            quizContainer.innerHTML = `<p>Failed to load questions. Check console for details.</p>`;
        });

    function displayQuestion(question) {
        quizContainer.innerHTML = `
            <h3>${question.question}</h3>
            ${question.options.map(option => `
                <label>
                    <input type="radio" name="option" value="${option}"> ${option}
                </label>
            `).join('')}
        `;
    }

    nextButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            if (selectedOption.value === questionsData[currentQuestion].answer) {
                score++;
            }

            currentQuestion++;

            if (currentQuestion < questionsData.length) {
                displayQuestion(questionsData[currentQuestion]);
            } else {
                showResults();
            }

            scoreDisplay.textContent = `Score: ${score}`;
        }
    });

    function showResults() {
        quizContainer.style.display = 'none';
        nextButton.style.display = 'none';
        resultsDiv.style.display = 'block'; // Show the results div
        finalScoreDisplay.textContent = `Your Score: ${score} / ${questionsData.length}`;
    }

    restartButton.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        quizContainer.style.display = 'block'; // Show the quiz again
        nextButton.style.display = 'block'; // Show the next button
        resultsDiv.style.display = 'none'; // Hide the results div
        scoreDisplay.textContent = `Score: ${score}`;
        displayQuestion(questionsData[currentQuestion]); // Restart with the first question
    });
});