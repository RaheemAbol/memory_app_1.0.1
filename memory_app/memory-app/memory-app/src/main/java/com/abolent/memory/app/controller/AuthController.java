package com.abolent.memory.app.controller;

import com.abolent.memory.app.model.User;
import com.abolent.memory.app.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;


//      check back to see why this method changes the navbar from having logout option to just login/register
//    @PostMapping("/register")
//    public ResponseEntity<User> registerUser(@RequestBody User user) {
//        if (userRepository.findByEmail(user.getEmail()) != null) {
//            return new ResponseEntity<>(HttpStatus.CONFLICT);
//        }
//
//        userRepository.save(user);
//        return new ResponseEntity<>(user, HttpStatus.CREATED);
//    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestBody User loginUser) {
        User user = userRepository.findByEmail(loginUser.getEmail());

        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            String jwtToken = generateJwtToken(user);
            Map<String, String> response = new HashMap<>();
            response.put("token", jwtToken);
            return ResponseEntity.ok(response);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    private String generateJwtToken(User user) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // Set token expiration time (1 hour)
        long expMillis = nowMillis + 3600000;
        Date exp = new Date(expMillis);

        String secretKey = "yourSecretKey"; // Choose a secret key for signing the JWT

        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
