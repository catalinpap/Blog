package blog.server.Articles.Bookmarks.exceptions;

public class NoBookmarkException extends Exception {
    public NoBookmarkException() {
        super("User did not bookmark this article yet");
    }
}