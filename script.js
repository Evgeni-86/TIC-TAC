const marker = document.querySelectorAll('.marker');
const cells = document.querySelectorAll('.cells');
let crossIcon = 'cross';
let nullIcon = 'null';
let winner = false;
/**********ИГРОВОЕ ПОЛЕ**********************************************/
const gameBoard = {
   gameBoardArr: [],
};
/*****************************************************************/
/**********ИГРОКИ***********************************************/
const playersFactory = function(name, points, marker, statusWin) {
    return { name, points, marker, statusWin };
};
    /**создаем игрока**/
const player1 = playersFactory('playerOne', 0, '', false);
const player2 = playersFactory('playerTwo', 0, '', false);
/*****************************************************************/
/**********СТАРТ***************************/
function startGame () {
    player1.statusWin = false;
    player2.statusWin = false;
    gameBoard.gameBoardArr = [];
    tabloModul.clearTablo();
};
/*****************************************/
/**********ВЫБИРАЕМ МАРКЕР И ОЧИЩАЕМ МАССИВ И ТАБЛО******************/
marker.forEach(element => {
    element.onclick = function () {
        let marker = element.classList.contains('cross');
        if (marker) { player1.marker = crossIcon; player2.marker = nullIcon }
        else { player1.marker = nullIcon; player2.marker = crossIcon };
        startGame();
    };
});
/****************************************************************/  
/**********ОТСЛЕЖИВАЕМ ЯЧЕЙКИ И ИГРА**********************************/
cells.forEach(element => {
    element.onclick = function () { 
        if (player1Motion(element)) { /*если сходил игрок то*/
            isVictory(player1); /*выиграл ли он*/
            computerPlay() /*ходит компьютер*/
            isVictory(player2); /*выиграл ли он*/
            whoVictory(player1, player2);
        };
    };
});
/**************************************************************/
/**********ХОД ИГРОКА (у игрока есть шанс последнего хода)******/
function player1Motion (element) {
        if (!element.textContent && player1.marker && !player1.statusWin) {
            let cells = element;
            cells.textContent = player1.marker;
            gameBoard.gameBoardArr.push(cells);
            console.log(gameBoard.gameBoardArr);
            return true;
        }
};
/********************************************************************/
/***********ХОД КОМПЬЮТЕРА (у компьютера есть шанс последнего хода)***/
function computerPlay () {
    if (gameBoard.gameBoardArr.length < cells.length && !player2.statusWin) {
        let element = cells[Math.floor(Math.random() * (cells.length - 0)) + 0];
        if (!element.textContent) {
            gameBoard.gameBoardArr.push(element);
            element.textContent = player2.marker;
        }
        else computerPlay();
    };
};
/************************************************************/
/***********ОЧИСТКА ТАБЛО*******************/
const tabloModul = {
    clearTablo() {
        cells.forEach(element => {
            element.textContent = '';
        });
    }
};
/*********************************************/
/***********ПРОВЕРКА ПОБЕДИТЕЛЯ*****************************/
function isVictory(name) {
        let combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let comb of combs) {
            if (
                cells[comb[0]].textContent == cells[comb[1]].textContent &&
                cells[comb[1]].textContent == cells[comb[2]].textContent &&
                cells[comb[0]].textContent != ''
            ) 
            {    
                if (cells[comb[0]].textContent == name.marker) {
                name.statusWin = true;
                };
            };
        };
};
/***************************************************************/
/**********КТО ВЫИГРАЛ*****************************************/
function whoVictory (player1, player2) {
    if (player1.statusWin && !player2.statusWin ) { console.log(player1.name+' '+'Win') };
    if (player2.statusWin && !player1.statusWin ) { console.log(player2.name+' '+'Win') };
    if (player1.statusWin && player2.statusWin )  { console.log('Draw') };
    if (gameBoard.gameBoardArr.length == cells.length) {
        if (!player1.statusWin && !player2.statusWin) { console.log('No Winer') };
    };
};
/***************************************************************/