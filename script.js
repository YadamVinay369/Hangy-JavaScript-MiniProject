const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application','programming','interface','wizard','database','coding','project','resume','internship','placement','startup','funding','revenue','marketvalue','ecosystem','politics','development'];

let selectedWord = words[Math.floor(Math.random()*words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word

const displayWord=()=>{
    wordEl.innerHTML = `${selectedWord.split('').map(
        letter => `
        <span class="letter">
        ${correctLetters.includes(letter)?letter:''}
        </span>
        `).join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g,'');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You Won! 🎉🎉';
        popup.style.display = 'flex';
    }

    
}

//update wrong letters

const updateWrongLettersEl=()=>{
    wrongLettersEl.innerHTML=`
    ${wrongLetters.length>0 ? '<p>Wrong</p>': ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index<errors){
            part.style.display='block';
        }else{
            part.style.display='none';
        }
    })

    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText='Unfortunately you lost 😔';
        popup.style.display='flex';
    }
}

//Show notification

const showNotification=()=>{
    notification.classList.add('show');
    setTimeout(()=>{
        notification.classList.remove('show');
    },2000)
}

//Keydown letter press
window.addEventListener('keydown',e => {
    if(e.keyCode>=65 && e.keyCode<=90){
       const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLettersEl();
            }else{
                showNotification();
            }
        }
    }
})

//Restart game and play again
playAgainBtn.addEventListener('click',()=>{
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random()*words.length)];

    displayWord();
    updateWrongLettersEl();
    popup.style.display='none';
})
displayWord();

//Rules event handler and close event handler
rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));


//Page Loading

let loader = document.getElementById("loader");

window.addEventListener("load",()=>{
    let x = setTimeout(()=>{loader.style.display = "none"},2000);
})