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
    const newRow = tasksList.insertRow(-1);

    newRow.setAttribute('data-date', taskData.date.trim());
    newRow.setAttribute('data-time', taskData.time.trim());

    let insertIndex = 0;
    for (let i = 0; i < tasksList.rows.length; i++) {
        const existingRow = tasksList.rows[i];
        const existingDate = existingRow.getAttribute('data-date');
        const existingTime = existingRow.getAttribute('data-time');

        if (existingDate === taskData.date.trim() && existingTime > taskData.time.trim()) {
            break;
        }

        if (existingDate > taskData.date.trim()) {
            break;
        }

        insertIndex++;
    }

    tasksList.insertBefore(newRow, tasksList.rows[insertIndex]);

    newRow.insertCell(0).innerHTML = taskData.text;
    newRow.insertCell(1).innerHTML = taskData.date.trim() === "" ? "No Due" : taskData.date;
    newRow.insertCell(2).innerHTML = taskData.time.trim() === "" ? "No Due" : taskData.time;

    const cell4 = newRow.insertCell(3);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        deleteTask(taskData._id);
        tasksList.deleteRow(newRow.rowIndex);
    };
    cell4.appendChild(deleteButton);
}
fetch('http://localhost:3000/api/lists') // Replace with your API endpoint
.then((response) => {
if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
}
return response.json();
})
.then((data) => {
    console.log(data);
// Data retrieved successfully, now update the UI with the data
data.forEach((taskData) => {
    updateUIWithTask(taskData);
});
})
.catch((error) => {
console.error('Error:', error);
});



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




  
  
  

  
  

  