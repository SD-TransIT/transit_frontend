# TransIt frontend

This is frontend side of TransIt project. Backend service can be found [here](https://github.com/SD-TransIT/transit_backend/tree/develop).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and ejected.

## Prerequisites

Node.js (Version 18.7.0)
Npm (Version 8.15.0)

## Application configuration for development

To configure the application, navigate to project directory and run the following commands:

npm config set engine-strict true
npm install

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. To run in the non interactive mode run: `npm test -- --watchAll=false`

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Docker

Application can be deployed in docker container by running
```shell
docker-compose up
```

## Superset configuration
In order to have working integration with Superset TransIT dashboard you have to follow those steps:
- Superset UI - Go to Dashboards -> select ```TransIT Dasbboard``` -> select ```...``` -> select ```Embed Dashboard`` 
- Superset UI - allow Embedding dashboard. Copy this uuid to use this in next steps
- frontend app - create env variable ```SUPERSET_HOST``` in order to access Superset app
- frontend app - create env variable ```SUPERSET_EMBEDDED_ID``` in order to access embedded dashboard id
