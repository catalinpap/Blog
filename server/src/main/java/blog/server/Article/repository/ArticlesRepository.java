package blog.server.Article.repository;

import java.util.List;
import java.util.Optional;

import blog.server.Article.Article;


public interface ArticlesRepository {
	public Optional<Article> get(Long id);
	public List<Article> getAll();
	public Article add(Article article) throws Exception;
	public boolean delete(Long id);
	public Article update(Article article);
}
