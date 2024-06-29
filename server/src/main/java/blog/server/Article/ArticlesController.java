package blog.server.Article;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

@RestController
@RequestMapping("/api/articles")
public class ArticlesController {

	@Autowired
	private ArticlesService articlesService;
	
	@GetMapping("")
	public ResponseEntity<String> getAll() {
		List<Article> articles = articlesService.getAll();
		String responseBody = new APIResponseBody().data(articles).json();
		return ResponseEntity
			.ok()
			.body(responseBody);
	}

	@GetMapping("/{id}")
	public ResponseEntity<String> get(@PathVariable long id) throws Exception {
		Article article = articlesService.get(id);
		String responseBody = new APIResponseBody().data(article).json();
		return ResponseEntity
			.ok()
			.body(responseBody);
	}

	@PostMapping("")
	public ResponseEntity<String> add(@RequestBody Article article) throws Exception {
		Article addedArticle = articlesService.add(article);
		String responseBody = new APIResponseBody().data(article).json();

		URI articleURI = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(addedArticle.getId())
			.toUri();

		return ResponseEntity
			.created(articleURI)
			.body(responseBody);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable long id) throws Exception {
		Article deleteResponse = articlesService.delete(id);
		String responseBody = new APIResponseBody()
			.data(deleteResponse)
			.message("Article deleted")
			.json();
		
		return ResponseEntity.ok(responseBody);
		
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> update(@PathVariable long id) throws Exception {
		Article updateResponse = null;
		String responseBody = new APIResponseBody()
			.data(updateResponse)
			.message("Article updated")
			.json();

		return ResponseEntity.ok(responseBody);
	}
}
