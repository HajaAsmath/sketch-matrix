const paintBlack = 'Fill black';
const lightenColor = 'Lighten colors';
const randomColor = 'Fill random color';
const paintShade = 'Shade it';

function makeGrid(number, rangeValue) {
    const canvas = document.querySelector('.canvas');
    canvas.textContent = '';
    rangeValue.textContent = number;
    canvas.setAttribute("style",`grid-template-rows: repeat(${number},${512/number}px)`);
    canvas.setAttribute("style",`grid-template-columns: repeat(${number},${512/number}px)`);
    for(let i = 0;i<(number*number);i++){
        const div = document.createElement('div');
        div.addEventListener("mouseover", paint);
        canvas.appendChild(div);
    }
}

function paint(e) {
    const value = window.getComputedStyle(e.target).backgroundColor;
    const parts = value.match(/[\d.]+/g);

    const option = document.querySelector(".checked");

    if(option === null || option.innerText === paintBlack) {
        fillBlack(e);
    }else if(option.innerText === lightenColor) {
        lightenCanvas(e, parts);
    } else if (option.innerText === randomColor) {
        fillMultiColor(e);
    } else if (option.innerText === paintShade) {
        shadeCanvas(e, parts[3]);
    }
}

function fillBlack(e) {
    e.target.style.backgroundColor = `rgb(0,0,0)`;
}

function fillMultiColor(e) {
    e.target.style.backgroundColor = `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;
}

function shadeCanvas(e, alphaValue) {
    if (alphaValue === 1 || alphaValue === undefined) {
        return;
    } else {
        e.target.style.backgroundColor = `rgb(0,0,0,${Number(alphaValue) + 0.1})`;
    }
}

function lightenCanvas(e, parts) {
    if (parts[3] === 0) {
        return;
    } else if(parts[3] === undefined) {
        e.target.style.backgroundColor = `rgb(${parts[0]},${parts[1]},${parts[2]},${0.9})`;
    } else {
        e.target.style.backgroundColor = `rgb(${parts[0]},${parts[1]},${parts[2]},${Number(parts[3]) - 0.1})`;
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 255);
}

function toggleClick(e) {
    document.querySelectorAll('.option').forEach(option => option.classList.remove('checked'));
    e.target.classList.add("checked");
}

function start() {
    const slider = document.querySelector('#range');
    const rangeValue = document.querySelector('#range-value');
    const options = document.querySelectorAll('.option');
    makeGrid(slider.value, rangeValue);
    rangeValue.textContent = slider.value;
    slider.addEventListener('input', function(e) {
        makeGrid(e.target.value, rangeValue);
    });

    options.forEach(option => option.addEventListener('click', toggleClick));
}

start();