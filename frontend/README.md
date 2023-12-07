Jagota Sales Dashboard
Introduction
Jagota Sales Dashboard is a web application designed to visualize sales data. It allows users to filter data by year and view detailed sales metrics.

Public Access URL
The application is hosted and can be accessed at: http://jagota-sales-env.eba-vetm3ihj.us-east-1.elasticbeanstalk.com/

How to Use the App
Running with Docker Compose
You can run the application locally using Docker Compose. This requires having Docker and Docker Compose installed on your machine.

Starting the Application:

sh
Copy code
docker-compose up
This command builds and starts the containers defined in your docker-compose.yml. Once the containers are up and running, you can access the application at http://localhost.

Stopping the Application:

sh
Copy code
docker-compose down
This command stops and removes the containers, networks, volumes, and images created by docker-compose up.

Navigating the Application
Dashboard: Access the dashboard to view and interact with the sales data.
Filtering Data: Use the filter options to select the year range for the sales data you wish to view.
Technology Stack
Frontend: The frontend is built with React, offering a dynamic and responsive user interface.
Backend: The backend is powered by Node.js, providing efficient data handling and API services.
DevOps:
Docker & Docker Compose: Used for containerizing the application and managing multi-container Docker applications.
Nginx: Serves as a reverse proxy, routing requests to the appropriate backend and frontend services.
AWS Elastic Beanstalk: Used for deploying the application and managing the cloud infrastructure.
