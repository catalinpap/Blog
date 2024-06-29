package blog.server.Article.exceptions;

public class ArticleNotFoundException extends Exception {

    public ArticleNotFoundException(String id) {
        super(id);
    }
	
}
