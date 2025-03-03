let tableBody = document.getElementById("table-body");

const ACCESSKEY = localStorage.getItem("access");

// Prüfen, ob Access Key vorhanden ist
if (!ACCESSKEY) {
  window.location.href = "../index.html";
}

function clearTable() {
    let tableHeader = document.getElementById("table-header");
    let tableBody = document.getElementById("table-body");

    // Tabellenkopf leeren
    if (tableHeader) {
        tableHeader.innerHTML = "";
    }
    
    // Tabelleninhalt leeren
    if (tableBody) {
        tableBody.innerHTML = "";
    }

    // Entfernen aller möglichen Hinzufügen-Buttons
    let addButtons = ["add-horse-btn", "add-employee-btn", "add-food-btn"];
    addButtons.forEach(buttonId => {
        let btn = document.getElementById(buttonId);
        if (btn) {
            btn.remove();
        }
    });
}

function loadHorse() {
    clearTable(); // Tabelle und Header leeren
    // Überprüfen, ob der "Hinzufügen"-Button bereits existiert, um Duplikate zu vermeiden
    if (!document.getElementById("add-horse-btn")) {
        let addButton = document.createElement("button");
        addButton.id = "add-horse-btn";
        addButton.textContent = "Hinzufügen";
        addButton.className = "add-btn";
        addButton.onclick = function() {
            // Hier kannst du eine Funktion aufrufen, um ein Formular zum Hinzufügen anzuzeigen
            openModal("horse", null, {});
        };

        // Button über der Tabelle hinzufügen
        let tableContainer = document.getElementById("table-container");
        tableContainer.insertBefore(addButton, tableContainer.firstChild);
    }

    fetch("http://127.0.0.1:8000/api/horse/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
            // Dynamische Erstellung des Tabellenkopfes
            let headerRow = document.createElement("tr");
            Object.keys(data[0]).forEach((key) => {
                let th = document.createElement("th");
                th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                headerRow.appendChild(th);
            });

             // Zusätzliche Spalte für Aktionen (Bearbeiten und Löschen)
             let actionTh = document.createElement("th");
             actionTh.textContent = "Aktionen"; // Statt des Buttons einfach "Aktionen" als Spaltenüberschrift
             headerRow.appendChild(actionTh);
 
             document.getElementById("table-header").appendChild(headerRow);

            // Erstellung der Tabellenzeilen für die Daten
            let fragment = document.createDocumentFragment();
            data.forEach((horse) => {
                let tableRow = document.createElement("tr");

                // Dynamisch die Werte aus den Objekten einfügen
                Object.values(horse).forEach((value) => {
                    let td = document.createElement("td");
                    td.textContent = value;
                    tableRow.appendChild(td);
                });

                // Spalte für Aktionen (Bearbeiten und Löschen)
                let actionTd = document.createElement("td");
                actionTd.innerHTML = `
                    <button class="edit-btn" onclick="editHorse(${horse.id})">Bearbeiten</button>
                    <button class="delete-btn" onclick="deleteHorse(${horse.id})">Löschen</button>
                `;
                tableRow.appendChild(actionTd);

                fragment.appendChild(tableRow);
            });
            tableBody.appendChild(fragment);
        }
    })
    .catch((error) => {
        console.error("Fetch error:", error);
        alert("Fehler beim Laden der Horse-Daten. Bitte versuchen Sie es später erneut.");
    });
}


