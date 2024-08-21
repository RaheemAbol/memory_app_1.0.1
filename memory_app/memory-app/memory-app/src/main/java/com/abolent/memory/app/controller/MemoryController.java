package com.abolent.memory.app.controller;
import com.abolent.memory.app.model.Memories;
import com.abolent.memory.app.repository.MemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MemoryController {

    @Autowired
    private MemoryRepository memoryRepository;

    // adding a memory
    @PostMapping("/memories")
    public Memories newMemory(@RequestParam("date") String date,
                              @RequestParam("description") String description,
                              @RequestParam("image") MultipartFile image) throws IOException {
        Memories memory = new Memories();
        memory.setDate(Date.valueOf(date));
        memory.setDescription(description);

        byte[] imageBytes = image.getBytes();
        memory.setImage(imageBytes);

        return memoryRepository.save(memory);
    }

    // viewing a memory
    @GetMapping("/memories/{id}")
    public Optional<Memories> getMemoryById(@PathVariable Integer id) {
        return memoryRepository.findById(id);
    }

    // viewing all memories
    @GetMapping("/memoriesList")
    public List<Memories> getAllMemories() {
        return memoryRepository.findAll();
    }

    // updating a memory
    @PutMapping("/memories/{id}")
    public Memories updateMemory(@RequestParam("date") String date,
                                 @RequestParam("description") String description,
                                 @RequestParam("image") MultipartFile newImage,
                                 @PathVariable Integer id) throws IOException {
        return memoryRepository.findById(id).map(memory -> {
            memory.setDate(Date.valueOf(date));
            memory.setDescription(description);

            byte[] newImageBytes = new byte[0];
            try {
                newImageBytes = newImage.getBytes();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            memory.setImage(newImageBytes);

            return memoryRepository.save(memory);
        }).orElseThrow(() -> new RuntimeException("Memory not found"));
    }

    // deleting a memory
    @DeleteMapping("/memories/{id}")
    public String deleteMemory(@PathVariable Integer id) {
        memoryRepository.deleteById(id);
        return "Memory deleted";
    }
}
