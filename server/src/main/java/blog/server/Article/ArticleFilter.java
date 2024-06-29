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

    // private class ArticleFilterBuilder {
    //     private ArticleFilter articleFilter;

    //     public ArticleFilterBuilder(ArticleFilter articleFilter) {
    //         this.articleFilter = articleFilter;
    //     }

    //     public void category(String category) {
    //         articleFilter.category = category;
    //     }
    
    //     public void keywords(String keywords) {
    //         articleFilter.keywords = keywords;
    //     }

    //     public ArticleFilterBuilder build() {
    //         return this;
    //     }
    // }
}
