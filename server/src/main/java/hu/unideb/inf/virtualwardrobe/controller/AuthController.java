package hu.unideb.inf.virtualwardrobe.controller;

import hu.unideb.inf.virtualwardrobe.service.AuthService;
import hu.unideb.inf.virtualwardrobe.service.JwtAuthService;
import hu.unideb.inf.virtualwardrobe.service.dto.LoginDto;
import hu.unideb.inf.virtualwardrobe.service.dto.RegistrationDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;
    @Autowired
    JwtAuthService jwtAuthService;

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@Valid @RequestBody RegistrationDto dto) {
        try {
            authService.registration(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Successful registration.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDto dto, @CookieValue(name = "jwt", required = false) String cookie) {
        if (cookie != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already logged in.");
        }
        try {
            String token = authService.login(dto);

            ResponseCookie jwtCookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(15*60)
                    .sameSite("Lax")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                    .body("Successful login.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@CookieValue(name = "jwt", required = false) String cookie) {
        if (cookie == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not logged in.");
        }

        ResponseCookie deleteCookieAfterLogout = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteCookieAfterLogout.toString())
                .body("Successful logout.");
    }

    @GetMapping("/status")
    public ResponseEntity<?> getAuthStatus(@CookieValue(name = "jwt", required = false) String token )  {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(Map.of("email", jwtAuthService.extractEmail(token)));
    }
}
