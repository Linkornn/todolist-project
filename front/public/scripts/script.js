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
        updateUIWithTask(taskData, data.taskId); // Pass the task ID from the server

        // Clear the input fields
        taskInput.value = "";
        taskDate.value = "";
        taskTime.value = "";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateUIWithTask(taskData, taskId) {
    // You can create a new table row and append it to the tasks list
    const tasksList = document.getElementById("myTable").getElementsByTagName('tbody')[0];
    const newRow = tasksList.insertRow(0);
    
    // Set the data-task-id attribute
    newRow.setAttribute("data-task-id", taskId);
    
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.innerHTML = taskData.text;
    cell2.innerHTML = taskData.date.trim() === "" ? "No Due" : taskData.date;
    cell3.innerHTML = taskData.time.trim() === "" ? "No Due" : taskData.time;
    cell4.innerHTML = '<button onclick="deleteTask(this)">Delete</button>';
}
function deleteTask(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").deleteRow(i);

  }
