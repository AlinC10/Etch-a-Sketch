const mainDiv = document.querySelector("#drawing-table");
let width = mainDiv.offsetWidth;
const buttons = document.getElementById("options");
let gridDimension;
let draw = 1;
let drawMode = 1;
let delChangeColor = document.querySelector("#colors div");

function verifySize(questioningSize) {
    if(questioningSize > 100) {
        alert("The value introduced is too big. Use values between 2 and 100!!");
        return 0;
    }
    if(questioningSize < 2) {
        alert("The value introduced is too small. Use values between 2 and 100!!");
        return 0;
    }
    return 1;
}

function createGrid() {
    const xInput = document.querySelector("#x-axes");
    gridDimension = xInput.value;
    const pxSize = Number(width) / gridDimension;
    for (let i = 0; i < gridDimension; i++) {
        for (let j = 0; j < gridDimension; j++) {
            const miniDiv = document.createElement("div");
            miniDiv.classList.add("mini-div");
            miniDiv.setAttribute(
                "style",
                `min-width: ${pxSize}px`
            );
            mainDiv.appendChild(miniDiv);
        }
    }
    return 1;
}

function removeGrid() {
    for (i = 0; i < gridDimension; i++) {
        for (j = 0; j < gridDimension; j++) {
            let miniDiv = document.querySelector("#drawing-table div");
            mainDiv.removeChild(miniDiv);
        }
    }
    createGrid();
}

createGrid();

function randomColor() {
    return Math.floor(Math.random() * 255) + 1;
}

function coloring(e) {
    if(drawMode === 1) {
        const colorInput = document.getElementById("change-color");
        let opacity = e.target.style.opacity;
        e.target.style.backgroundColor = colorInput.value;
        if(opacity && opacity < 1) {
            e.target.style.opacity = `${Number(opacity) + 0.1}`;
        }
        else if(!opacity) {
            e.target.style.opacity = "0.1";
        }
    }
    else {
        e.target.style.opacity = "1";
        e.target.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`; 
    }
}

function erase(e) {
    let opacity = e.target.style.opacity;
    if(opacity > 0.1 && opacity !== 2 && drawMode === 1) {
        e.target.style.opacity = `${Number(opacity) - 0.1}`;
    }
    else {
        e.target.style.backgroundColor = "white";
        e.target.style.opacity = "2";
    }
}

mainDiv.addEventListener("mousedown", (e) => {
    if(draw === 1) {
        coloring(e);
        mainDiv.addEventListener("mouseover", coloring);
    }
    else {
        erase(e);
        mainDiv.addEventListener("mouseover", erase);
    }
});

mainDiv.addEventListener("mouseup", () => {
    if(draw === 1) {
        mainDiv.removeEventListener("mouseover", coloring);
    }
    else {
        mainDiv.removeEventListener("mouseover", erase);
    }
});

function changeToColors(eraser) {
    draw = 1;
    eraser.textContent = "Eraser";
    mainDiv.style.cursor = "pointer";
}

options.addEventListener("click", (e) => {
    const selectedOption = e.target;
    switch (selectedOption.id) {
        case "create":
            if(!verifySize(document.querySelector("#x-axes").value)) return;
            removeGrid(); 
            break;
        case "clear":
            removeGrid();
            break;
        case "eraser":
            if(draw === 1) {
                draw = 0;
                selectedOption.textContent = "Draw";
                mainDiv.style.cursor = "cell";
            }
            else {
                 changeToColors(selectedOption);
            }
            break;
        case "draw-mode":
            removeGrid();
            changeToColors(document.getElementById("eraser"));
            if(drawMode === 1) {
                drawMode = 0;
                selectedOption.textContent = "Choose Colors";
                delChangeColor.remove();
            }
            else {
                drawMode = 1;
                selectedOption.textContent = "Random Colors";
                document.getElementById("colors").appendChild(delChangeColor);
            }
    }
});

const dimensions = document.querySelector("#dimensions");
dimensions.addEventListener("change", (e) => {
    switch(e.target.id) {
        case "x-axes":
            document.querySelector("#y-axes").value = e.target.value;
            break;
        case "y-axes":
            document.querySelector("#x-axes").value = e.target.value;
            break;
    }
})