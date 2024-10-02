package blog.server.Authors;

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

import blog.server.utils.APIResponseBody;
import blog.server.utils.Const;

@RestController
@RequestMapping(Const.AUTHORS_BASE_URL)
public class AuthorsController {

    @Autowired
    private AuthorsService authorsService;

    @GetMapping("")
    public ResponseEntity<String> getAll() {
        // TODO: maybe use paginated response for consistency reasons

        List<Author> authors = authorsService.getAll();
        String responseBody = new APIResponseBody()
            .data(authors)
            .json();
        
            return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(responseBody);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> get(@PathVariable Long id) throws Exception {
        Author author = authorsService.get(id);

        String responseBody = new APIResponseBody().data(author).json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);

    }

    @PostMapping("")
    public ResponseEntity<String> add(@RequestBody Author author) throws Exception {
        Author addedAuthor = authorsService.add(author);
        String responseBody = new APIResponseBody()
            .data(addedAuthor)
            .message("Author created")
            .json();

        URI authorURI = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(addedAuthor.getId())
			.toUri();

        return ResponseEntity
            .created(authorURI)
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {
        Author deletedAuthor = authorsService.delete(id);

        String responseBody = new APIResponseBody()
            .data(deletedAuthor)
            .message("Author deleted")
            .json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody Author author) throws Exception {
        Author updatedAuthor = authorsService.update(author);

        String responseBody = new APIResponseBody()
            .data(updatedAuthor)
            .message("Author updated")
            .json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);   

    }
    
}
