package blog.server.Authors;

import java.util.List;

import blog.server.Articles.Article;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    //private List<Article> articles;

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    // public List<Article> getArticles() {
    //     return this.articles;
    // }

    public Author name(String name) {
        this.name = name;
        return this;
    }
}
