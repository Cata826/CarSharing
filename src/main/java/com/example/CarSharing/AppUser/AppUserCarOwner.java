package com.example.CarSharing.AppUser;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class AppUserCarOwner extends AppUser{

    private String from;
    private  String goingTo;
    private String carBrand;
    private String carColor;
    private int noOfSeats;


    public AppUserCarOwner(String from, String goingTo, String carBrand, String carColor, int noOfSeats) {
        this.from = from;
        this.goingTo = goingTo;
        this.carBrand = carBrand;
        this.carColor = carColor;
        this.noOfSeats = noOfSeats;
    }

    public String getFrom() {
        return from;
    }

    public String getGoingTo() {
        return goingTo;
    }

    public String getCarBrand() {
        return carBrand;
    }

    public String getCarColor() {
        return carColor;
    }

    public int getNoOfSeats() {
        return noOfSeats;
    }


    public String registerTrip(AppUserCarOwner appUserCarOwner)
    {
        //appUserCarOwnerRepository.save(appUserCarOwner); //TODO make an appUserCarOwnerRepository

        return "";
    }
}
