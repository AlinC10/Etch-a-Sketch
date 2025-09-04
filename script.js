const mainDiv = document.querySelector("#drawing-table");
let width = mainDiv.offsetWidth;
const options = document.getElementById("options");
let gridDimension = 0;

function createGrid() {
    const xInput = document.querySelector("#x-axes");
    gridDimension = xInput.value;
    if(gridDimension > 100) {
        alert("The value introduced is too big. Use values between 2 and 100!!");
        return;
    }
    if(gridDimension < 2) {
        alert("The value introduced is too small. Use values between 2 and 100!!");
        return;
    }
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
    e.target.classList.add("draw");
}


mainDiv.addEventListener("mousedown", (e) => {
    coloring(e);
    mainDiv.addEventListener("mouseover", coloring);
});

mainDiv.addEventListener("mouseup", () => {
    mainDiv.removeEventListener("mouseover", coloring);
});

options.addEventListener("click", (e) => {
    const selectedOption = e.target.id;
    switch (selectedOption) {
        case "create":
            removeGrid(); 
            createGrid();
            break;
        case "clear":
            removeGrid();
            createGrid();
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