function loadEmployee() {
    clearTable();

    // Überprüfen, ob der "Hinzufügen"-Button bereits existiert, um Duplikate zu vermeiden
    if (!document.getElementById("add-employee-btn")) {
        let addButton = document.createElement("button");
        addButton.id = "add-employee-btn";
        addButton.textContent = "Hinzufügen";
        addButton.className = "add-btn";
        addButton.onclick = function() {
            // Hier kannst du eine Funktion aufrufen, um ein Formular zum Hinzufügen anzuzeigen
            openModal("employee", null, {});
        };

        // Button über der Tabelle hinzufügen
        let tableContainer = document.getElementById("table-container");
        tableContainer.insertBefore(addButton, tableContainer.firstChild);
    }

    fetch("http://127.0.0.1:8000/api/employee/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
            let headerRow = document.createElement("tr");
            Object.keys(data[0]).forEach((key) => {
                let th = document.createElement("th");
                th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                headerRow.appendChild(th);
            });

            // Zusätzliche Spalte für Aktionen (Bearbeiten und Löschen)
            let actionTh = document.createElement("th");
            actionTh.textContent = "Aktionen"; 
            headerRow.appendChild(actionTh);

            document.getElementById("table-header").appendChild(headerRow);
            let fragment = document.createDocumentFragment();
            data.forEach((employee) => {
                let tableRow = document.createElement("tr");

                Object.values(employee).forEach((value) => {
                    let td = document.createElement("td");
                    td.textContent = value;
                    tableRow.appendChild(td);
                });

                let actionTd = document.createElement("td");
                actionTd.innerHTML = `
                    <button class="edit-btn" onclick="editEmployee(${employee.id})">Bearbeiten</button>
                    <button class="delete-btn" onclick="deleteEmployee(${employee.id})">Löschen</button>
                `;
                tableRow.appendChild(actionTd);

                fragment.appendChild(tableRow);
            });
            tableBody.appendChild(fragment);
        }
    })
    .catch((error) => {
        console.error("Fetch error:", error);
        alert("Fehler beim Laden der Employee-Daten. Bitte versuchen Sie es später erneut.");
    });
}


function loadFood() {
    clearTable(); // Tabelle und Header leeren

        // Überprüfen, ob der "Hinzufügen"-Button bereits existiert, um Duplikate zu vermeiden
        if (!document.getElementById("add-food-btn")) {
            let addButton = document.createElement("button");
            addButton.id = "add-food-btn";
            addButton.textContent = "Hinzufügen";
            addButton.className = "add-btn";
            addButton.onclick = function() {
                // Hier kannst du eine Funktion aufrufen, um ein Formular zum Hinzufügen anzuzeigen
                openModal("food", null, {});
            };
    
            // Button über der Tabelle hinzufügen
            let tableContainer = document.getElementById("table-container");
            tableContainer.insertBefore(addButton, tableContainer.firstChild);
        }

    fetch("http://127.0.0.1:8000/api/food/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
            // Dynamische Erstellung des Tabellenkopfes
            let headerRow = document.createElement("tr");
            Object.keys(data[0]).forEach((key) => {
                let th = document.createElement("th");
                th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                headerRow.appendChild(th);
            });

          // Zusätzliche Spalte für Aktionen (Bearbeiten und Löschen)
          let actionTh = document.createElement("th");
          actionTh.textContent = "Aktionen"; // Statt des Buttons einfach "Aktionen" als Spaltenüberschrift
          headerRow.appendChild(actionTh);

          document.getElementById("table-header").appendChild(headerRow);
            // Erstellung der Tabellenzeilen für die Daten
            let fragment = document.createDocumentFragment();
            data.forEach((food) => {
                let tableRow = document.createElement("tr");

                // Dynamisch die Werte aus den Objekten einfügen
                Object.values(food).forEach((value) => {
                    let td = document.createElement("td");
                    td.textContent = value;
                    tableRow.appendChild(td);
                });

                // Spalte für Aktionen (Bearbeiten und Löschen)
                let actionTd = document.createElement("td");
                actionTd.innerHTML = `
                    <button class="edit-btn" onclick="editFood(${food.id})">Bearbeiten</button>
                    <button class="delete-btn" onclick="deleteFood(${food.id})">Löschen</button>
                `;
                tableRow.appendChild(actionTd);

                fragment.appendChild(tableRow);
            });
            tableBody.appendChild(fragment);
        }
    })
    .catch((error) => {
        console.error("Fetch error:", error);
        alert("Fehler beim Laden der Food-Daten. Bitte versuchen Sie es später erneut.");
    });
}


