<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = "";
$dbname = "task_manager";

// Database connection
$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$action = $_GET['action'] ?? '';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
	//gets data from json file format and stores in varaible data
    $data = json_decode(file_get_contents("php://input"), true);
  // run sql query depending on what button user pressed 
    if ($action === "add" && isset($data['task'])) {
        $task = $conn->real_escape_string($data['task']);
        $conn->query("INSERT INTO tasks (task) VALUES ('$task')");
    } elseif ($action === "complete" && isset($data['id'])) {
        $id = (int) $data['id'];
        $conn->query("UPDATE tasks SET status='completed' WHERE id=$id");
    } elseif ($action === "delete" && isset($data['id'])) {
        $id = (int) $data['id'];
        $conn->query("DELETE FROM tasks WHERE id=$id");
    }
}

// Fetching all tasks
$result = $conn->query("SELECT * FROM tasks");
$tasks = [];
// fetches tasks through an associative array and puts them into the task array from befor
while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

echo json_encode($tasks);
//send the task array to javascript
$conn->close();
?>
