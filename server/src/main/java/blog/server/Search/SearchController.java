package blog.server.Search;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import blog.server.Articles.Article;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private SearchService searchService;
    
    @GetMapping("")
    public List<Article> search(@RequestParam(value = "query", required = true) String query) {
        return searchService.search(query);
    }
}
