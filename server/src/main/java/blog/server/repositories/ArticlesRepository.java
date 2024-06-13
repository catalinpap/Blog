package blog.server.repositories;

import java.util.List;

import blog.server.domains.Article;


public interface ArticlesRepository {
	public Article get(Long id);
	public List<Article> getAll();
	public Article add(Article article) throws Exception;
	public boolean delete(Long id);
}
