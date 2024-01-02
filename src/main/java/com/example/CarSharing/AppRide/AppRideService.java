package com.example.CarSharing.AppRide;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class AppRideService {

    @Autowired
    private AppRideRepository appRideRepository;

    @Transactional
    public String insertAppRide(String origin,
                                String destination,
                                String distance,
                                String time
                             //   ,String number_seats
                             //   ,String data
    ) {
        AppRide newRide = new AppRide();
        newRide.setOrigin(origin);
        newRide.setDestination(destination);
        newRide.setDistance(distance);
        newRide.setTime(time);
       // newRide.setNumber_seats(number_seats);
       // newRide.setData(data);

        appRideRepository.save(newRide);
        return origin;
    }
}

