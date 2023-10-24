# My React App

This is a React app that allows you to get started with minimal setup. You can quickly set up and run the app on your local machine. 
The app includes 3 different news sources which taking data from those sources(New York Times API, News API, and The Guardian API). It has User authentication and registration,  article searching, personalized news feed and mobile-responsive design for the code.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)

## For the local environment

# 1. Clone this repository to your local machine:
   git clone https://github.com/ardaberkduzgun/news-app.git

# 2 Navigate to the project directory:
   cd your-react-app

# 3 Install the project dependencies:
   npm install

# To run the app on your local machine, follow these simple steps:

    # 4 Start the development server:
      npm start
       Open your web browser and navigate to http://localhost:3000 to access the app.

The app will automatically reload if you make changes to the source code. You can start building your React components and features.

## For Dockerizing

Make sure docker-compose is reaching the Dockerfile and after that write to the project path that code: 

docker-compose up

It'll download and create necessary modules and create image and dependent container for front-end of the news app.

1. way: You can run the docker image -run -d --name news-app-web -p 3000:3000:latest 

2. way: Or run the docker image from Docker Desktop.

You can see live application on localhost:3000