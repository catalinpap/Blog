package blog.server.Article;

import java.util.ArrayList;
import java.util.List;

public class ArticleFilter {
    private String category;
    private List<String> keywords;

    public String getCategory() {
        return this.category;
    }

    public List<String> getKeywords() {
        return this.keywords;
    }

    public ArticleFilter category(String category) {
        this.category = category;
        return this;
    }

    public ArticleFilter keywords(List<String> keywords) {
        if (keywords != null) this.keywords = new ArrayList<>(keywords);
        return this;
    }
}
