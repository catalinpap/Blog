package blog.server.Search;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.server.Articles.Article;
import blog.server.Articles.ArticlesService;

@Service
public class SearchService {

    private ArticlesService articlesService;

    @Autowired
    public SearchService(ArticlesService articlesService) {
        this.articlesService = articlesService;
    }

    public List<Article> search(final String query) {
        String query_processed = query.toLowerCase();
        List<Article> articlesResult = articlesService
            .getAll()
            .stream()
            .filter(article -> checkQuery(article, query_processed))
            .collect(Collectors.toList());

        return articlesResult;
    }

    private Boolean checkQuery(Article article, String query) {
        return article.getTitle().toLowerCase().contains(query)
        || article.getContent().toLowerCase().contains(query)
        || article.getAuthor().getName().toLowerCase().contains(query)
        || article.getAuthor().getUsername().toLowerCase().contains(query);
    }
}
