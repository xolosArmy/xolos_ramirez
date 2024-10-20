<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "xolosramirezblog";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Query to get the posts
$sql = "SELECT title, content, author, date FROM posts ORDER BY date DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Output each post
  while($row = $result->fetch_assoc()) {
    echo "<h2>" . $row["title"] . "</h2>";
    echo "<p>" . $row["content"] . "</p>";
    echo "<small>Posted by " . $row["author"] . " on " . $row["date"] . "</small><hr>";
  }
} else {
  echo "No posts available.";
}
$conn->close();
?>
