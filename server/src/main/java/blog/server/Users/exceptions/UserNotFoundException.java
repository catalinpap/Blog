package blog.server.Users.exceptions;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(String id) {
        super(id);
    }
}
