package com.abolent.memory.app.repository;

import com.abolent.memory.app.model.Memories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoryRepository extends JpaRepository<Memories, Integer> {
}
