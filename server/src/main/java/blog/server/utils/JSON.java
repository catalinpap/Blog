package blog.server.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JSON {
    private static ObjectMapper objectMapper = new ObjectMapper();

    public static <T> T parse(String jsonString, Class<T> valueType) throws JsonProcessingException {
        return objectMapper.readValue(jsonString, valueType);
    }

    public static <T> String write(T object) throws JsonProcessingException {
        return objectMapper.writeValueAsString(object);
    }
}