function deleteEmployee(id) {
    if (confirm("Möchten Sie diesen Employee wirklich löschen?")) {
        fetch(`http://127.0.0.1:8000/api/employee/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${ACCESSKEY}`,
            },
        })
        .then(response => {
            if (response.ok) {
                alert("Employee wurde erfolgreich gelöscht.");
                loadEmployee(); // Liste neu laden
            } else {
                alert("Fehler beim Löschen. Bitte versuchen Sie es erneut.");
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("Fehler beim Löschen der Daten.");
        });
    }
}



function deleteHorse(id) {
    if (confirm("Möchten Sie dieses Pferd wirklich löschen?")) {
        fetch(`http://127.0.0.1:8000/api/horse/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${ACCESSKEY}`,
            },
        })
        .then(response => {
            if (response.ok) {
                alert("Pferd wurde erfolgreich gelöscht.");
                loadHorse(); // Liste neu laden
            } else {
                alert("Fehler beim Löschen. Bitte versuchen Sie es erneut.");
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("Fehler beim Löschen der Daten.");
        });
    }
}

function deleteFood(id) {
    if (confirm("Möchten Sie dieses Futter wirklich löschen?")) {
        fetch(`http://127.0.0.1:8000/api/food/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${ACCESSKEY}`,
            },
        })
        .then(response => {
            if (response.ok) {
                alert("Futter wurde erfolgreich gelöscht.");
                loadFood(); // Liste neu laden
            } else {
                alert("Fehler beim Löschen. Bitte versuchen Sie es erneut.");
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            alert("Fehler beim Löschen der Daten.");
        });
    }
}

function openModal(entity, id, data) {
    let formContainer = document.getElementById("editForm");
    let closeButton = document.createElement("button");
    closeButton.textContent = "Schließen";
    closeButton.className = "close-btn";
    closeButton.onclick = closeModal;
    formContainer.appendChild(closeButton);
    if (!formContainer) {
        console.error("editForm wurde nicht gefunden.");
        return;
    }

    formContainer.innerHTML = `
        <input type="hidden" id="editId" value="${id || ''}">
    `;
    
    // Daten initialisieren, wenn leer (z.B. für Hinzufügen)
    if (Object.keys(data).length === 0) {
        let headerCells = document.querySelectorAll("#table-header th");
        data = {};
        headerCells.forEach(cell => {
            let key = cell.textContent.toLowerCase().replace(/ /g, '_');
            if (key !== "aktionen") {
                data[key] = "";
            }
        });
    }

    Object.entries(data).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && key !== 'aktionen') {
            let labelText = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');

            let label = document.createElement("label");
            label.setAttribute("for", key);
            label.textContent = labelText + ":";

            // Dropdown für "sex"
            if (key === "sex") {
                let select = document.createElement("select");
                select.setAttribute("id", key);
                select.setAttribute("name", key);
                select.required = true;

                let options = [
                    { value: "", text: "Bitte wählen" },
                    { value: "male", text: "Male" },
                    { value: "female", text: "Female" }
                ];

                options.forEach(optionData => {
                    let option = document.createElement("option");
                    option.value = optionData.value;
                    option.textContent = optionData.text;

                    if (value === optionData.value) {
                        option.selected = true;
                    }

                    select.appendChild(option);
                });

                formContainer.appendChild(label);
                formContainer.appendChild(select);
            }
            // Dropdown für "location"
            else if (key === "location") {
                let select = document.createElement("select");
                select.setAttribute("id", key);
                select.setAttribute("name", key);
                select.required = true;

                let options = [
                    { value: "", text: "Bitte wählen" },
                    { value: "stable", text: "Stable" },
                    { value: "slaughterhouse", text: "Slaughterhouse" }
                ];

                options.forEach(optionData => {
                    let option = document.createElement("option");
                    option.value = optionData.value;
                    option.textContent = optionData.text;

                    if (value === optionData.value) {
                        option.selected = true;
                    }

                    select.appendChild(option);
                });

                formContainer.appendChild(label);
                formContainer.appendChild(select);
            }
            // Alle anderen Felder als normale Input-Felder
            else {
                // Automatische Erkennung des Input-Typs anhand des Feldnamens
                let inputType = "text"; // Standardtyp

                if (key.includes("date")) {
                    inputType = "text"; // Flatpickr benötigt text statt date
                } else if (key.includes("email")) {
                    inputType = "email";
                } else if (key.includes("number") || key.includes("price") || key.includes("amount")) {
                    inputType = "number";
                } else if (key.includes("password")) {
                    inputType = "password";
                }

                let input = document.createElement("input");
                input.setAttribute("type", inputType);
                input.setAttribute("id", key);
                input.setAttribute("name", key);
                input.value = value;
                input.required = true;

                formContainer.appendChild(label);
                formContainer.appendChild(input);

                // Flatpickr für Date-Felder initialisieren
                if (key.includes("date")) {
                    setTimeout(() => {
                        flatpickr(`#${key}`, {
                            dateFormat: "Y-m-d",
                            allowInput: true
                        });
                    }, 0);
                }
            }
        }
    });

    // Speichern-Button hinzufügen
    let saveButton = document.createElement("button");
    saveButton.setAttribute("type", "submit");
    saveButton.textContent = "Speichern";
    formContainer.appendChild(saveButton);

    document.getElementById("editModal").style.display = "block";

    document.getElementById("editForm").onsubmit = function(event) {
        event.preventDefault();
        if (id) {
            saveChanges(entity, id); 
        } else {
            createNewEntry(entity); 
        }
    };
}



