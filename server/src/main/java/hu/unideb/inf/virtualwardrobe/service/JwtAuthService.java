package hu.unideb.inf.virtualwardrobe.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtAuthService {
    String generateToken(UserDetails userDetails);
    boolean validateToken(String token, UserDetails userDetails);
    String extractEmail(String token);
}
