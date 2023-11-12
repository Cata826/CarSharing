package com.example.CarSharing.registration;
import com.example.CarSharing.AppUser.AppUser;
import com.example.CarSharing.AppUser.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;
    private AppUserRepository appUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @PostMapping()
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
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
//    @GetMapping(value = "/login")
//    public ResponseEntity<String> loginUser(@RequestParam String email, @RequestParam String password) {
//        Optional<AppUser> user = appUserRepository.findByEmail(email);
//
//        if (user.isPresent() && bCryptPasswordEncoder.matches(password, user.get().getPassword())) {
//            return ResponseEntity.ok("Login successful");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//        }
//    }
@GetMapping(value = "/login")
public ResponseEntity<AppUser> loginUser(@RequestParam String email, @RequestParam String password) {
    Optional<AppUser> optionalUser = appUserRepository.findByEmail(email);

    if (optionalUser.isPresent() && bCryptPasswordEncoder.matches(password, optionalUser.get().getPassword())) {
        return ResponseEntity.ok(optionalUser.get());
    } else {
        return ResponseEntity.notFound().build();
    }
}

//    @PutMapping(value = "/update/{id}")
//    public String updateUser(@PathVariable long id, @RequestBody AppUser user) {
//        AppUser updatedUser = appUserRepository.findById(id).orElse(null);
//
//        if (updatedUser != null) {
//            updatedUser.setEmail(user.getEmail());
//            appUserRepository.save(updatedUser);
//            return "Updated";
//        } else {
//            return "User not found";
//        }
//    }
@PutMapping("users/{id}")
public ResponseEntity<String> updateUser(@PathVariable long id, @RequestBody AppUser user) {
    try {
        Optional<AppUser> optionalUser = appUserRepository.findById(id);

        if (optionalUser.isPresent()) {
            AppUser existingUser = optionalUser.get();
            existingUser.setEmail(user.getEmail());
            existingUser.setYear(user.getYear());
            existingUser.setMonth(user.getMonth());
            existingUser.setDay(user.getDay());
            existingUser.setFirstname(user.getFirstName());
            existingUser.setLastname(user.getLastName());



            // Update other fields as needed

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
            e.printStackTrace(); // Log the exception for detailed information
            return "Error deleting user: " + e.getMessage();
        }
    }

//    @DeleteMapping(value = "/delete/{id}")
//    public String deleteUser(@PathVariable long id) {
//        AppUser deleteUser = appUserRepository.findById(id).orElse(null);
//
//        if (deleteUser != null) {
//            appUserRepository.deleteById(id);
//            return "Delete successful for ID: " + id;
//        } else {
//            return "User not found";
//        }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }
}
