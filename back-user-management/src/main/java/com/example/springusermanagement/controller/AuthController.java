package com.example.springusermanagement.controller;

import com.example.springusermanagement.model.User;
import com.example.springusermanagement.security.JwtService;
import com.example.springusermanagement.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationProvider authenticationProvider;
    private final JwtService jwtService;
    private final UserService userService;

    public AuthController(AuthenticationProvider authenticationProvider,
                         JwtService jwtService,
                         UserService userService) {
        this.authenticationProvider = authenticationProvider;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User registeredUser = userService.createUser(user);
        String jwtToken = jwtService.generateToken(registeredUser);
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("user", registeredUser);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Authentication authentication = authenticationProvider.authenticate(
            new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        
        User authenticatedUser = (User) authentication.getPrincipal();
        String jwtToken = jwtService.generateToken(authenticatedUser);
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("user", authenticatedUser);
        
        return ResponseEntity.ok(response);
    }
}