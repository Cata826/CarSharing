package com.example.CarSharing.AddTrip;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v2/trip")
@AllArgsConstructor
public class AddTripController {

    private  RegistrationTripService registrationTripService;

    @PostMapping
    public String registerTrip(@RequestBody RegistrationTripRequest requestTrip){
        return registrationTripService.registerTrip(requestTrip);
    }
}
