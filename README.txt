In order to run the code please follow the following steps

1. Install and confirgure WAMP server, make sure APACHE and MYSQL are running

2. Extract this zip file in the folder "C:\wamp64\www\"
The folder name should be: Task Manager Raaed Ilham

3. Create the database and tables

Open phpMyAdmin by entering the link below in your browser
http://localhost/phpmyadmin/

Click on Databases and create a new database name task_manager

Run the query below to create the table necessary

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending'
);


4. Go to the link below in your Microsoft edge browser and the app should be running
 http://localhost/todo_list/index.html
