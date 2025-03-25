package com.example.springusermanagement.controller;

import com.example.springusermanagement.model.User;
import com.example.springusermanagement.security.JwtService;
import com.example.springusermanagement.service.UserService;
import com.example.springusermanagement.dto.UserResponse;
import jakarta.validation.Valid;
import com.example.springusermanagement.dto.UserDTO;
import com.example.springusermanagement.dto.LoginDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> register(@RequestBody @Valid UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        
        User registeredUser = userService.createUser(user);
        String jwtToken = jwtService.generateToken(registeredUser);
        
        UserResponse response = new UserResponse(registeredUser, jwtToken);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDTO loginDTO) {
        Authentication authentication = authenticationProvider.authenticate(
            new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );
        User authenticatedUser = (User) authentication.getPrincipal();
        System.out.println("Authenticated user: " + authenticatedUser.getUsername());
        User authenticatedUserWithRoles = userService.getUserByUsername(authenticatedUser.getUsername());
        System.out.println("Roles: " + authenticatedUserWithRoles.getRoles());
        String jwtToken = jwtService.generateToken(authenticatedUser);
        
        UserResponse response = new UserResponse(authenticatedUserWithRoles, jwtToken);
        return ResponseEntity.ok(response);
    }
}