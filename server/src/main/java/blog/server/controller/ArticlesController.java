package blog.server.controller;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import blog.server.domains.Article;
import blog.server.services.ArticlesService;
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
		boolean deleteResponse = articlesService.delete(id);
		String responseBody = new APIResponseBody().data(deleteResponse).json();
		
		return ResponseEntity.ok(responseBody);
		
	}

	private String toJSON(Map object) {
		ObjectMapper objectMapper = new ObjectMapper();

		try {
			return objectMapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return object.get("message").toString();
		}
	}
}
