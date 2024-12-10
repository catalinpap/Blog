package blog.server.Articles.Bookmarks;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleBookmarksRepository extends JpaRepository<ArticleBookmarks, Long> {
    public boolean existsByArticleIdAndUserId(Long articleId, Long userId);
    public ArticleBookmarks findByArticleIdAndUserId(Long articleId, Long userId);
}
