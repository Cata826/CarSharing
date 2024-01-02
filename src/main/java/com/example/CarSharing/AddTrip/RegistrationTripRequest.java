package com.example.CarSharing.AddTrip;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationTripRequest {
    private final String from;
    private final String goingTo;
    private final String carBrand;
    private final String carColor;
    private final int noOfSeats;
}
