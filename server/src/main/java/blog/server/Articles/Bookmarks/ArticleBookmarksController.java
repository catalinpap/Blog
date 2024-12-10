package blog.server.Articles.Bookmarks;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import blog.server.utils.ApiResponseBody;
import blog.server.utils.Const;

@Controller
@RequestMapping(Const.ARTICLES_BASE_URL)
public class ArticleBookmarksController {
    @Autowired
    private ArticleBookmarksService articleBookmarksService;

    @GetMapping("/bookmarks")
    public ResponseEntity<String> getBookmarks() {
        List<ArticleBookmarks> bookmarks = this.articleBookmarksService.getAll();

        String responseBody = new ApiResponseBody().data(bookmarks).json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @PostMapping("/{articleId}/bookmark")
    public ResponseEntity<String> bookmarkArticle(@PathVariable Long articleId) throws Exception {
        ArticleBookmarks newEntry = articleBookmarksService.add(articleId);

        String responseBody = new ApiResponseBody()
            .data(newEntry)
            .message("Article bookmarked")
            .json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @DeleteMapping("/{articleId}/bookmark")
    public ResponseEntity<String> removeBookmark(@PathVariable Long articleId) throws Exception {
        ArticleBookmarks deletedEntry = articleBookmarksService.delete(articleId);

        String responseBody = new ApiResponseBody()
            .data(deletedEntry)
            .message("Removed bookmark")
            .json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }
}
