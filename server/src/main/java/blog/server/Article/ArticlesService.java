package blog.server.Article;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.server.Article.exceptions.ArticleNotFoundException;
import blog.server.Article.repository.ArticlesRepository;

@Service
public class ArticlesService {

	// @Autowired
	private ArticlesRepository articlesRepository;

	@Autowired
	public ArticlesService(ArticlesRepository articlesRepository) {
		this.articlesRepository = articlesRepository;
	}

	public Article get(Long id) throws Exception {
		Article article = articlesRepository
			.findById(id)
			.orElseThrow(() -> new ArticleNotFoundException(id.toString()));

		return article;
	}

	public List<Article> getAll() {
		return articlesRepository.findAll();
	}

	public Article add(Article article) throws Exception {
		return articlesRepository.save(article);
	}

	public Article delete(Long id) throws Exception {
		Article article = articlesRepository
			.findById(id)
			.orElseThrow(() -> new ArticleNotFoundException(id.toString()));

		articlesRepository.deleteById(id);
	
		return article;
	}

	public Article update(Long id) throws Exception {
		// Article article = articlesRepository
		return null;
	}

	public List<Article> filterByCategory(String category) throws Exception {
		return articlesRepository.findAll()
			.stream()
			.filter((article) -> 
				article.getCategory().equals(category)
			).collect(Collectors.toList());
	}
	
}
