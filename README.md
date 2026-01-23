# 🗳️ E-Voting System

A full-stack voting application built with **Spring Boot**, **React**, and **MySQL**.  
Users can create elections, add choices, cast votes, and determine winners.

---

## 🚀 Features

- Add and list users
- Create and manage elections
- Add choices to elections
- Cast votes and count totals
- Get the winning choice for an election
- Reset votes (globally or per election)

---

## 🛠 Tech Stack

- Backend: Spring Boot
- Frontend: React.js
- Database: MySQL
- API: REST

---

## ⚙️ Setup & Run

```bash
# Backend
cd EvotingSystem-Backend
mvn spring-boot:run

# Frontend
cd EvotingSystem-Frontend
npm install
npm start

Configure MySQL in application.properties
Backend runs on http://localhost:8082
Frontend runs on http://localhost:3000

API Endpoints
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


