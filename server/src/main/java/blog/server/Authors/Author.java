package blog.server.Authors;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Author {
    @Id
    private Long id;
    private String username;
    private String name;
    private List<Long> articlesIds;

    public Author(){}

    public Author(Author other) {
        this.id = other.getId();
        this.username = other.getUsername();
        this.name = other.getName();
        this.setArticleIds(other.getArticlesIds());
    }

    public Long getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getName() {
        return this.name;
    }

    public List<Long> getArticlesIds() {
        return this.articlesIds;
    }

    public Author setId(final Long id) {
        this.id = id;
        return this;
    }

    public Author setName(final String name) {
        this.name = name;
        return this;
    }

    public Author setUsername(final String username) {
        this.username = username;
        return this;
    }

    public Author setArticleIds(final List<Long> articleIds) {
        this.articlesIds = (articleIds != null) ? new ArrayList<>(articleIds) : new ArrayList<Long>();
        return this;
    }
}
