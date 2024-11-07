package blog.server.utils;

import com.fasterxml.jackson.core.JsonProcessingException;

public class ApiResponseBody {
    private Object data;
    private String message;

    public Object getData() {
        return this.data;
    }

    public String getMessage() {
        return this.message;
    }

    public ApiResponseBody data(Object data) {
        this.data = data;
        return this;
    }

    public ApiResponseBody message(String message) {
        this.message = message;
        return this;
    }

    public String json() {
        try {
            return JSON.write(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return this.toString();
        }
    }
}