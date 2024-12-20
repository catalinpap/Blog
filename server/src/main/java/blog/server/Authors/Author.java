package blog.server.Authors;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import blog.server.Articles.Article;
import blog.server.Users.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Author {
    @Id
    private Long id;
    private String username;
    private String name;
    private String about;

    // @OneToMany(mappedBy = "author", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    // @JsonIgnoreProperties("author")
    // private List<Article> articles;

    public Author(){}

    public Author(Author other) {
        this.id = other.getId();
        this.username = other.getUsername();
        this.name = other.getName();
        // this.setArticles(other.getArticles());
    }

    public Author fromUser(User user) {
        return new Author()
            .setId(user.getId())
            .setUsername(user.getUsername())
            .setName(user.getDisplayName());
            // .setArticles(new ArrayList<Article>());
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

    public String getAbout() {
        return this.about;
    }

    // public List<Article> getArticles() {
    //     return this.articles;
    // }

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

    public Author setAbout(final String about) {
        this.about = about;
        return this;
    }

    // public Author setArticles(final List<Article> articles) {
    //     this.articles = (articles != null) ? new ArrayList<>(articles) : new ArrayList<Article>();
    //     return this;
    // }
}
