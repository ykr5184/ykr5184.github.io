import {dictionary} from './dictionary.js'
const state = {
    secret: dictionary[Math.floor(Math.random()*dictionary.length)],
    grid: Array(6).fill().map(()=>Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
};
function updateGrid(){
    for(let i = 0; i < state.grid.length; i++){
        for(let j = 0; j < state.grid[i].length; j++){
            const box = document.getElementById(`box${i}${j}`)
            box.textContent = state.grid[i][j];
            if (box.textContent==''){
                box.classList.remove('entered')
            }
            if (isLetter(box.textContent)){
                box.classList.add('entered')
                if (box.classList.contains('displayed')){
                    box.classList.remove('entered')
                }
            }

        }
    }
}

function drawBox(container, row, col, letter = ''){
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

function drawGrid(container){
    const grid = document.createElement('div');
    grid.className = 'grid';
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 5; j++){
            drawBox(grid,i,j)
        }
    }
    container.appendChild(grid);
}
function registerKeyboardEvents(){
    document.body.onkeydown = (e) => {
        const key = e.key;
        if(key === 'Enter'){
            if (state.currentCol === 5){
                const word = getCurrentWord();
                if (isWordValid(word)){
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                }
                else {
                    alert('Not a valid word.');
                }
            }
        }
        if(key === 'Backspace'){
            removeLetter();
        }
        if(isLetter(key)){
            addLetter(key)
        }
        updateGrid();
    }
}
function getCurrentWord(){
    return state.grid[state.currentRow].reduce((prev,curr)=>prev+curr);
}
function isWordValid(word){
    return dictionary.includes(word)
}
function revealWord(guess){
    const row = state.currentRow;
    const flop_duration = 500;
    const bounce_duration = 250;
    for(let i = 0; i < 5; i++){
        const box = document.getElementById(`box${row}${i}`)
        const letter = box.textContent;
        setTimeout(()=>{
        if (letter===state.secret[i]){
            box.classList.add('right');
            box.classList.remove('entered');
            box.classList.add('displayed');
        } else if(state.secret.includes(letter)){
            box.classList.add('wrong');
            box.classList.remove('entered');
            box.classList.add('displayed');
        } else{
            box.classList.add('empty');
            box.classList.remove('entered');
            box.classList.add('displayed');
        }
    }, (i+1)*flop_duration / 2);
        box.classList.add('animated');
        box.style.animationDelay = `${(i * flop_duration) / 2}ms`
    }
    const isWinner = state.secret===guess;
    const isGameOver = state.currentRow===5 && !isWinner;
    setTimeout(()=>{
    if(isGameOver){
        alert(`Better luck next time! The word was ${state.secret}.`);
    }
    }, 3*flop_duration);
    if(isWinner){
        for(let i = 0; i<5; i++){
            setTimeout(()=>{
                const box = document.getElementById(`box${row}${i}`)
                box.classList.add('won')
            },((6*flop_duration+i*bounce_duration)/2))
        }
        setTimeout(()=>{
            alert('Congratulations!')
        }, 10*(flop_duration+bounce_duration)/2)
        
    }
}
 
    

function isLetter(key){
    return key.length===1 && key.match(/[a-z]/i);
}
function addLetter(letter){
    if(state.currentCol===5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}
function removeLetter(){
    if(state.currentCol===0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}
function setup() {
    const game = document.getElementById('game');
    drawGrid(game)

    registerKeyboardEvents()
}
setup();
