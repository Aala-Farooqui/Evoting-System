E-Voting System

A full-stack voting application with Spring Boot (backend), React (frontend), and MySQL. Users can create elections, add choices, cast votes, and get winners.

Features:

Add/list users, elections, and choices

Cast votes and count totals

Get the winning choice for an election

Reset votes (all or per election)

Tech Stack:

Backend: Spring Boot

Frontend: React.js

Database: MySQL

API: REST

Setup:

Backend:

cd EvotingSystem-Backend

mvn spring-boot:run

Frontend:

cd EvotingSystem-Frontend

npm install

npm start

Database:

configure MySql in application.properties

Backend runs on http://localhost:8082, frontend on http://localhost:3000.

API Endpoints:

POST /add/user – Add user

GET /get/users – List users

POST /add/election – Create election

GET /get/elections – List elections

POST /add/electionChoice – Add choice

GET /get/electionChoices – List choices

POST /add/vote – Cast vote

GET /get/votes – List votes

GET /count/votes – Total votes

POST /winner/election – Get election winner

DELETE /reset-votes – Reset all votes

DELETE /{id}/reset-votes – Reset votes for one election

Usage Flow

Add users → Create elections → Add choices → Cast votes → Get winners → Reset votes if needed

License

MIT License

