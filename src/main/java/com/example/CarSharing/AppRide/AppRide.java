package com.example.CarSharing.AppRide;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class AppRide {
    @SequenceGenerator(
            name="ride_sequence",
            sequenceName="ride_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "ride_sequence"
    )
    private Long id;
    private Long user_id;

    public Long getUser_passanger() {
        return user_passanger;
    }

    public void setUser_passanger(Long user_passanger) {
        this.user_passanger = user_passanger;
    }

    private Long user_passanger;
    private String origin;
    private String destination;
    private String distance;
    private String time;
    private int number_seats;
    private String data;

    public int getNumber_seats() {
        return number_seats;
    }

    public void setNumber_seats(int number_seats) {
        this.number_seats = number_seats;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }


}
