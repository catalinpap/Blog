package blog.server.services;

import java.util.List;

import blog.server.domains.Article;

public interface ArticlesService {
	public Article get(Long id) throws Exception;
	public List<Article> getAll();
	public Article add(Article article) throws Exception;
	public boolean delete(Long id) throws Exception;
}
