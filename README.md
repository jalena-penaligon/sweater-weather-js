# Project: Sweater Weather Express

Welcome to Sweater Weather Express, an API designed to expose endpoints to display weather for different cities, create and login users, and to create and display favorited cities.

## Intent

This project was completed in 7 days as a requirement for Module 4.

The project was built using Express which implements the following:

* Object oriented programming principles
* Database management with Sequelize
* External API calls to Google Geocoding and DarkSky
* Github Projects: https://github.com/jalena-penaligon/sweater-weather-js/projects/1

## Tech Stack

* Express 4.16.1
* Sequelize - PostgreSQL.
* JavaScript

## Instructions
  ### How to setup:
      git clone git@github.com:jalena-penaligon/sweater-weather-js.git
      cd sweater-weather-js
      npm install.
      npm start

  ### Available Endpoints:
  #### POST /api/v1/users
      Headers:
        Content-Type: application/json
        Accept: application/json

      Body:
        {
          "email": "my_email@example.com",
          "password": "password"
          "password_confirmation": "password"
        }

  #### POST /api/v1/sessions
      Headers:
        Content-Type: application/json
        Accept: application/json

      Body:
        {
          "email": "my_email@example.com",
          "password": "password"
        }

  #### GET /api/v1/forecast?location=denver,co
      Headers:
        Content-Type: application/json
        Accept: application/json

      Body:
        {
          "api_key": "jgn983hy48thw9begh98h4539h4",
        }
        * substitute a valid api_key after posting to /users

  #### POST /api/v1/favorites
      Headers:
        Content-Type: application/json
        Accept: application/json

      Body:
        {
          "location": "Denver, CO",
          "api_key": "jgn983hy48thw9begh98h4539h4"
        }
        * substitute a valid api_key after posting to /users

  #### GET /api/v1/favorites
      Headers:
        Content-Type: application/json
        Accept: application/json

      Body:
        {
          "api_key": "jgn983hy48thw9begh98h4539h4"
        }
        * substitute a valid api_key after posting to /users

  #### DELETE /api/v1/favorites
      Headers:
        Content-Type: application/json
        Accept: application/json

      Body:
        {
          "location": "Denver, CO",
          "api_key": "jgn983hy48thw9begh98h4539h4"
        }
        * substitute a valid api_key after posting to /users

  ### Running Tests:
  - Tests for this API were built in Jest. Follow the steps below to setup with Jest.
        npm install jest -g
        npm install babel-jest supertest shelljs -D
        npm test

  ## Core Contributors:
  Jalena Taylor: https://github.com/jalena-penaligon/

  ## How to Contribute:
  - Fork & clone this repository. Make the desired changes and open a pull request, tagging @jalena-penaligon
