// Sky Quiz Interaction Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Questionnaire script initialized');

    // Get all answer cards
    const answerCards = document.querySelectorAll('.answer-card');
    console.log(`Found ${answerCards.length} answer cards`);

    // Add click event listener to each answer card
    answerCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            console.log(`Answer card ${index + 1} clicked`);
            
            // Remove active state from all cards in the same question
            const parentContainer = this.closest('.question-container');
            const siblingCards = parentContainer.querySelectorAll('.answer-card');
            siblingCards.forEach(sibling => {
                sibling.classList.remove('selected');
            });

            // Add selected state to clicked card
            this.classList.add('selected');

            // Log selected answer details
            console.log('Selected answer details:', {
                question: parentContainer.dataset.question,
                background: parentContainer.dataset.bg,
                selectedText: this.querySelector('.answer-text').textContent,
                weatherType: this.dataset.weather || 'Not specified'
            });

            // Move to next question
            moveToNextQuestion(parentContainer);
        });
    });

    function moveToNextQuestion(currentQuestionContainer) {
        console.log('Attempting to move to next question');
        
        // Find the next question container
        const nextQuestionContainer = currentQuestionContainer.nextElementSibling;
        
        if (nextQuestionContainer && nextQuestionContainer.classList.contains('question-container')) {
            console.log('Moving to next question');
            
            // Remove active class from current question
            currentQuestionContainer.classList.remove('active');
            
            // Add active class to next question
            nextQuestionContainer.classList.add('active');
            
            // Change background if data-bg attribute exists
            if (nextQuestionContainer.dataset.bg) {
                document.body.style.backgroundColor = nextQuestionContainer.dataset.bg;
            }
        } else {
            console.log('No more questions or last question reached');
            completeQuiz();
        }
    }

    function completeQuiz() {
        console.log('Quiz completed');
        
        // Collect all selected answers
        const selectedAnswers = document.querySelectorAll('.answer-card.selected');
        const answerDetails = Array.from(selectedAnswers).map(card => ({
            question: card.closest('.question-container').dataset.question,
            answer: card.querySelector('.answer-text').textContent
        }));

        console.log('Selected Answers:', answerDetails);
        
        // You can add more logic here for quiz completion
        // For example, displaying results, sending to a server, etc.
    }

    console.log('Questionnaire script setup complete');
});
