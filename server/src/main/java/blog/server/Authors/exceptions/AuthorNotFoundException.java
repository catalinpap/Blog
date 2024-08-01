package blog.server.Authors.exceptions;

public class AuthorNotFoundException extends Exception {
    public AuthorNotFoundException(String id) {
        super(id);
    }
}
