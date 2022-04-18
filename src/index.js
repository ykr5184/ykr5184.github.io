import { sDictionary, lDictionary } from './dictionary.js'

function isDouble (str) {
    for (var i=0; i<str.length; i++) {
      if ( str.indexOf(str[i]) !== str.lastIndexOf(str[i]) ) {
        return true; 
      }
    }
  return false;
}
let snd = [];
for(let i = 0; i < sDictionary.length; i++){
    if (!isDouble(sDictionary[i])){
        snd.push(sDictionary[i]);
    }
}
snd = snd
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
console.log(snd)

var gameIsOver = false;
var state = {
    number: 314,
    //number: Math.floor(Math.random() * sDictionary.length),
    secret: '',
    grid: Array(8).fill().map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
};
state.secret = sDictionary[state.number];
console.log(state.secret);
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if (currentTheme) { 
    document.documentElement.setAttribute('data-theme', currentTheme);
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
}
function changeColorMode() {
    let curr = document.documentElement.getAttribute('data-theme');
    if (curr == 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}
const colorModeButton = document.getElementById("colormode");
colorModeButton.addEventListener("click", changeColorMode);
const keyboard = document.getElementsByClassName("keyboard-container")[0];
const rows = keyboard.children;
for (let i = 0; i < rows.length; i++){
    const row = rows[i]
    const keys = row.children;
    for (let j = 0; j < keys.length; j++){
        const key = keys[j];
        if (key.tagName==="BUTTON"){
            
            key.addEventListener("click",handleKeyboardEvent);
        }
    }
}
 
function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`)
            box.textContent = state.grid[i][j];
            if (box.textContent == '') {
                box.classList.remove('entered')
            }
            if (isLetter(box.textContent)) {
                box.classList.add('entered')
                if (box.classList.contains('displayed')) {
                    box.classList.remove('entered')
                }
            }

        }
    }
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;
    container.appendChild(box);
    return box;
}

function drawGrid() {
    const grid = document.getElementsByClassName('grid')[0];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j)
        }
    }
}
function registerKeyboardEvents() {
    document.body.onkeydown = handleKeyboardEvent;
}
function handleKeyboardEvent(e) {
    if(!gameIsOver){
    const key = e.key ? e.key : e.target.id.substring(3);;
    if (key === 'Enter') {
        if (state.currentCol === 5) {
            const word = getCurrentWord();
            const isValid = isWordValid(word);
            if (isValid[0]) {
                revealWord(word, isValid[1]);
                state.currentRow++;
                state.currentCol = 0;
            }
            else {
                const shook_duration = 600;
                const row = state.currentRow;
                for (let i = 0; i < 5; i++) {
                    const box = document.getElementById(`box${row}${i}`);
                    box.classList.add('shook');
                    setTimeout(() => {
                        box.classList.remove('shook');
                    }, shook_duration);
                }
            }
        }
    }
    if (key === 'Backspace') {
        removeLetter();
    }
    if (isLetter(key)) {
        addLetter(key);
    }
    updateGrid();
}
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr).toLowerCase();
}
function isWordValid(word) {
    let isWordValidBool = lDictionary.includes(word);
    let isWordValidInt = lDictionary.findIndex(elem => elem == word);
    return [isWordValidBool, isWordValidInt];
}
function revealWord(guess, index) {
    const row = state.currentRow;
    const flop_duration = 500;
    const bounce_duration = 250;
    const spin_duration = 1000;
    const liar = (row + index + state.number) % 10;
    const liarColour = liar % 2;
    const liarBox = (liar - liarColour) / 2
    console.log(liar, liarColour, liarBox)
    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`)
        const letter = box.textContent.toLowerCase();
        setTimeout(() => {
            if (letter === state.secret[i]) {
                if (i != liarBox) {
                    box.classList.add('right');
                } else {
                    box.classList.add('empty');
                }
                box.classList.remove('entered');
                box.classList.add('displayed');
            } else if (state.secret.includes(letter)) {
                if (i != liarBox) {
                    box.classList.add('wrong');
                } else {
                    box.classList.add('empty');
                } 
                box.classList.remove('entered');
                box.classList.add('displayed');
            } else {
                if (i != liarBox) {
                    box.classList.add('empty');
                } else if (liarColour == 0) {
                    box.classList.add('right');
                } else {
                    box.classList.add('wrong');
                }
                box.classList.remove('entered');
                box.classList.add('displayed');
            }
        }, (i + 1) * flop_duration / 2);
        box.classList.add('animated');
        box.style.animationDelay = `${(i * flop_duration) / 2}ms`
    }
    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 7 && !isWinner;
    gameIsOver = isWinner || isGameOver;
    setTimeout(() => {
        if (isGameOver) {
            alert(`Better luck next time! The word was ${state.secret}.`);
        }
    }, 3 * flop_duration);
    if (isWinner) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const box = document.getElementById(`box${row}${i}`);
                if (box.classList.contains('empty') || box.classList.contains('wrong')) {
                    box.classList.add('spun');
                    
                    box.classList.add('right');
                    
                    setTimeout(() => {
                        box.classList.remove('spun');
                    }, spin_duration);

                }
            }, 3 * flop_duration);
        }
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const box = document.getElementById(`box${row}${i}`)
                box.classList.add('won')
            }, ((24 * flop_duration + i * bounce_duration + 8 * spin_duration) / 8))
        }
        setTimeout(() => {
            console.log('Congratulations!')
        }, ((24 * flop_duration + 100 * bounce_duration + 8 * spin_duration) / 8))

    }
}



function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}
function addLetter(letter) {
    if (state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = letter.toLowerCase();
    state.currentCol++;
}
function removeLetter() {
    if (state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}
function setup() {
    drawGrid();
    registerKeyboardEvents();
}
setup();