function editFood(id) {
    fetch(`http://127.0.0.1:8000/api/food/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                alert("Eintrag nicht gefunden. Vielleicht wurde er bereits gelöscht.");
            } else {
                alert("Fehler beim Laden der Food-Daten.");
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        openModal("food", id, data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}

function editHorse(id) {
    fetch(`http://127.0.0.1:8000/api/horse/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                alert("Eintrag nicht gefunden. Vielleicht wurde er bereits gelöscht.");
            } else {
                alert("Fehler beim Laden der Horse-Daten.");
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        openModal("horse", id, data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}

function editEmployee(id) {
    fetch(`http://127.0.0.1:8000/api/employee/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                alert("Eintrag nicht gefunden. Vielleicht wurde er bereits gelöscht.");
            } else {
                alert("Fehler beim Laden der Employee-Daten.");
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        openModal("employee", id, data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}


function saveChanges(entity, id) {
    // Alle Input-Felder im Modal sammeln
    let inputs = document.querySelectorAll("#editForm input[type='text']");
    let updatedData = {};

    // Alle Felder und ihre Werte dem Objekt hinzufügen
    inputs.forEach(input => {
        updatedData[input.id] = input.value;
    });

    fetch(`http://127.0.0.1:8000/api/${entity}/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (response.ok) {
            alert("Eintrag wurde erfolgreich aktualisiert.");
            closeModal();
            // Tabelle aktualisieren
            if (entity === "horse") {
                loadHorse();
            } else if (entity === "food") {
                loadFood();
            } else if (entity === "employee") {
                loadEmployee();
            }
        } else {
            alert("Fehler beim Aktualisieren. Bitte versuchen Sie es erneut.");
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("Fehler beim Aktualisieren der Daten.");
    });
}


function createNewEntry(entity) {
    let inputs = document.querySelectorAll("#editForm input[type='text']");
    let newData = {};

    inputs.forEach(input => {
        newData[input.id] = input.value;
    });

    fetch(`http://127.0.0.1:8000/api/${entity}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${ACCESSKEY}`,
        },
        body: JSON.stringify(newData)
    })
    .then(response => {
        if (response.ok) {
            alert("Eintrag wurde erfolgreich hinzugefügt.");
            closeModal();
            if (entity === "horse") {
                loadHorse();
            } else if (entity === "food") {
                loadFood();
            } else if (entity === "employee") {
                loadEmployee();
            }
        } else {
            alert("Fehler beim Hinzufügen. Bitte versuchen Sie es erneut.");
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("Fehler beim Speichern der Daten.");
    });
}
function closeModal() {
    document.getElementById("editModal").style.display = "none";
    document.getElementById("editForm").innerHTML = "";
}