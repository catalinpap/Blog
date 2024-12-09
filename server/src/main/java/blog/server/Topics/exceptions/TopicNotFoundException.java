package blog.server.Topics.exceptions;

public class TopicNotFoundException extends Exception {
    public TopicNotFoundException(String id) {
        super(id);
    };
};
