package com.dyvr.chatapp.repository;

import com.dyvr.chatapp.model.FriendRequest;
import com.dyvr.chatapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    @Query("select fr.id from FriendRequest fr where fr.sender = :sender and fr.receiver = :receiver")
    Optional<Long> findBySenderAndReceiver(@Param("sender") User sender, @Param("receiver") User receiver);

    @Query("select fr from FriendRequest fr where fr.receiver = :receiver")
    List<FriendRequest> findRequestsByReceiverUsername(@Param("receiver") User receiver);
}
