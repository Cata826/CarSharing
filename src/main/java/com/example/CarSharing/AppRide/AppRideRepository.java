package com.example.CarSharing.AppRide;

import com.example.CarSharing.AppUser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface AppRideRepository extends JpaRepository<AppRide, Long> {

    @Query("SELECT ar FROM AppRide ar WHERE ar.origin = :origin AND ar.destination = :destination AND ar.data = :data")
    List<AppRide> findByOriginAndDestinationAndData(
            @Param("origin") String origin,
            @Param("destination") String destination,
            @Param("data") String data

    );



}


