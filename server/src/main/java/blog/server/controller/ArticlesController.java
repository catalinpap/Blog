package blog.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import blog.server.domains.Article;
import blog.server.services.ArticlesService;

@RestController
@RequestMapping("/api/articles")
public class ArticlesController {

	@Autowired
	private ArticlesService articlesService;

	// @Autowired
	// public ArticlesController (ArticlesService articlesService) {
	// 	this.articlesService = articlesService;
	// }
	
	@GetMapping("/")
	public ResponseEntity<List<Article>> getAll() {
		List<Article> articles = articlesService.getAll();
		return ResponseEntity
			.ok()
			.body(articles);

	}

	@GetMapping("/{id}")
	public ResponseEntity<Article> get(@PathVariable long id) throws Exception {
		Article article = articlesService.get(id);
		return ResponseEntity
			.ok()
			.body(article);
	}

	@PostMapping("/")
	@ResponseStatus(HttpStatus.CREATED)
	public Article add(@RequestBody Article article) throws Exception {
		return articlesService.add(article);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public boolean delete(@PathVariable long id) throws Exception {
		return articlesService.delete(id);
	}
}
