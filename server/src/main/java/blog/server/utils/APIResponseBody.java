package blog.server.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class APIResponseBody {
    private Object data;
    private String message;

    public Object getData() {
        return this.data;
    }

    public String getMessage() {
        return this.message;
    }

    public APIResponseBody data(Object data) {
        this.data = data;
        return this;
    }

    public APIResponseBody message(String message) {
        this.message = message;
        return this;
    }

    public String json() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return this.toString();
        }
    }
}