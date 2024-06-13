package blog.server.Exceptions;

public class ArticleNotFoundException extends Exception {

    public ArticleNotFoundException(String id) {
        super(id);
    }
	
}
