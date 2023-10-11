// Update the addTask function in your script.js file
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const taskTime = document.getElementById("taskTime");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task description.");
        return;
    }

    // Create an object with the task data
    const taskData = {
        text: taskInput.value,
        date: taskDate.value,
        time: taskTime.value,
    };

    // Send the task data to the backend using the Fetch API
    fetch('http://localhost:3000/api/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        // Handle the response from the server if needed
        console.log('Data added successfully:', data);

        // Now, you can update the UI with the new task data and set the data-task-id attribute
        updateUIWithTask(data); // Pass the task data from the server

        // Clear the input fields
        taskInput.value = "";
        taskDate.value = "";
        taskTime.value = "";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
function updateUIWithTask(taskData) {
    const tasksList = document.getElementById("myTable").getElementsByTagName('tbody')[0];

    // Create a new row for the task
    const newRow = tasksList.insertRow(-1);

    // Set the date and time values as separate attributes for sorting
    newRow.setAttribute('data-date', taskData.date.trim());
    newRow.setAttribute('data-time', taskData.time.trim());

    // Iterate over existing rows to find the correct position to insert the new task
    let insertIndex = 0;
    for (let i = 0; i < tasksList.rows.length; i++) {
        const existingRow = tasksList.rows[i];
        const existingDate = existingRow.getAttribute('data-date');
        const existingTime = existingRow.getAttribute('data-time');

        // Compare the current task's date and time with the existing task's date and time
        if (existingDate === taskData.date.trim() && existingTime > taskData.time.trim()) {
            break;
        }

        if (existingDate > taskData.date.trim()) {
            break;
        }

        insertIndex++;
    }

    // Insert the new row at the determined index
    tasksList.insertBefore(newRow, tasksList.rows[insertIndex]);

    // Populate the cells with task data
    newRow.insertCell(0).innerHTML = taskData.text;
    newRow.insertCell(1).innerHTML = taskData.date.trim() === "" ? "No Due" : taskData.date;
    newRow.insertCell(2).innerHTML = taskData.time.trim() === "" ? "No Due" : taskData.time;

    // Create a delete button and set an onclick event to trigger the deletion
    const cell4 = newRow.insertCell(3);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        deleteTask(taskData._id); // Pass the task ID for deletion
        tasksList.deleteRow(newRow.rowIndex); // Remove the row from the UI
    };
    cell4.appendChild(deleteButton);
}

// Update the updateUIWithTask function to add delete buttons

// function updateUIWithTask(taskData) {
//     const tasksList = document.getElementById("myTable").getElementsByTagName('tbody')[0];

//     // Create a new row for the task
//     const newRow = tasksList.insertRow(-1);

//     // Set the date and time values as a single string for sorting
//     const dateTimeValue = taskData.date.trim() + ' ' + taskData.time.trim();

//     // Iterate over existing rows to find the correct position to insert the new task
//     let insertIndex = 0;
//     for (let i = 0; i < tasksList.rows.length; i++) {
//         const existingRow = tasksList.rows[i];
//         const existingDateTimeValue = existingRow.cells[1].innerHTML.trim() + ' ' + existingRow.cells[2].innerHTML.trim();
        
//         // Compare the current task's datetime with the existing task's datetime
//         if (dateTimeValue < existingDateTimeValue) {
//             break;
//         }
        
//         insertIndex++;
//     }

//     // Insert the new row at the determined index
//     tasksList.insertBefore(newRow, tasksList.rows[insertIndex]);

//     // Populate the cells with task data
//     newRow.insertCell(0).innerHTML = taskData.text;
//     newRow.insertCell(1).innerHTML = taskData.date.trim() === "" ? "No Due" : taskData.date;
//     newRow.insertCell(2).innerHTML = taskData.time.trim() === "" ? "No Due" : taskData.time;

//     // Create a delete button and set an onclick event to trigger the deletion
//     const cell4 = newRow.insertCell(3);
//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.onclick = function() {
//         deleteTask(taskData._id); // Pass the task ID for deletion
//         tasksList.deleteRow(newRow.rowIndex); // Remove the row from the UI
//     };
//     cell4.appendChild(deleteButton);

//     // Move the new row to the bottom of the table
//     tasksList.appendChild(newRow);
// }





// // Update the deleteTask function to send a DELETE request to the backend
function deleteTask(taskId) {
    fetch(`http://localhost:3000/api/lists/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            // Task successfully deleted on the backend
            console.log('Task deleted on the backend.');
        } else {
            // Handle errors if the task couldn't be deleted
            console.error('Failed to delete task on the backend.');
        }
    })
    .catch(error => {
        console.error('An error occurred while deleting the task:', error);
    });
}


// Fetch all tasks from the backend when the page loads
