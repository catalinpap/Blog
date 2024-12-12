package blog.server.Bookmarks;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarksRepository extends JpaRepository<Bookmark, Long>, JpaSpecificationExecutor<Bookmark> {
    public boolean existsByArticleIdAndUserId(Long articleId, Long userId);
    public Bookmark findByArticleIdAndUserId(Long articleId, Long userId);
}
