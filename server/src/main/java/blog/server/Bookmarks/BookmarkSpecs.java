package blog.server.Bookmarks;

import org.springframework.data.jpa.domain.Specification;

public class BookmarkSpecs {
    private static final String USER_ID = "userId";

    public static Specification<Bookmark> filterBy(BookmarkFilter filter) {
        return Specification
            .where(hasUserId(filter.getUserId()));
    }

    private static Specification<Bookmark> hasUserId(Long userId) {
        return (root, query, builder) ->
            (userId == null)
                ? builder.conjunction()
                : builder.equal(root.get(USER_ID), userId);
    }
}
