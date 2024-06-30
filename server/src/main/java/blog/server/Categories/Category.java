package blog.server.Categories;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private List<Long> articleIds;

    public String getName() {
        return this.name;
    }

    public List<Long> getArticleIds() {
        return this.articleIds;
    }
    
}