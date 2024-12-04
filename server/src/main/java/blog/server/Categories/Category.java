package blog.server.Categories;

import java.util.List;

import blog.server.Articles.Article;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PostPersist;
import jakarta.validation.constraints.NotNull;

@Entity
public class Category {
    // TODO: Rethink the ID for the category. Numerical or name as id?
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @Id
    @NotNull
    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "categoryId", fetch = FetchType.EAGER, targetEntity = Article.class)
    private List<Article> articles;

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public List<Article> getArticles() {
        return this.articles;
    }

    public Category setId(final Long id) {
        this.id = id;
        return this;
    }

    public Category setName(final String name) {
        this.name = name;
        return this;
    }

    @PostPersist
	public void onSave() {
		this.name = this.name.toLowerCase();
	}
    
}