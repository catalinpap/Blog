package blog.server.Article.service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.server.Article.Article;
import blog.server.Article.exceptions.ArticleNotFoundException;
import blog.server.Article.repository.ArticlesRepository;
import blog.server.Article.repository.ArticlesRepositoryJpa;

@Service
public class ArticlesServiceImpl implements ArticlesService {

	// @Autowired
	private ArticlesRepositoryJpa articlesRepository;

	@Autowired
	public ArticlesServiceImpl(ArticlesRepositoryJpa articlesRepository) {
		this.articlesRepository = articlesRepository;
	}

	@Override
	public Article get(Long id) throws Exception {
		Article article = articlesRepository
			.findById(id)
			.orElseThrow(() -> new ArticleNotFoundException(id.toString()));

		return article;
	}

	@Override
	public List<Article> getAll() {
		return articlesRepository.findAll();
	}

	@Override
	public Article add(Article article) throws Exception {
		return articlesRepository.save(article);
	}

	@Override
	public Article delete(Long id) throws Exception {
		Article article = articlesRepository
			.findById(id)
			.orElseThrow(() -> new ArticleNotFoundException(id.toString()));

		articlesRepository.deleteById(id);
	
		return article;
	}

	@Override
	public Article update(Long id) throws Exception {
		// Article article = articlesRepository
		return null;
	}

	@Override
	public List<Article> filterByCategory(String category) throws Exception {
		return articlesRepository.findAll()
			.stream()
			.filter((article) -> 
				article.getCategory().equals(category)
			).collect(Collectors.toList());
	}
	
}
