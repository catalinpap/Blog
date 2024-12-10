package blog.server.Articles.Bookmarks.exceptions;

public class AlreadyBookmarkedException extends Exception {
    public AlreadyBookmarkedException() {
        super("User already bookmarked this article");
    }
}
