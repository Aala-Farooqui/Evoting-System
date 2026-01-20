package com.codingninjas.EVotingSystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.codingninjas.EVotingSystem.entities.Election;
import com.codingninjas.EVotingSystem.entities.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long> {
	@Query(value = "SELECT COUNT(*) FROM vote", nativeQuery = true)
	Long countTotalVotes();

	@Query("SELECT COUNT(v) FROM Vote v WHERE v.election = :election")
	Long countVotesByElection(@Param("election") Election election);
	
	 // 🎯 Reset votes for ONE election
    @Modifying
    @Transactional
    @Query("DELETE FROM Vote v WHERE v.election.id = :electionId")
    void deleteVotesByElectionId(@Param("electionId") Long electionId);

    // 🔁 Reset votes for ALL elections
    @Modifying
    @Transactional
    @Query("DELETE FROM Vote v")
    void deleteAllVotes();
}
