package blog.server.Articles.Likes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleLikesRepository extends JpaRepository<ArticleLikes, Long> {
    public boolean existsByArticleIdAndUserId(Long articleId, Long UserId);
    public ArticleLikes findByArticleIdAndUserId(Long articleId, Long UserId);
}
