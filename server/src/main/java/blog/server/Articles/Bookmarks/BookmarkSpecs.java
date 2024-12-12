package blog.server.Articles.Bookmarks;

import org.springframework.data.jpa.domain.Specification;

public class BookmarkSpecs {
    private static final String USER_ID = "userId";

    public static Specification<ArticleBookmarks> filterBy(BookmarkFilter filter) {
        return Specification
            .where(hasUserId(filter.getUserId()));
    }

    private static Specification<ArticleBookmarks> hasUserId(Long userId) {
        return (root, query, builder) ->
            (userId == null)
                ? builder.conjunction()
                : builder.equal(root.get(USER_ID), userId);
    }
}
