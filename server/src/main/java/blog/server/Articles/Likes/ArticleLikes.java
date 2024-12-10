package blog.server.Articles.Likes;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "article_likes")
public class ArticleLikes {
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

    public ArticleLikes setArticleId(final Long articleId) {
        this.articleId = articleId;
        return this;
    }

    public ArticleLikes setUserId(final Long userId) {
        this.userId = userId;
        return this;
    }
}
