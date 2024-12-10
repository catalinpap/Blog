package blog.server.Articles.Likes.exceptions;

public class NoLikeException extends Exception {
    public NoLikeException() {
        super("User did not like this article yet");
    }
}
