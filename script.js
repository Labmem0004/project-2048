var array = [0,0,0,0,     //0  1  2  3
             0,0,0,0,     //4  5  6  7     只记录幂的指数
             0,0,0,0,     //8  9  10 11
             0,0,0,0];    //12 13 14 15
var pastArray = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
var score = 0;
var inGame = false;

const myScore = document.querySelector('.score');
const playOffchain = document.getElementById('offchain');
const newGame = document.getElementById('newgame');
const gameBox = document.getElementById('gameBox');

document.addEventListener('keydown',(event) => {
    if (inGame) {
        event.preventDefault();
        switch (event.which) {
            case 38:
                moveUp();
                break;
            case 39:
                moveRight();
                break;
            case 40:
                moveDown();
                break;
            case 37:
                moveLeft();
                break;
            case 87:
                moveUp();
                break;
            case 68:
                moveRight();
                break;
            case 83:
                moveDown();
                break;
            case 65:
                moveLeft();
                break;
        }
    } 
})

playOffchain.addEventListener('click',gameStart);

const cells = [];

class Cell {
    constructor(position, level) {
        this.position = position;
        this.level = level;
        this.cell = document.createElement('div');
        this.set_class('new');
        this.set_content();
        gameBox.appendChild(this.cell)
    }

    set_class(c) {
        this.cell.setAttribute('class', `cell position-${this.position} color-${this.level} ${c?c:''}`)
    }

    set_content() {
        this.cell.textContent = 2 ** this.level
    }

    moveTo(position) {
        this.position = position;
        this.set_class()
    }

    levelup(delay) {
        setTimeout(() => {
            this.level += 1
            this.set_class()
            this.set_content()
        }, delay)
    }

    destroy(delay) {
        setTimeout(() => this.cell.parentNode.removeChild(this.cell), delay)
    }
}

function check() {
    let x = 0;
    let y = 0;
    for (let i=0; i<16; i++) {
        if (pastArray[i] !== array[i]) {x++}
        if (array[i] === 0) {y++}
    }
    if (x === 0 && y === 0) {return true}
    else {return false}
}

function generate() {
    let r = 0;
    for (let i=1; i!==0; i=array[r]) { r = random(16); }
    array[r] = 1;
    cells[r] = new Cell(r,1);
}

function moveUp() {
    if (inGame) {
        for (let i=0; i<16; i++) {
            pastArray[i] = array[i];
        }
    
        for (let i=4; i<=12; i+=4) {
            for (let j=0; j<4; j++) {
                let n = i + j;
    
                if (array[n] !== 0) {
                    for (let k=1; ; k++) {
                        let p = n - 4 * k;
                        let q = p + 4;
    
                        if (p < 0) {
                            array[j] = array[n];
                            array[n] = 0;
                            cells[n].moveTo(j);
                            cells[j] = cells[n];
                            cells[n] = null;
                            break;
                        }
    
                        if (array[p] !== 0) {
                            if (array[p] === array[n]) {
                                array[p] += 1;
                                array[n] = 0;
                                cells[n].moveTo(p);
                                cells[n].destroy(100);
                                cells[p].levelup(100);
                                cells[n] = null;
                            } else if (k > 1) {
                                array[q] = array[n];
                                array[n] = 0;
                                cells[n].moveTo(q);
                                cells[q] = cells[n];
                                cells[n] = null;
                            }
                            break;
                        }
                    }
                }
            }
        }

        if (check()) {
            setGameOver();
        } else {
            generate();
            score++;
            myScore.textContent = score;
        }
    }
}

function moveRight() {
    if (inGame) {
        for (let i=0; i<16; i++) {
            pastArray[i] = array[i];
        }

        for (let j=2; j>=0; j--) {
            for (let i=0; i<=12; i+=4) {
                let n = i + j;
    
                if (array[n] !== 0) {
                    for (let k=1; ; k++) {
                        let p = n + k;
                        let q = p - 1;
    
                        if (j+k > 3) {
                            array[i+3] = array[n];
                            array[n] = 0;
                            cells[n].moveTo(i+3);
                            cells[i+3] = cells[n];
                            cells[n] = null;
                            break;
                        }
    
                        if (array[p] !== 0) {
                            if (array[p] === array[n]) {
                                array[p] += 1;
                                array[n] = 0;
                                cells[n].moveTo(p);
                                cells[n].destroy(100);
                                cells[p].levelup(100);
                                cells[n] = null;
                                
                            } else if (k > 1) {
                                array[q] = array[n];
                                array[n] = 0;
                                cells[n].moveTo(q);
                                cells[q] = cells[n];
                                cells[n] = null;
                                
                            }
                            break;
                        }
                    }
                }
            }
        }

        if (check()) {
            setGameOver();
        } else {
            generate();
            score++;
            myScore.textContent = score;
        }
    }
}

