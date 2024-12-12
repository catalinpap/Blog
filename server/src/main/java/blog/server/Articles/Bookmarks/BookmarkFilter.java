package blog.server.Articles.Bookmarks;

public class BookmarkFilter {
    private Long userId;

    public Long getUserId() {
        return this.userId;
    }

    public BookmarkFilter setUserId(final Long userId) {
        this.userId = userId;
        return this;
    }
};
