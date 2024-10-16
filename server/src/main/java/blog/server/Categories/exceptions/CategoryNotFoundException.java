package blog.server.Categories.exceptions;

public class CategoryNotFoundException extends Exception {
    public CategoryNotFoundException(String id) {
        super(id);
    };
};
