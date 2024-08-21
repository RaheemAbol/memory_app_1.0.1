package com.abolent.memory.app.model;

import com.abolent.memory.app.deserializer.BlobDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.sql.Date;

@Getter
@Setter
@Entity
public class Memories {

    @Id
    @GeneratedValue
    private int id;
    @Temporal(TemporalType.DATE)
    private Date date;
    private String description;
//    @JsonDeserialize(using = BlobDeserializer.class)
//    private Blob image;
@Lob
@Column(columnDefinition = "LONGBLOB")
private byte[] image;
//    private String image;

//    private String image;
//
//    @Transient
//    private MultipartFile imageFile;

}
