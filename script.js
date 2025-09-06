const mainDiv = document.querySelector("#drawing-table");
let width = mainDiv.offsetWidth;
const buttons = document.getElementById("options");
let gridDimension = 16;
let draw = 1;

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
}

createGrid();

function coloring(e) {
    let opacity = e.target.style.opacity;
    if(opacity && opacity < 1) {
        e.target.style.opacity = `${Number(opacity) + 0.1}`;
    }
    else if(!opacity) {
        e.target.style.backgroundColor = "black";
        e.target.style.opacity = "0.1";
    }
}

function erase(e) {
    e.target.style.backgroundColor = "white";
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

options.addEventListener("click", (e) => {
    const selectedOption = e.target;
    switch (selectedOption.id) {
        case "create":
            if(!verifySize(document.querySelector("#x-axes").value)) return;
            removeGrid(); 
            createGrid();
            break;
        case "clear":
            removeGrid();
            createGrid();
            break;
        case "eraser":
            if(draw === 1) {
                draw = 0;
                selectedOption.textContent = "Draw";
                mainDiv.style.cursor = "cell";
            }
            else {
                 draw = 1;
                 selectedOption.textContent = "Eraser";
                 mainDiv.style.cursor = "pointer";
            }
            break;
    }
});


window.addEventListener("resize", () => {
    width = mainDiv.offsetWidth;
    const pxSize = Number(width) / gridDimension;
    removeGrid();
    createGrid();
})

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
