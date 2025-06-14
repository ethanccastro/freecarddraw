import { getUUID, isEmailValid } from './_global.mjs';

// No more global variables for responses! This is much safer.

// ==========================================================
//  REFACTORED FETCH FUNCTIONS (They now accept arguments)
// ==========================================================

const postFetchisEntryEmailUnique = async (emailValue) => {
    try {
        const response = await fetch(`${window.location.href}/isemailentryunique`, {
            method: "POST",
            body: JSON.stringify({
                isEmailCheck: 'true',
                email: emailValue,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        return response;
    } catch(error) {
        console.error("Error checking email uniqueness:", error);
    }
};

const postFetchisUsernameProfanity = async (usernameValue) => {
    try {
        const response = await fetch(`${window.location.origin}/profanity`, {
            method: "POST",
            body: JSON.stringify({ username: usernameValue }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        return response;
    } catch(error) {
        console.error("Error checking username profanity:", error);
    }
};

const postFetchpostgiveaway = async (emailValue, usernameValue) => {
    try {
        const response = await fetch(`${window.location.href}/entergiveaway`, {
            method: "POST",
            body: JSON.stringify({
                email: emailValue,
                username: usernameValue
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        return response;
    } catch(error) {
        console.error("Error posting giveaway entry:", error);
    }
};


// ==========================================================
//  REFACTORED VALIDATION FUNCTION (Returns a result object)
// ==========================================================

async function getValidationResult(emailValue, usernameValue) {
    const errorMessages = [];
    let emailCheckResponse = null;

    // --- Make API calls first ---
    const profanityFetch = postFetchisUsernameProfanity(usernameValue);
    if (emailValue && isEmailValid(emailValue)) {
        emailCheckResponse = await postFetchisEntryEmailUnique(emailValue);
    }
    const profanityResponse = await profanityFetch;
    const profanityData = await profanityResponse.json();

    // --- Build error list based on conditions ---
    if (!emailValue || !isEmailValid(emailValue)) {
        errorMessages.push('Please enter a valid email address.');
    }
    if (!usernameValue) {
        errorMessages.push('Please enter a username.');
    } else if (profanityData.message === true) {
        errorMessages.push('This username is not permitted. Please choose another.');
    }
    if (emailCheckResponse && emailCheckResponse.status === 409) {
        errorMessages.push('This email has already been used for this giveaway.');
    }

    // Return a useful object with all the information
    return {
        hasErrors: errorMessages.length > 0,
        errors: errorMessages,
        emailIsUnique: emailCheckResponse ? emailCheckResponse.status === 200 : false,
        usernameIsClean: profanityData.message === false,
    };
}


// ==========================================================
//  MAIN CLIENT CODE (The Entry Point)
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    // Set UUID if it doesn't exist
    const uuidInput = document.getElementById('uuid');
    if (!uuidInput.value) {
        uuidInput.value = getUUID();
    }

    // Initialize countdown timer if element exists
     const countdownElement = document.getElementById('countdown-timer');
    if (countdownElement) {
       // --- IMPROVEMENT: Store the intervalID to clear it later ---
        let countdownInterval; 

        function updateCountdown() {
            const endDateStr = countdownElement.dataset.endDate;
            const endDate = new Date(endDateStr);
            const now = new Date();
            const timeLeft = endDate - now;

            if (timeLeft <= 0) {
                countdownElement.textContent = 'Giveaway has ended';
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            let timeString = '';
            if (days > 0) timeString += `${days}d `;
            if (hours > 0 || days > 0) timeString += `${hours}h `;
            if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes}m `;
            timeString += `${seconds}s`;

            countdownElement.textContent = timeString;
        }

        // Update immediately and then every second
        updateCountdown();
        // --- IMPROVEMENT: Assign the interval to the variable ---
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Get references to form elements
    const form = document.getElementById('form');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const warningBox = document.getElementById('warning');

    // Attach listener to the FORM's submit event, not the button's click
    form.addEventListener('submit', async (event) => {
        // Always stop the default submission to allow for async validation
        event.preventDefault();
        
        // --- 1. Reset previous errors ---
        emailInput.classList.remove('input-error');
        usernameInput.classList.remove('input-error');
        warningBox.classList.remove('active');
        warningBox.innerHTML = '';

        // --- 2. Get the validation result ---
        const validation = await getValidationResult(emailInput.value, usernameInput.value);

        // --- 3. Handle the result ---
        if (validation.hasErrors) {
            // Display errors and highlight fields
            warningBox.innerHTML = validation.errors.map(msg => `<p>${msg}</p>`).join('');
            warningBox.classList.add('active');

            if (validation.errors.some(e => e.includes('email'))) {
                emailInput.classList.add('input-error');
            }
            if (validation.errors.some(e => e.includes('username'))) {
                usernameInput.classList.add('input-error');
            }
        } else {
            // --- NO ERRORS: Proceed to submit the data ---
            const postResponse = await postFetchpostgiveaway(emailInput.value, usernameInput.value);
            const postData = await postResponse.json();
            
            // Redirect the user to the confirmation page
            window.location.href = `${window.location.href}/${postData.id}`;
        }
    });    
});