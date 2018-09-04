let sign = '';
let result = 0;
let flag = true;
let memory = 0;
let memSignFlag = true;
document.addEventListener('click', function (e) {
    let elem = document.getElementById('screen');
    if (e.target.classList.contains('black')) {
        if (elem.value === '0') {
            elem.value = '';
        } else if (!flag) {
            elem.value = '';
            flag = true;
        }
        switch (true) {
            case e.target.value === "0" && elem.value.length !== 0:
            case '123456789'.indexOf(e.target.value) >= 0 :
            case (e.target.value === "." && elem.value.indexOf('.') < 0 && elem.value.length !== 0):
                elem.value = elem.value + e.target.value;
                break;
            case e.target.value === "C":
                elem.value = "0";
                result = 0;
                break;
            case (e.target.value === "." && elem.value.indexOf('.') < 0):
                elem.value = elem.value + '0' + e.target.value;
                break;
            case (e.target.value === "0"):
                elem.value = e.target.value + '.';
                break;
        }
    } else if (e.target.classList.contains('pink')) {
        result = (elem.value !== '0' && flag && sign !== '') ? operation(result, +elem.value, sign) : +elem.value;
        if (result !== 0) {
            flag = false;
        }
        sign = e.target.value;
        elem.value = result;
    } else if (e.target.classList.contains('orange')) {
        result = (sign !== '' && flag) ? operation(result, +elem.value, sign) : +elem.value;
        flag = false;
        elem.value = result;
        sign = '';
    } else if (e.target.classList.contains('gray')) {
        if (e.target.value === 'mrc') {
            elem.value = memory;
        } else if (e.target.value === 'm+') {
            elem.value = +elem.value + memory;
            memory = +elem.value;
            createMemorySign();
        } else if (e.target.value === 'm-') {
            elem.value = +elem.value - memory;
            memory = +elem.value;
            createMemorySign();
        }
    }
});

document.addEventListener('dblclick', function (e) {
    if (e.target.classList.contains('gray') && e.target.value === 'mrc') {
        memory = 0;
        document.getElementById('screen').value = 0;
        removeMemorySign();
        memSignFlag = true;
    }
});

function operation(elem1, elem2, sign) {
    switch (true) {
        case sign === '+':
            return elem1 + elem2;
        case sign === '-':
            return elem1 - elem2;
        case sign === '/':
            return elem1 / elem2;
        case sign === '*':
            return elem1 * elem2;
    }
}

function createMemorySign() {
    if (memSignFlag) {
        let memSign = document.createElement('div');
        memSign.id = 'memSign';
        memSign.innerText = 'm';
        memSign.style = "position: absolute;" +
            "top: 0;" +
            "left: 5px;" +
            "font-size: 18px;";
        document.body.getElementsByClassName('display')[0].appendChild(memSign);
        memSignFlag = false;
    }
}

function removeMemorySign() {
    let memSign = document.getElementById('memSign');
    document.body.getElementsByClassName('display')[0].removeChild(memSign);
}

document.addEventListener('keydown', function (e) {
    console.log(e.key);
    let elem = document.getElementById('screen');
    if (['0','1','2','3','4','5','6','7','8','9','.','Backspace', 'Delete'].indexOf(e.key) !== -1) {
        if (elem.value === '0') {
            elem.value = '';
        } else if (!flag) {
            elem.value = '';
            flag = true;
        }
        switch (true) {
            case e.key === "0" && elem.value.length !== 0:
            case '123456789'.indexOf(e.key) >= 0 :
            case (e.key === "." && elem.value.indexOf('.') < 0 && elem.value.length !== 0):
                elem.value = elem.value + e.key;
                break;
            case e.key === "Delete":
            case e.key === "Backspace":
                elem.value = "0";
                result = 0;
                break;
            case (e.key === "." && elem.value.indexOf('.') < 0):
                elem.value = elem.value + '0' + e.key;
                break;
            case (e.key === "0"):
                elem.value = e.key + '.';
                break;
        }
    } else if (['+','-','*','/'].indexOf(e.key) !== -1) {
        result = (elem.value !== '0' && flag && sign !== '') ? operation(result, +elem.value, sign) : result = +elem.value;
        if (result !== 0) {
            flag = false;
        }
        sign = e.key;
        elem.value = result;
    } else if (e.key ==='Enter') {
        result = (sign !== '' && flag) ? operation(result, +elem.value, sign) : +elem.value;
        flag = false;
        elem.value = result;
        sign = '';
    }
});