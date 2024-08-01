package blog.server.Articles.exceptions;

public class ArticleNotFoundException extends Exception {
    public ArticleNotFoundException(String id) {
        super(id);
    }
}
