package blog.server.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import blog.server.domain.Article;

@Repository
public class ArticlesRepositoryImpl implements ArticlesRepository {

	private List<Article> repository = new ArrayList<>();

	@Override
	public Optional<Article> get(Long id) {
		return repository.stream()
		.filter(article -> article.getId() == id)
		.findAny();
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
