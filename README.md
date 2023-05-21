# Blog application using Nestjs, Reactjs and Postgresql 

## Requirements
- Node >=10
- VS Code

## Dependencies
* [Nestjs](https://nestjs.com/)
* [Reactjs](https://reactjs.org/)
* [Postgresql](https://www.postgresql.org/)
* [Typescript](https://www.typescriptlang.org)

## Run Nestjs Server
- Step 1: Create a Postgre database

- Step 2: Create a **.env** file at root directory of server (**nestjs-server**) with below variables. (Please change database configurations)
```
POSTGRES_HOST=xxxx
POSTGRES_PORT=xxxx
POSTGRES_USER=xxxxx
POSTGRES_PASSWORD=xxxxxx
POSTGRES_DATABASE=xxxxxx
```

- Step 3: npm install

- Step 4: npm run start:dev
The nest js server is running at port 5000

## Run Reactjs Client
 Note that the react client app is found under the client directory.
- Step 1: cd to client directory 
- Step 2: npm install
- Step 3: npm start
The react js client is running at port 3000

Enjoy!! :blush: