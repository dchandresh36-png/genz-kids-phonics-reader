// --- Game Configuration ---
// The alphabets you want to include in your game
const alphabets = ['A', 'B', 'C', 'D', 'E']; 
let currentTargetLetter = '';

// --- Core Game Functions ---

// 1. Function to make the system voice speak the question
function askQuestion(letter) {
    // Stop any speech that is currently playing so it doesn't overlap
    window.speechSynthesis.cancel();

    let textToSpeak = `Where is alphabet ${letter}?`;
    let utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Adjusting rate and pitch to make the voice sweet and child-friendly
    utterance.rate = 0.85;  // Slightly slower so kids can understand clearly
    utterance.pitch = 1.25; // A little higher pitch to sound cheerful
    
    window.speechSynthesis.speak(utterance);
}

// 2. Function to start a brand new round
function startNewRound() {
    // Pick a random letter from our array to be the correct answer
    const randomIndex = Math.floor(Math.random() * alphabets.length);
    currentTargetLetter = alphabets[randomIndex];
    
    // Update your game's visual UI text if you want to show it on screen
    const instructionElement = document.getElementById('instruction-text');
    if (instructionElement) {
        instructionElement.innerText = `Find the letter: ${currentTargetLetter}`;
    }

    // Trigger the sweet system voice to ask the question out loud!
    askQuestion(currentTargetLetter);
    
    // (Optional) Call your function here to shuffle and display the buttons on screen
    generateLetterButtons();
}

// 3. Function to handle what happens when a child taps a button
function checkAnswer(selectedLetter) {
    if (selectedLetter === currentTargetLetter) {
        // Correct Answer!
        // You can play your mom's "Wow!" audio file here
        console.log("Correct! Great job.");
        
        // Wait 2 seconds, then automatically load the next round
        setTimeout(startNewRound, 2000);
    } else {
        // Wrong Answer
        // Try playing a gentle sound, or just have the system speak the question again
        console.log("Try again!");
        askQuestion(currentTargetLetter); 
    }
}

// --- Dynamic Button Generation Example ---
function generateLetterButtons() {
    const container = document.getElementById('button-container');
    if (!container) return;
    
    container.innerHTML = ''; // Clear previous choices
    
    // For a simple setup, let's always show choices for kids to pick from
    alphabets.forEach(letter => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.className = 'letter-btn'; // You can style this in your CSS
        button.onclick = function() {
            checkAnswer(letter);
        };
        container.appendChild(button);
    });
}

// --- Start the game automatically when the page loads ---
window.onload = function() {
    startNewRound();
};