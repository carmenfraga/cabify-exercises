# Project Title: messageapp

A brief description of what this project does and who it's for


# Instructions

1. Install dependencies: `npm install`
2. Run server: `npm run dev`


# Endpoints table

| Method | URL | Description |
|-------------|-------------|-------------|
| POST | /messages | Sending messages |


# Official Contract

## Possible success and error responses it can return

Message sent to "destination" `200`

Fields must not be empty `Error 400`

Fields must be filled with text `Error 400`

Both keys, destination and body are required `Error 400`

<!-- Internal Server Error `Error 500` -->


## Command line tests ran with Postman
[Here](messageapp\doc\newCollection.postman_test_run.json)


