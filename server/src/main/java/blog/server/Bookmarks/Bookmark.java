package blog.server.Bookmarks;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long articleId;

    @NotNull
    private Long userId;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public Long getId() {
        return this.id;
    }

    public Long getArticleId() {
        return this.articleId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public String getCreatedAt() {
        return this.createdAt.toLocalDate().toString();
    }

    public Bookmark setArticleId(final Long articleId) {
        this.articleId = articleId;
        return this;
    }

    public Bookmark setUserId(final Long userId) {
        this.userId = userId;
        return this;
    }
}
