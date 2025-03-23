package hu.unideb.inf.virtualwardrobe.controller;

import hu.unideb.inf.virtualwardrobe.service.AuthService;
import hu.unideb.inf.virtualwardrobe.service.dto.LoginDto;
import hu.unideb.inf.virtualwardrobe.service.dto.RegistrationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/registration")
    public void registration(@RequestBody RegistrationDto dto) {
        authService.registration(dto);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto dto) {
        return authService.login(dto);
    }
}
