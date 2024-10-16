package blog.server.Categories;

import java.util.List;

import blog.server.Articles.Article;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotNull
    @Column(unique = true)
    private String name;


    // private List<Article> articles;

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    // public List<Article> getArticles() {
    //     return this.articles;
    // }

    public Category setName(final String name) {
        this.name = name;
        return this;
    }
    
}