package com.codingninjas.EVotingSystem.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.codingninjas.EVotingSystem.entities.Election;
import com.codingninjas.EVotingSystem.entities.ElectionChoice;
import com.codingninjas.EVotingSystem.entities.User;
import com.codingninjas.EVotingSystem.entities.Vote;
import com.codingninjas.EVotingSystem.services.VotingService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class VotingController {
	
	@Autowired
	VotingService votingService;

	@GetMapping("/get/votes")
	public List<Vote> getAllVotes() {
		return votingService.getAllVotes();
	}

	@GetMapping("/get/users")
	public List<User> getAllUsers(){
		return votingService.getAllUsers();
	}
	
	@PostMapping("/add/user")
	public void addUser(@RequestBody User user) {
		votingService.addUser(user);
	}

	@PostMapping("/add/vote")
	public void addVote(@RequestBody Vote vote) {
		Vote updatedVote = new Vote();
		User user = votingService.findUserByName(vote.getUser().getName());
		Election election = votingService.findElectionByName(vote.getElection().getName());
		ElectionChoice electionChoice = votingService.findElectionChoiceByNameAndElection(vote.getElectionChoice().getName(),election);
		updatedVote.setElection(election);
		updatedVote.setElectionChoice(electionChoice);
		updatedVote.setUser(user);
		votingService.addVote(updatedVote);
	}

	@PostMapping("/add/election")
	public void addElection(@RequestBody Election election) {
		votingService.addElection(election);
	}
	
	@GetMapping("/get/elections")
	public List<Election> getAllElections(){
		return votingService.getAllElections();
	}

	@PostMapping("/add/electionChoice")
	public void addElectionChoice(@RequestBody ElectionChoice electionChoice) {
		ElectionChoice updatedElectionChoice = new ElectionChoice();
		Election election = votingService.findElectionByName(electionChoice.getElection().getName());
		updatedElectionChoice.setName(electionChoice.getName());
		updatedElectionChoice.setElection(election);
		votingService.addElectionChoice(updatedElectionChoice);
	}
	
	@GetMapping("/get/electionChoices")
	public List<ElectionChoice> getAllElectionChoices() {
		return votingService.getAllElectionChoices();
	}

	@GetMapping("/count/votes")
	public long getTotalNumberOfVotes() {
		return votingService.countTotalVotes();
	}

	@PostMapping("/count/election/choices")
	public long getTotalNumberOfChoicesByElection(@RequestBody Election election) {
		Election updatedElection = votingService.findElectionByName(election.getName());
		return votingService.getTotalNumberOfChoicesByElection(updatedElection);
	}

	@PostMapping("/count/election/votes")
	public long getTotalNumberOfVotesByElection(@RequestBody Election election) {
		Election updatedElec = votingService.findElectionByName(election.getName());
		return votingService.countVotesByElection(updatedElec);
	}

	@PostMapping("/winner/election")
	public ElectionChoice getWinnerOfElection(@RequestBody Election election) {
		Election updatedWinner = votingService.findElectionByName(election.getName());
		return votingService.findElectionChoiceWithMaxVotes(updatedWinner);
	}
	
	// 🔁 Reset votes for ALL elections
    @DeleteMapping("/reset-votes")
    public ResponseEntity<String> resetAllVotes() {
        votingService.resetAllVotes();
        return ResponseEntity.ok("All votes reset successfully");
    }

    // 🎯 Reset votes for ONE election
    @DeleteMapping("/{id}/reset-votes")
    public ResponseEntity<String> resetVotesForElection(@PathVariable Long id) {
        votingService.resetVotesByElectionId(id);
        return ResponseEntity.ok("Votes reset for election ID: " + id);
    }

}
