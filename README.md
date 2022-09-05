# Shumba Money Challenge

This project consists of the frontend and backend code in separate folders client and server respectively.

- The client is a React application
- The server is a Node application
- The database used is MongoDB (Remote Database - Atlas)

## Setup Instructions

### 1. Backend Application (Node)

```bash
cd server
```

Install Packages
```bash
npm install
```

Rename file local.env to .env 

### 2. Frontend Application (React)

```bash
cd client
```

Install Packages
```bash
npm install
```

Rename file local.env to .env 


### 3. Run concurrently

install concurrently
```bash
npm install -g concurrently
```

Start backend and frontend application with one command


```bash
cd client
npm run dev
```

The backend application should start on localhost port 5000 and the frontend application on port 3000


## Test Users
There are two test users that are available to test when  logging in.

**Test Customer 1**
- email: customer1@site.com
- password: customer1

**Test Customer 2**
- email: customer2@site.com
- password: customer2

## License
[MIT](https://choosealicense.com/licenses/mit/)