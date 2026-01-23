# E-Voting System

A full-stack voting application built with **Spring Boot**, **React**, and **MySQL**.  
Users can create elections, add choices, cast votes, and determine winners.

---

## Features

- Add and list users
- Create and manage elections
- Add choices to elections
- Cast votes and count totals
- Get the winning choice for an election
- Reset votes (globally or per election)

---

## Tech Stack

- **Backend:** Spring Boot
- **Frontend:** React.js
- **Database:** MySQL
- **API:** REST

---

## ⚙️ Setup

### Backend 
```bash
cd EvotingSystem-Backend
mvn spring-boot

###Frontend
cd EvotingSystem-Frontend
npm install
npm start

##Database
Configure MySQL in application.properties
Backend runs on http://localhost:8082
Frontend runs on http://localhost:3000

API Endpoints
###User
POST /add/user – Add user
GET /get/users – List users
###Election
POST /add/election – Create election
GET /get/elections – List elections
###Choices
POST /add/electionChoice – Add choice
GET /get/electionChoices – List choices
###Voting
POST /add/vote – Cast vote
GET /get/votes – List votes
GET /count/votes – Total votes
###Results
POST /winner/election – Get election winner
###Reset
DELETE /reset-votes – Reset all votes
DELETE /{id}/reset-votes – Reset votes for one election

##Usage Flow
Add users → Create elections → Add choices → Cast votes → Get winners → Reset votes if needed

##License
MIT


