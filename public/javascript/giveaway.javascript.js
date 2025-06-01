import { getUUID, isEmailValid } from './_global.mjs';

const formUUID = getUUID();
var responseisUsernameProfanity;
var responseisEntryEmailUnique;
var responsePostgiveaway;
var responseUsers;
var warning;
var email;
var username;

async function isSetWarning() {   
    let errorMessage = '';

    if (username.value.length != 0) {
        responseisUsernameProfanity = await postFetchisUsernameProfanity();
        responseisUsernameProfanity = await responseisUsernameProfanity.json()
    }

    if (email.value.length != 0 && username.value.length != 0 && isEmailValid(email.value)) {
        responseisEntryEmailUnique = await postFetchisEntryEmailUnique();
    }

    if (email.value.length == 0 || !isEmailValid(email.value)) {
        errorMessage += 'Please enter a valid email to enter the giveaway';
        email.style.borderColor = 'red';
    }
    if (username.value.length == 0 || responseisUsernameProfanity.message == true) {
        errorMessage += '</br>Please enter a valid username to enter the giveaway';
        username.style.borderColor = 'red';
    }

    if (email.value.length == 0 || (responseisEntryEmailUnique && responseisEntryEmailUnique.status == 409)) {
        errorMessage += '</br>This email already exists for this giveaway';
        email.style.borderColor = 'red';
    }    

    warning.style.color = 'red';
    warning.style.backgroundColor = '#EDEEF0';
    warning.innerHTML = errorMessage;

    if (warning.innerHTML.length != 0) {
        return true;
    }

    return false;
}

const postFetchisEntryEmailUnique = async () => {
    try {
        const responseisEntryEmailUnique = await fetch(`${window.location.href}/isemailentryunique`, {
            method: "POST",
            body: JSON.stringify({
                isEmailCheck: 'true',
                email: `${email.value}`,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        return responseisEntryEmailUnique;
    }   
    catch(error) {
        console.log(error);
    }
};

const postFetchisUsernameProfanity = async () => {
    try {
        const responseisUsernameProfanity = await fetch(`${window.location.origin}/profanity`, {
            method: "POST",
            body: JSON.stringify({
                username: `${username.value}`
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        return responseisUsernameProfanity;
    }   
    catch(error) {
        console.log(error);
    }
};


const postFetchpostgiveaway = async () => {
    try {
        const responsePostgiveaway = await fetch(`${window.location.href}/entergiveaway`, {
            method: "POST",
            body: JSON.stringify({
                email: `${email.value}`,
                username: `${username.value}`
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        return responsePostgiveaway;
    }   
    catch(error) {
        console.log(error);
    }
};

//main client code
document.addEventListener('DOMContentLoaded', async () => {
    if (!document.getElementById('uuid').value) {
        document.getElementById('uuid').value = formUUID;
    }


    document.getElementById('entry').addEventListener('click', async (event) => {
        event.preventDefault();
        warning = document.getElementById('warning');
        email = document.getElementById('email');
        username = document.getElementById('username');
        if (!await isSetWarning()) {
            if (responseisEntryEmailUnique.status == 200) {
                responsePostgiveaway = await postFetchpostgiveaway();
                responsePostgiveaway = await responsePostgiveaway.json();
                window.location.href = `${window.location.href}/${responsePostgiveaway.id}`;
            }
        }
            
    });    
});
