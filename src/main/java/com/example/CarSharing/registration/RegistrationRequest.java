package com.example.CarSharing.registration;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {

    private final String origin;
    private final String distance;
    private final String destination;
    private final String time;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String password;
    private final int year;
    private final int month;
    private final int day;

}
