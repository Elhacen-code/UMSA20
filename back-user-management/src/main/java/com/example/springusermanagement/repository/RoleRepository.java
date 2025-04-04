package com.example.springusermanagement.repository;

import com.example.springusermanagement.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
    Boolean existsByName(String name);
}