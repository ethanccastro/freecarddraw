import { getUUID, isEmailValid } from './_global.mjs';

//main client code
document.addEventListener('DOMContentLoaded', async () => {

    if (window.location.href == `${window.location.origin}/closed`) {

        document.querySelectorAll('.navigation-links a').forEach((link) => {
        if (link.innerHTML == 'Closed') {
            link.style.color = '#AF231C';
        }
        else {
            link.style.color = 'black';
        }
        
    })        
    }

});
