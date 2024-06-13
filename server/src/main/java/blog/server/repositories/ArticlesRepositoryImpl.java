package blog.server.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import blog.server.domains.Article;

@Repository
public class ArticlesRepositoryImpl implements ArticlesRepository {

	private List<Article> repository = new ArrayList<>();

	@Override
	public Article get(Long id) {
		return repository.stream()
		.filter(article -> article.getId() == id)
		.findAny()
		.orElse(null);
	}

	@Override
	public List<Article> getAll() {
		return repository;
	}

	@Override
	public Article add(Article article) throws Exception {
		boolean isAdded = repository.add(article);

		if(!isAdded) throw new Exception("Repository Exception: Could not add article to repository");

		return article;
	}

	@Override
	public boolean delete(Long id) {
		return repository.removeIf(article -> article.getId() == id);
	}
	
}
