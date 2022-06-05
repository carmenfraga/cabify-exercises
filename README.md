# Project Title: messageapp

This project consists of a basic messaging system.

There are two services, an external service (localhost) that runs in the port 9001 and messageapp running in port 3000.

MongoDB connected with Docker is another server, used to collect all the data, in port 27017.

The client/user can make two different requests, through the methods POST and GET.


# Instructions

1. Install dependencies: `$ npm install`
2. Run server: `$ docker-compose up`


# Endpoints table

| Method | URL | Description |
|-------------|-------------|-------------|
| POST | /messages | Send a message & Save a message in mongodb |
| GET | /messages | Get all the messages from mongodb |


# Official Contract

## Possible success and error responses it can return

Message successfully recorded `200 OK`

Fields must not be empty `422 Unprocessable Entity`

Both keys, destination and body are required `400 Bad Request`

Fields must be filled with text `406 Not Acceptable`

Message recorded as sent, but not confirmed `504 Gateway Timeout`

The message was not sent `500 Internal Server Error`


## Command line tests ran with Postman
[Here](messageapp\doc\newCollection.postman_test_run.json)


