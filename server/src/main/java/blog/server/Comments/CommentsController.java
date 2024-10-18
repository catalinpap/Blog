package blog.server.Comments;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import blog.server.utils.Const;

@RestController
@RequestMapping(Const.COMMENTS_BASE_URL)
public class CommentsController {

    @Autowired
    private CommentsService commentsService;
    
    @GetMapping("")
    public ResponseEntity<List<Comment>> getAll() {
        List<Comment> comments = this.commentsService.getAll();
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(comments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> get(@PathVariable Long id) throws Exception {
        Comment comment = this.commentsService.get(id);
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(comment);
    }

    @PostMapping("")
    public ResponseEntity<Comment> add(@RequestBody Comment comment) {
        Comment addedComment = this.commentsService.add(comment);

        URI commentUri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(addedComment.getId())
            .toUri();

        return ResponseEntity
            .created(commentUri)
            .contentType(MediaType.APPLICATION_JSON)
            .body(addedComment);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Comment> delete(@PathVariable Long id) throws Exception {
        Comment deletedComment = this.commentsService.delete(id);
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(deletedComment);
    }

    @PutMapping("")
    public ResponseEntity<Comment> update(@RequestBody Comment comment) throws Exception {
        Comment updatedComment = this.commentsService.update(comment);
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(updatedComment);
    }
}
