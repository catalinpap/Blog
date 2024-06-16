package blog.server.repository;

import java.util.List;
import java.util.Optional;

import blog.server.domain.Article;


public interface ArticlesRepository {
	public Optional<Article> get(Long id);
	public List<Article> getAll();
	public Article add(Article article) throws Exception;
	public boolean delete(Long id);
}
