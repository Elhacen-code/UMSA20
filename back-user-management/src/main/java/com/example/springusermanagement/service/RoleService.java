package com.example.springusermanagement.service;

import com.example.springusermanagement.model.Role;
import com.example.springusermanagement.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role getDefaultRole() {
        return roleRepository.findByName("User")
                .orElseGet(() -> roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Default role not found")));
    }

    public Role getRoleByName(String name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Role not found with name: " + name));
    }

    public Role getRoleById(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + id));
    }
}