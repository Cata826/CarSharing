package com.example.CarSharing.AddTrip;

import com.example.CarSharing.AppUser.AppUserCarOwner;
import org.springframework.stereotype.Service;

@Service
public class RegistrationTripService {
    private AppUserCarOwner appUserCarOwner;
    public String registerTrip(RegistrationTripRequest requestTrip) {
        return appUserCarOwner.registerTrip(
                new AppUserCarOwner(
                        requestTrip.getFrom(),
                        requestTrip.getGoingTo(),
                        requestTrip.getCarBrand(),
                        requestTrip.getCarColor(),
                        requestTrip.getNoOfSeats()
                )
        );
    }
}
