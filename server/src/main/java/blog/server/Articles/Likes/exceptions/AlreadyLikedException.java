package blog.server.Articles.Likes.exceptions;

public class AlreadyLikedException extends Exception {
    public AlreadyLikedException() {
        super("User already liked this article");
    }
}