function moveDown() {
    if (inGame) {
        for (let i=0; i<16; i++) {
            pastArray[i] = array[i];
        }

        for (let i=8; i>=0; i-=4) {
            for (let j=0; j<4; j++) {
                let n = i + j;
    
                if (array[n] !== 0) {
                    for (let k=1; ; k++) {
                        let p = n + 4 * k;
                        let q = p - 4;
    
                        if (i+4*k > 12) {
                            array[j+12] = array[n];
                            array[n] = 0;
                            cells[n].moveTo(j+12);
                            cells[j+12] = cells[n];
                            cells[n] = null;
                            break;
                        }
    
                        if (array[p] !== 0) {
                            if (array[p] === array[n]) {
                                array[p] += 1;
                                array[n] = 0;
                                cells[n].moveTo(p);
                                cells[n].destroy(100);
                                cells[p].levelup(100);
                                cells[n] = null;
                            } else if (k > 1) {
                                array[q] = array[n];
                                array[n] = 0;
                                cells[n].moveTo(q);
                                cells[q] = cells[n];
                                cells[n] = null;
                            }
                            break;
                        }
                    }
                }
            }
        }

        if (check()) {
            setGameOver();
        } else {
            generate();
            score++;
            myScore.textContent = score;
        }
    }
}

function moveLeft() {
    if (inGame) {
        for (let i=0; i<16; i++) {
            pastArray[i] = array[i];
        }

        for (let j=1; j<4; j++) {
            for (let i=0; i<=12; i+=4) {
                let n = i + j;
    
                if (array[n] !== 0) {
                    for (let k=1; ; k++) {
                        let p = n - k;
                        let q = p + 1;
    
                        if (j-k < 0) {
                            array[i] = array[n];
                            array[n] = 0;
                            cells[n].moveTo(i);
                            cells[i] = cells[n];
                            cells[n] = null;
                            break;
                        }
    
                        if (array[p] !== 0) {
                            if (array[p] === array[n]) {
                                array[p] += 1;
                                array[n] = 0;
                                cells[n].moveTo(p);
                                cells[n].destroy(100);
                                cells[p].levelup(100);
                                cells[n] = null;
                            } else if (k > 1) {
                                array[q] = array[n];
                                array[n] = 0;
                                cells[n].moveTo(q);
                                cells[q] = cells[n];
                                cells[n] = null;
                            }
                            break;
                        }
                    }
                }
            }
        }

        if (check()) {
            setGameOver();
        } else {
            generate();
            score++;
            myScore.textContent = score;
        }
    }
}

function random(max) {
    return Math.floor(Math.random() * max);
}


function gameStart() {
    inGame = true;
    array.fill(0);
    cells.length = 0;
    while (gameBox.firstChild) {
        gameBox.removeChild(gameBox.firstChild)
    }
    score = 0;
    myScore.textContent = 0;
    
    generate();
}

var gameOverDiv;
function setGameOver() {
    inGame = false;

    
    gameOverDiv = document.createElement('div');
    gameOverDiv.setAttribute('class','gameOverDiv');
    gameBox.appendChild(gameOverDiv);

    let gameOverP = document.createElement('p');
    gameOverP.setAttribute('class','gameOverP');
    gameOverP.textContent = `Your score: ${score}`;
    gameOverDiv.appendChild(gameOverP);

    let restartButton = document.createElement('button');
    restartButton.setAttribute('class','restartButton');
    restartButton.textContent = 'Restart';
    gameOverDiv.appendChild(restartButton);
    restartButton.addEventListener('click',restart);
}

function restart() {
    gameBox.removeChild(gameOverDiv);

    gameStart();
}

















