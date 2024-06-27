var draggedElement = null;
var items;
let trueCounter = 0;
const shuffle = document.querySelector(".shuffle");

shuffle.onclick = refresh

function refresh(e) {
    location.reload();
}

function handleDragStart(e) {
    this.style.opacity = "0.3";
    draggedElement = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("item", this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) 
        e.preventDefault();

    e.dataTransfer.dropEffect = "move";
    return false;
}

function handleDragEnter(e) {
    this.classList.add("dragover");
}

function handleDragLeave(e) {
    this.classList.remove("dragover");
}

function handleDrop(e) {
    if (e.stopPropagation)
        e.stopPropagation();

    if (draggedElement != this) {
        draggedElement.innerHTML = this.innerHTML;
        // draggedElement.setAttribute("data-item", this.innerHTML);

        let replacedItem = e.dataTransfer.getData("item");
        this.innerHTML = replacedItem;
        // this.setAttribute("data-item", replacedItem);

        // Check if data-item matches innerHTML after dropping
        checkDataItemMatch(this);
        checkDataItemMatch(draggedElement);
    }

    return false;
}

function handleDragEnd(e) {
    this.style.opacity = "1";

    items.forEach(function(item) {
        item.classList.remove("dragover");
    });
}

function checkDataItemMatch(element) {
    if (element.getAttribute("data-item") === element.innerHTML) {
        console.log("Match found:", element);
        // Perform your desired action here
        element.setAttribute("draggable", false)
         // Use the CSS variable for the background color
        const rootStyles = getComputedStyle(document.documentElement);
        const rightColor = rootStyles.getPropertyValue("--right").trim();
        const borderColor = rootStyles.getPropertyValue("--white").trim();
        element.style.cursor = "default";
        element.style.transform = "scale(1.07)";
        element.style.borderColor = borderColor;
        element.style.backgroundColor = rightColor; // Example action

        // to count how many letters are matched
        trueCounter++
    }
    if (trueCounter === 11) {
        document.querySelector("i").style.visibility = "visible";
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("DOMContentLoaded", event => {
    items = document.querySelectorAll(".core .item");

    let counter = 0;
    const letters = "SEMANGATUKK".split('');
    // Generate a randomized sequence of letters
    const shuffledLetters = shuffleArray(letters);

    items.forEach((item, index) => {
        item.innerHTML = shuffledLetters[index];
        
        item.addEventListener("dragstart", handleDragStart);
        item.addEventListener("dragenter", handleDragEnter);
        item.addEventListener("dragover", handleDragOver);
        item.addEventListener("dragleave", handleDragLeave);
        item.addEventListener("drop", handleDrop);
        item.addEventListener("dragend", handleDragEnd);

        // Check if data-item matches innerHTML on page load and increment counter if true
        checkDataItemMatch(item);
    });
});