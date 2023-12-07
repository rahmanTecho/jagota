# Jagota Sales Dashboard

## Introduction

Jagota Sales Dashboard is a web application designed for visualizing sales data. It allows users to filter data by year and view detailed sales metrics.

### Public Access URL

Access the application here: [Jagota Sales Dashboard](http://jagota-sales-env.eba-vetm3ihj.us-east-1.elasticbeanstalk.com/)

## How to Use the Application

### Running with Docker Compose

Ensure you have Docker and Docker Compose installed on your machine. Then follow these steps:

1. **Start the Application:**

docker-compose up

This command will build and start the containers. Once running, the application is accessible at `http://localhost`.

2. **Stop the Application:**

docker-compose down

This will stop and remove all running containers and networks.

### Navigating the Dashboard

- Access the dashboard to view the sales data.
- Use the filter component to select a specific year range and view relevant sales data.

## Technology Stack

- **Frontend**: Developed with React.
- **Backend**: Built using Node.js and express
- **DevOps Tools**: Docker, Docker Compose, Nginx for reverse proxy, and AWS Elastic Beanstalk.
