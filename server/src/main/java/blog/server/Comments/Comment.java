package blog.server.Comments;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String content;

    private Long articleId;

    @CreationTimestamp
    private LocalDateTime creationDate;

    @ColumnDefault("0")
    private Integer likes = 0;

    public Long getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getContent() {
        return this.content;
    }

    public Long getArticleId() {
        return this.articleId;
    }

    public String getCreationDate() {
        return this.creationDate.toLocalDate().toString();
    }

    public Integer getLikes() {
        return this.likes;
    }

    public Comment setUsername(final String username) {
        this.username = username;
        return this;
    }

    public Comment setContent(final String content) {
        this.content = content;
        return this;
    }

    public Comment setArticleId(final Long articleId) {
        this.articleId = articleId;
        return this;
    }

    public Comment setLikes(final Integer likes) {
        this.likes = likes;
        return this;
    }

}
