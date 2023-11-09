package com.example.CarSharing.registration;
import com.example.CarSharing.AppUser.AppUser;
import com.example.CarSharing.AppUser.AppUserRepository;
import lombok.AllArgsConstructor;
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


    @PostMapping()
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @GetMapping(value = "/users")
    public List<AppUser> userList() {
        return appUserRepository.findAll();
    }

    @GetMapping(value="/users/{id}")
    public Optional<AppUser> userListbyLong(@PathVariable Long id)
    {
        Optional<AppUser> user= appUserRepository.findById(id);
        return user;
    }
    @GetMapping(value="/users/{email}")
    public Optional<AppUser> userlistEmail(@PathVariable String email)
    {
        Optional<AppUser> user= appUserRepository.findByEmail(email);
        return user;
    }
    @PutMapping(value="/update/{id}")
    public String updateUser (@PathVariable long id,@RequestBody AppUser user)
    {
        AppUser updatedUser =appUserRepository.findById(id).get();
        updatedUser.setFirstname(user.getFirstName());
        updatedUser.setLastname(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        appUserRepository.save(updatedUser);
        return"Updated";


    }
    @DeleteMapping(value="/delete/{id}")
    public String deleteUser(@PathVariable long id)
    {
        AppUser deleteUser = appUserRepository.findById(id).get();
        appUserRepository.delete(deleteUser);
        return "Delete is " + id;}
    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }


}