/*






function random(max) {
    return Math.floor(Math.random() * max);
}

function check() {
    let x = 0;
    for (let i=0; i<16; i++) {
        if (myArray[i] !== myArrayPast[i]) {
            x++;
        }
    }
    if (x === 0) {return true;}
    else {return false;}
}

function pressUp() {
    if (inGame) {
        up();
        if (check()) {
            setGameOver();
        } else {
            let x = 0;
            for (let i=1; i!==0; i=myArray[x]) { x = random(16); }
            myArray[x] = 2;
            score++;
            myScore.textContent = score;
        }
    }
}

function up() {
    for (let i=0; i<16; i++) {
        myArrayPast[i] = myArray[i];
    }
    //在数组变化前先储存下来变化前的状态

    for (let j=0; j<=3; j++) {
        var count = 0;
        for (let i=0; i<=12; i=i+4) {
            if (myArray[i+j] !== 0) {
                count = count + 1;
            }
        } 
        //计算每行or列有多少不为0的数
        var countA,countB,countC;
        switch (count) {
            case 0:
                break;
            case 1:
                for (let i=0; i<=12; i=i+4) {
                    if (myArray[i+j] !== 0) {
                        //
                        myArray[j] = myArray[i+j];
                        myArray[j+4] = myArray[j+8] = myArray[j+12] = 0;
                    }
                }
                break;
            case 2:
                for (let i=0,k=0; i<=12 && k<=1; i=i+4) {
                    if (myArray[i+j] !== 0 && k === 0) {
                        countA = i+j;
                        k++;
                    } else if (myArray[i+j] !== 0 && k === 1) {
                        countB = i+j;
                        k++;
                    }
                }
                if (countA === countB) {
                    countA = countA * 2;
                    countB = 0;
                }
                myArray[j] = countA;
                myArray[j+4] = countB;
                myArray[j+8] = myArray[j+12] = 0;
                break;
            case 3:
                for (let i=0,k=0; i<=12 && k<=2; i=i+4) {
                    if (myArray[i+j] !== 0 && k === 0) {
                        countA = myArray[i+j];
                        k++;
                    } else if (myArray[i+j] !== 0 && k === 1) {
                        countB = myArray[i+j];
                        k++;
                    } else if (myArray[i+j] !== 0 && k === 2) {
                        countC = myArray[i+j];
                        k++;
                    }
                }
                if (countA === countB) {
                    countA = countA * 2;
                    countB = countC;
                    countC = 0;
                } else if (countB === countC) {
                    countB = countB * 2;
                    countC = 0;                   
                }
                myArray[j] = countA;
                myArray[j+4] = countB;
                myArray[j+8] = countC;
                myArray[j+12] = 0;
                break;
            case 4:
                if (myArray[j] === myArray[j+4]) {
                    myArray[j] = myArray[j] * 2;
                    myArray[j+4] = myArray[j+8];
                    myArray[j+8] = myArray[j+12];
                    myArray[j+12] = 0;
                    if (myArray[j+4] === myArray[j+8]) {
                        myArray[j+4] = myArray[j+4] * 2;
                        myArray[j+8] = 0;
                    }
                } else if (myArray[j+4] === myArray[j+8]) {
                    myArray[j+4] = myArray[j+4] * 2;
                    myArray[j+8] = myArray[j+12];
                    myArray[j+12] = 0;
                } else if (myArray[j+8] === myArray[j+12]) {
                    myArray[j+8] = myArray[j+8] * 2;
                    myArray[j+12] = 0;
                }
                break;
       }
    }
}













function setDiv (cell,num) {
    if (myArrayPast[num] === 0) {
        if (myArray[num] !== 0) {///////////////////////////
        }
        switch (myArray[num]) {
            case 2:
                cell.textContent = '2';
                cell.style.color = 'rgb(120, 110, 100)';
                cell.style.backgroundColor = 'rgb(236, 225, 204)';
                break;
            case 4:
                cell.textContent = '4';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'rgb(234, 180, 130)';
                break;
            case 8:
                cell.textContent = '8';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'rgb(233, 154, 109)';
                break;
            case 16:
                cell.textContent = '16';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'rgb(232, 130, 103)';
                break;
            case 32:
                cell.textContent = '32';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'rgb(230, 105, 72)';
                break;
            case 64:
                cell.textContent = '64';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'rgb(233, 208, 128)';
                break;
            case 128:
                cell.textContent = '128';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'rgb(233, 204, 114)';
                break;
            case 256:
                cell.textContent = '256';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'rgb(232, 201, 101)';
                break;
            case 512:
                cell.textContent = '512';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'rgb(233, 197, 89)';
                break;
            case 1024:
                cell.textContent = '1024';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'rgb(233, 194, 78)';
                break;
            case 2048:
                cell.textContent = '2048';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'red';
                break;
            case 4096:
                cell.textContent = '4096';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'blue';
                break;
            case 8192:
                cell.textContent = '8192';
                cell.style.color = 'white';
                cell.style.backgroundColor = 'pink';
                break;
        }
    }
}

 操作数组变化，同时设置方块移动动作～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～ 

//根据i和j设置引用的方块
function setCell(i,j) {
    switch (i+j) {
        case 0: cell = document.querySelector('.cell1');break;
        case 1: cell = document.querySelector('.cell2');break;
        case 2: cell = document.querySelector('.cell3');break;
        case 3: cell = document.querySelector('.cell4');break;
        case 4: cell = document.querySelector('.cell5');break;
        case 5: cell = document.querySelector('.cell6');break;
        case 6: cell = document.querySelector('.cell7');break;
        case 7: cell = document.querySelector('.cell8');break;
        case 8: cell = document.querySelector('.cell9');break;
        case 9: cell = document.querySelector('.cell10');break;
        case 10: cell = document.querySelector('.cell11');break;
        case 11: cell = document.querySelector('.cell12');break;
        case 12: cell = document.querySelector('.cell13');break;
        case 13: cell = document.querySelector('.cell14');break;
        case 14: cell = document.querySelector('.cell15');break;
        case 15: cell = document.querySelector('.cell16');break;
    }
}

function setMoveUp(count,i,j,k) {
    setCell(i,j);
    let step = 0;
    switch (count) {
        case 0:
            break;
        case 1:
            step = i / 4;
            switch (step) {
                case 0:
                    break;
                case 1:
                    cell.classList.add('up1');
                    break;
                case 2:
                    cell.classList.add('up2');
                    break;
                case 3:
                    cell.classList.add('up3');
                    break;
            }
    }
} */