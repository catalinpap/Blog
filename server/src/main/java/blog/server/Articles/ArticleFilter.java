package blog.server.Articles;

import java.util.ArrayList;
import java.util.List;

public class ArticleFilter {
    private String category;
    private List<String> keywords;
    private Long authorId;

    public String getCategory() {
        return this.category;
    }

    public List<String> getKeywords() {
        return this.keywords;
    }

    public Long getAuthorId() {
        return this.authorId;
    }

    public ArticleFilter category(String category) {
        this.category = category;
        return this;
    }

    public ArticleFilter keywords(List<String> keywords) {
        if (keywords != null) this.keywords = new ArrayList<>(keywords);
        return this;
    }

    public ArticleFilter authorId(Long authorId) {
        this.authorId = authorId;
        return this;
    }
}
