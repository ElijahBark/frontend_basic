randomMine(8);
let isPlaying = true;

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell') && isPlaying) {
        let amount = document.getElementById('cells-amount');
        amount = +amount.value > 8 ? +amount.value : 8;
        if (e.target.classList.contains('mine')) {
            gameOver();
        } else {
            checkForMines(e.target, amount);
        }
    }
});

document.addEventListener('click', function (e) {
    if (e.target.id === 'submit') {
        let amount = document.getElementById('cells-amount');
        amount = +amount.value > 8 ? +amount.value : 8;
        beginningOfNewGame(amount);
        initializationOfMineLabels(amount);
        randomMine(amount);
    }
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('cell')
        && !e.target.classList.contains('checked')
        && isPlaying) {
        if (e.target.classList.contains('mine-label')) {
            e.target.style.backgroundColor = '#4bcaff';
            e.target.classList.remove('mine-label');
            changeNumOflabels(e, true);
        } else {
            e.target.style.backgroundColor = 'yellow';
            e.target.classList.add('mine-label');
            changeNumOflabels(e, false);
        }
    }
});

document.addEventListener('dblclick', function (e) {
    if (e.target.classList.contains('cell') && isPlaying) {
        let amount = document.getElementById('cells-amount');
        amount = +amount.value > 8 ? +amount.value : 8;
        checkForLabelsAround(e.target, amount);
    }
});

function beginningOfNewGame(amount) {
    isPlaying = true;
    document.body.removeChild(document.getElementsByClassName('row-container')[0]);
    let rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
    for (let i = 0; i < amount; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < amount; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        rowContainer.appendChild(row);
    }
    document.body.insertBefore(rowContainer, document.getElementsByTagName('script')[0]);
}

function changeNumOflabels(event, flag) {
    let elem = document.getElementById('mine-counter');
    let elemInside = elem.innerHTML.split('/');
    if (flag) {
        elemInside[0]--;
    } else {
        elemInside[0]++;
    }
    elemInside = elemInside.join('/');
    elem.innerHTML = elemInside;

}

function initializationOfMineLabels(amount) {
    let elem = document.getElementById('mine-counter');
    let elemInside = elem.innerHTML.split('/');
    elemInside[0] = '0';
    elemInside[1] = Math.floor((amount * amount) / 6);
    elem.innerHTML = elemInside.join('/');
}

function randomMine(amount) {
    let rows = document.getElementsByClassName('row');
    let counter = 0;
    while (counter < (amount * amount) / 6 -1) {
        let numOfRow = Math.floor(Math.random() * amount);
        let numOfCell = Math.floor(Math.random() * amount);
        let row = rows[numOfRow];
        let cell = row.children[numOfCell];
        if (!cell.classList.contains('mine')) {
            cell.classList.add('mine');
            // cell.style.backgroundColor = 'yellow';
            counter++;
        }
    }
}

function checkForMines(elem, amount) {
    let cells = searchNeighbourCells(elem, amount);

    let newCells = cells.filter(function (item) {
        return item.classList.contains('mine');
    });

    elem.innerHTML = newCells.length > 0 ? newCells.length : "";
    elem.style.backgroundColor = newCells.length > 0 ? 'grey' : 'white';
    elem.classList.add('checked');

    if (newCells.length === 0) {
        for (let i = 0; i < cells.length; i++) {
            if (!cells[i].classList.contains('checked')) {
                checkForMines(cells[i], amount);
            }
        }
    }
}

function searchNeighbourCells(elem, amount) {
    let row = elem.parentElement;
    let numb = [].indexOf.call(row.children, elem);
    let rows = row.parentElement.children;
    let rowNumb = [].indexOf.call(rows, row);
    let newRows = [];
    newRows.push(rows[rowNumb]);
    if (rowNumb !== 0) newRows.push(rows[rowNumb - 1]);
    if (rowNumb !== amount - 1) newRows.push(rows[rowNumb + 1]);
    let cells = [];
    for (let i = 0; i < newRows.length; i++) {
        let rowChildren = newRows[i].children;
        cells.push(rowChildren[numb]);
        if (numb !== 0) cells.push(rowChildren[numb - 1]);
        if (numb !== amount - 1) cells.push(rowChildren[numb + 1]);
    }
    return cells;
}

function checkForLabelsAround(elem, amount) {
    let cells = searchNeighbourCells(elem, amount);


    let labelCells = cells.filter(function (item) {
        return item.classList.contains('mine-label');
    });

    let hiddenCells = cells.filter(function (item) {
        return !item.classList.contains('checked') && !item.classList.contains('mine-label');
    });

    if (labelCells.length === +elem.innerHTML) {
        for (let i = 0; i < hiddenCells.length; i++) {
            let current = hiddenCells[i];
            if (current.classList.contains('mine') && !current.classList.contains('mine-label')) {
                gameOver();
            }
            else {
                let currentCells = searchNeighbourCells(current, amount);
                let newCurCells = currentCells.filter(function (item) {
                    return item.classList.contains('mine');
                });

                current.innerHTML = newCurCells.length > 0 ? newCurCells.length : "";
                current.style.backgroundColor = newCurCells.length > 0 ? 'grey' : 'white';
                current.classList.add('checked');
                if (newCurCells.length === 0) {
                    checkForLabelsAround(current, amount);
                }
            }
        }
    }
}
function gameOver() {
    let others = document.getElementsByClassName('cell');
    for (let i = 0; i < others.length; i++) {
        others[i].style.backgroundColor = 'grey';
        others[i].innerHTML = '';
    }
    let mines = document.getElementsByClassName('mine');
    for (let i = 0; i < mines.length; i++) {
        mines[i].style.backgroundColor = 'red';
    }
    isPlaying = false;
}