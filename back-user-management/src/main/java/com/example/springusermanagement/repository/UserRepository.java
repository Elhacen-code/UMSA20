package com.example.springusermanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springusermanagement.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}