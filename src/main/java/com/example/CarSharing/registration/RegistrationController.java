package com.example.CarSharing.registration;
import com.example.CarSharing.AppRide.AppRideService;
import com.example.CarSharing.AppUser.AppUser;
import com.example.CarSharing.AppUser.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import com.example.CarSharing.AppRide.*;
@CrossOrigin(origins = {"http://localhost:3000/","http://127.0.0.1:1080/"})
@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;
    private AppUserRepository appUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private AppRideService appRideService;
    private AppRideRepository appRideRepository;
    @PostMapping("/request")
    public ResponseEntity<String> sendMail(@RequestBody RegistrationRequest registrationRequest) {
        try {
            registrationService.register(registrationRequest);
            return ResponseEntity.ok("Registration request received successfully. Please check your email for further instructions.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing registration request");
        }
    }
    @PostMapping()
    public String register(@RequestBody RegistrationRequest request) {

        return registrationService.register(request);
    }
    @GetMapping("/users/{id}/enabled")
    public ResponseEntity<Boolean> isUserEnabled(@PathVariable Long id) {
        Optional<AppUser> optionalUser = appUserRepository.findById(id);

        if (optionalUser.isPresent()) {
            AppUser user = optionalUser.get();
            return ResponseEntity.ok(user.isEnabled());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/createride")
    public String registerRide(@RequestBody RegistrationRequest request) {
        // Assuming RegistrationRequest contains origin, destination, distance, and time
        return appRideService.insertAppRide(request.getUser_id(), request.getUser_passanger(), request.getOrigin(), request.getDestination(),
                request.getDistance(), request.getTime(),request.getNumber_seats(),request.getData());
    }

    @GetMapping("/searchride")
    public List<AppRide> searchRides(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam String data


    ) {
        // Assuming you have a method in AppRideService to perform the search
        return appRideService.searchRides(origin, destination, data);
    }

    @GetMapping(value = "/rides")
    public List<AppRide> rideList() {
        return appRideRepository.findAll();
    }
    @GetMapping(value = "/users")
    public List<AppUser> userList() {
        return appUserRepository.findAll();
    }
    @GetMapping(value = "/users/{id}")
    public Optional<AppUser> getUserById(@PathVariable Long id) {
        return appUserRepository.findById(id);
    }
    @GetMapping(value = "/usersByEmail/{email}")
    public Optional<AppUser> getUserByEmail(@PathVariable String email) {
        return appUserRepository.findByEmail(email);
    }

    @GetMapping(value = "/login")
    public ResponseEntity<Long> loginUser(@RequestParam String email, @RequestParam String password) {
    Optional<AppUser> optionalUser = appUserRepository.findByEmail(email);

    if (optionalUser.isPresent() && bCryptPasswordEncoder.matches(password, optionalUser.get().getPassword())) {
        return ResponseEntity.ok(optionalUser.get().getId());
    } else {
        return ResponseEntity.notFound().build();
    }

    }

@PutMapping("users/booking/{origin}/{destination}/{data}")
public ResponseEntity<String> updateRide(
        @PathVariable String origin,
        @PathVariable String destination,
        @PathVariable String data,
        @RequestBody AppRide updatedRide
) {
    try {
        List<AppRide> ridesToUpdate = appRideService.searchRides(origin, destination, data);

        if (!ridesToUpdate.isEmpty()) {
            for (AppRide existingRide : ridesToUpdate) {
                existingRide.setUser_passanger(updatedRide.getUser_passanger());
                existingRide.setNumber_seats(updatedRide.getNumber_seats());
            }

            // Save the updated rides
            appRideRepository.saveAll(ridesToUpdate);

            return ResponseEntity.ok("User passenger updated successfully for the specified ride criteria.");
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating user passenger for ride: " + e.getMessage());
    }
}

    @PutMapping("/users/{id}")
    public ResponseEntity<String> updateUser(@PathVariable long id, @RequestBody AppUser user) {
    try {
        Optional<AppUser> optionalUser = appUserRepository.findById(id);

        if (optionalUser.isPresent()) {
            AppUser existingUser = optionalUser.get();
            existingUser.setPhone_number(user.getPhone_number());
            existingUser.setYear(user.getYear());
            existingUser.setMonth(user.getMonth());
            existingUser.setDay(user.getDay());
            existingUser.setFirstname(user.getFirstName());
            existingUser.setLastname(user.getLastName());

            appUserRepository.save(existingUser);
            return ResponseEntity.ok("User updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user: " + e.getMessage());
    }
}
    @DeleteMapping(value = "/delete/{id}")
    public String deleteUser(@PathVariable long id) {
        try {
            AppUser deleteUser = appUserRepository.findById(id).orElse(null);

            if (deleteUser != null) {
                appUserRepository.deleteById(id);
                return "Delete successful for ID: " + id;
            } else {
                return "User not found";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error deleting user: " + e.getMessage();
        }
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
