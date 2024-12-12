package blog.server.Bookmarks;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import blog.server.utils.ApiResponseBody;
import blog.server.utils.Const;

@RestController
@RequestMapping(Const.BOOKMARKS_BASE_URL)
public class BookmarksController {
    @Autowired
    private BookmarksService bookmarksService;

    @GetMapping("")
    public ResponseEntity<String> getBookmarks(@RequestParam(value = "userId", required = false) Long userId) {
        BookmarkFilter filters = new BookmarkFilter()
            .setUserId(userId);
        
        List<?> bookmarks;
        if (userId != null) {
            bookmarks = this.bookmarksService.getAll(filters);
        } else {
            bookmarks = this.bookmarksService.getAll();
        }

        String responseBody = new ApiResponseBody().data(bookmarks).json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }
}
