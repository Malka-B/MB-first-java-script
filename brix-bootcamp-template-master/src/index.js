'use strict'

let tableRow, tableCol;
let row = 0;

const helloTitle = document.createElement('h1');
helloTitle.innerText = 'Hello Epidemiological Report';
document.body.appendChild(helloTitle);

const patientId = document.createElement('h2');
patientId.innerText = 'Report Your Path';
document.body.appendChild(patientId);

const bodyTableRows = document.createElement('tbody');
bodyTableRows.id = 'bodyTableRows';


const patientIdInput = document.createElement('input');
patientIdInput.setAttribute("type", "text");
patientIdInput.placeholder = 'Patient ID';
patientIdInput.id = 'PatientID';
patientIdInput.classList.add("locationInput");
patientIdInput.maxLength = 9;
patientIdInput.addEventListener("keyup", function () {    
    if (patientIdInput.value.length === 9) {
        let patientTable = [];        
        let c = true;
        if (c) {
            clearTable();
            c = false;
        }
        for (var i in localStorage) {
            console.log(i);
            console.log(localStorage[i]);
            if (isNaN(parseInt(i[0])) === false) {
                let key = JSON.parse("[" + i + "]");
                if (key[1] == patientIdInput.value) { 
                    addTable(JSON.parse(localStorage[i]), 1);
                }
            }
        }
    }
});
document.body.appendChild(patientIdInput);
const tableDiv = document.createElement('div');
const locationsTable = document.createElement('table');
const bodyTable = document.createElement('tbody');

const colValues = ['Start date', 'End date', 'city', 'location', 'remove'];
tableRow = document.createElement('tr');
tableRow.classList.add("tableRow");
tableRow.id = row;
for (let k = 0; k < 5; k++) {
    tableCol = document.createElement('th');
    tableCol.innerText = colValues[k];
    tableCol.classList.add("tableCol");
    tableCol.id = k + ',' + row;
    tableRow.appendChild(tableCol);
}
bodyTable.appendChild(tableRow);
row++;

function removeRow(rowNumber, id) {
    let rowToDelete = document.getElementById(rowNumber);
    rowToDelete.remove();
    localStorage.removeItem([rowNumber, id]);

}

function clearTable() {
    if (document.getElementById('bodyTableRows') != null) {
        document.getElementById('bodyTableRows').innerHTML = "";
    }
}

function addTable(patient, numberOfRows) {
    let current;

    for (let index = 0; index < numberOfRows; index++) {
        if (numberOfRows === 1) {
            current = patient;
        }
        else {
            current = patient[index];
        }
        const reportValues = [current.startDate, current.endDate, current.city, current.location, 'x'];
        tableRow = document.createElement('tr');
        tableRow.classList.add("tableRow");
        tableRow.id = row;
        for (let k = 0; k < 5; k++) {
            const currentRow = row;
            tableCol = document.createElement('td');
            tableCol.innerText = reportValues[k];
            tableCol.id = k + ',' + currentRow;
            tableCol.classList.add("tableCol");
            if (k === 4) {
                tableCol = document.createElement('button');
                tableCol.innerText = 'x';
                tableCol.addEventListener("click", function () {
                    removeRow(currentRow, current.id);
                });
            }
            tableRow.appendChild(tableCol);
        }
        bodyTableRows.appendChild(tableRow);
        row++;
    }
    locationsTable.appendChild(bodyTableRows);
}

locationsTable.appendChild(bodyTable);
tableDiv.appendChild(locationsTable);
document.body.appendChild(tableDiv);

const startDateInput = document.createElement('input');
startDateInput.setAttribute("type", "date");
startDateInput.placeholder = 'Start date';
startDateInput.id = 'startDateInput';
startDateInput.classList.add("locationInput");
document.body.appendChild(startDateInput);

const endDateInput = document.createElement('input');
endDateInput.setAttribute("type", "date");
endDateInput.placeholder = 'End date';
endDateInput.id = 'endDateInput';
startDateInput.classList.add("locationInput");
document.body.appendChild(endDateInput);

const cityInput = document.createElement('input');
cityInput.setAttribute("type", "text");
cityInput.placeholder = 'City';
cityInput.id = 'cityInput';
cityInput.classList.add("locationInput");
document.body.appendChild(cityInput);

const locationInput = document.createElement('input');
locationInput.setAttribute("type", "taxt");
locationInput.placeholder = 'location';
locationInput.id = 'locationInput';
locationInput.classList.add("locationInput");
document.body.appendChild(locationInput);

const addLocationBtn = document.createElement('button');
addLocationBtn.innerText = 'Add location';
addLocationBtn.style.margin = "10px";
document.body.appendChild(addLocationBtn);
addLocationBtn.addEventListener("click", function () {    
    let report = {
        rowId: row,
        id: document.getElementById('PatientID').value,
        startDate: document.getElementById('startDateInput').value,
        endDate: document.getElementById('endDateInput').value,
        city: document.getElementById('cityInput').value,
        location: document.getElementById('locationInput').value
    };

    
    document.getElementById('startDateInput').value = "";
    document.getElementById('endDateInput').value = "";
    document.getElementById('cityInput').value = "";
    document.getElementById('locationInput').value = "";
    localStorage.setItem([row, document.getElementById('PatientID').value], JSON.stringify(report));
    addTable(report, 1);
    
});



