package com.example.CarSharing.AppRide;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
public class AppRideService {

    @Autowired
    private AppRideRepository appRideRepository;

    @Transactional
    public String insertAppRide(Long user_id,
                                Long user_passanger,
                                String origin,
                                String destination,
                                String distance,
                                String time
                                ,int number_seats
                                ,String data
    ) {
        AppRide newRide = new AppRide();
        newRide.setUser_id(user_id);
        newRide.setUser_passanger(user_passanger);
        newRide.setOrigin(origin);
        newRide.setDestination(destination);
        newRide.setDistance(distance);
        newRide.setTime(time);
        newRide.setNumber_seats(number_seats);
        newRide.setData(data);

        appRideRepository.save(newRide);
        return origin;
    }

    public List<AppRide> searchRides(String origin, String destination, String data) {
        return appRideRepository.findByOriginAndDestinationAndData(origin, destination, data);
    }
}

