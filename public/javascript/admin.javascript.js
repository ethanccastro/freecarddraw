import { getUUID, isEmailValid } from './_global.mjs';

function updateGiftcard() {
    document.getElementById('updategiftcard').addEventListener('click', async (event) => {
        try {
            event.preventDefault();
            const type = document.getElementById('type').value;
            const value = document.getElementById('value').value;
            let responseUpdateGiftcard = await fetch(`${window.location.href}`, {
                method: "POST",
                body: JSON.stringify({
                    'type': type,
                    'value': value,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Accept": "application/json"
                }
            })
            responseUpdateGiftcard = await responseUpdateGiftcard.json();
        }   
        catch(error) {
            console.log(error);
        }        
    })
}

function setLinks() {
    const giftcardLink = document.querySelector('.sideBar a:nth-child(2)');
    const giveawayLink = document.querySelector('.sideBar a:nth-child(3)');
    let matches = [];
    let rowguid = '';

    giftcardLink.href += `admin/app/${getUUID()}/giftcard`;
    giveawayLink.href += `admin/app/${getUUID()}/giveaway`;


    document.querySelectorAll('.main-giveaways-component a').forEach(link => {
        rowguid = link.href.split('/').pop();
        matches = window.location.href.match('(giftcard|giveaway)(.*)')
        link.href = `${window.location.href.replace(matches[0], `${matches[1]}/${rowguid}`)}`;
    })    
}


//main client code
document.addEventListener('DOMContentLoaded', async () => {
    setLinks();
    updateGiftcard();

});
