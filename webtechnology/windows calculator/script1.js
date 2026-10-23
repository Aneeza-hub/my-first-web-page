let firstNumber = "";
let operator = "";
let newNumber = true;

let memory = 0;
let memorySaved = false;

const display = document.getElementById("display");

function showMessage() {
    const message = document.getElementById("message");

    message.style.display =
        message.style.display === "block" ? "none" : "block";
}

function pressNumber(number) {
    if (
        newNumber ||
        display.value === "Cannot divide by zero" ||
        display.value === "Invalid input"
    ) {
        display.value = number === "." ? "0." : number;
        newNumber = false;
        return;
    }

    if (number === "." && display.value.includes(".")) {
        return;
    }

    display.value += number;
}

function chooseOperator(op) {
    firstNumber = Number(display.value);
    operator = op;
    newNumber = true;
}

function calculate() {
    if (operator === "") {
        return;
    }

    const secondNumber = Number(display.value);
    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    } else if (operator === "-") {
        result = firstNumber - secondNumber;
    } else if (operator === "*") {
        result = firstNumber * secondNumber;
    } else if (operator === "/") {
        if (secondNumber === 0) {
            display.value = "Cannot divide by zero";
            operator = "";
            newNumber = true;
            return;
        }

        result = firstNumber / secondNumber;
    }

    display.value = Number(result.toPrecision(10)).toString();
    operator = "";
    newNumber = true;
}

function clearAll() {
    display.value = "0";
    firstNumber = "";
    operator = "";
    newNumber = true;
}

function clearEntry() {
    display.value = "0";
    newNumber = true;
}

function backspace() {
    if (newNumber) {
        return;
    }

    display.value = display.value.slice(0, -1);

    if (display.value === "" || display.value === "-") {
        display.value = "0";
        newNumber = true;
    }
}

function percentage() {
    display.value = String(Number(display.value) / 100);
    newNumber = true;
}

function square() {
    display.value = String(Number(display.value) ** 2);
    newNumber = true;
}

function squareRoot() {
    if (Number(display.value) < 0) {
        display.value = "Invalid input";
        newNumber = true;
        return;
    }

    display.value = String(Math.sqrt(Number(display.value)));
    newNumber = true;
}

function reciprocal() {
    if (Number(display.value) === 0) {
        display.value = "Cannot divide by zero";
        newNumber = true;
        return;
    }

    display.value = String(1 / Number(display.value));
    newNumber = true;
}

function changeSign() {
    display.value = String(Number(display.value) * -1);
}

function updateMemoryButtons() {
    document.getElementById("mc").disabled = !memorySaved;
    document.getElementById("mr").disabled = !memorySaved;
    document.getElementById("mv").disabled = !memorySaved;
}

function memorySave() {
    memory = Number(display.value);
    memorySaved = true;

    updateMemoryButtons();
    updateMemoryPanel();
}

function memoryRecall() {
    if (!memorySaved) {
        return;
    }

    display.value = String(memory);
    newNumber = true;
}

function memoryClear() {
    memory = 0;
    memorySaved = false;

    updateMemoryButtons();

    document.getElementById("memory-list").innerHTML = "";
    document.getElementById("memory-panel").style.display = "none";
}

function memoryAdd() {
    if (!memorySaved) {
        return;
    }

    memory += Number(display.value);
    updateMemoryPanel();
}

function memorySubtract() {
    if (!memorySaved) {
        return;
    }

    memory -= Number(display.value);
    updateMemoryPanel();
}

function updateMemoryPanel() {
    const list = document.getElementById("memory-list");
    list.innerHTML = "";

    if (!memorySaved) {
        return;
    }

    const item = document.createElement("div");
    item.className = "memory-item";
    item.textContent = memory;

    item.onclick = function () {
        display.value = String(memory);
        newNumber = true;

        document.getElementById("memory-panel").style.display = "none";
    };

    list.appendChild(item);
}

function memoryMore() {
    if (!memorySaved) {
        return;
    }

    const panel = document.getElementById("memory-panel");

    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        updateMemoryPanel();
        panel.style.display = "block";
    }
}

updateMemoryButtons();