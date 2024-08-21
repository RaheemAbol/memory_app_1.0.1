package com.abolent.memory.app.deserializer;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

public class BlobDeserializer extends JsonDeserializer<Blob> {

    @Override
    public Blob deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        byte[] data = jsonParser.getBinaryValue();
        try {
            return new javax.sql.rowset.serial.SerialBlob(data);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


}
