package blog.server.service;

import java.util.List;

import blog.server.domain.Article;

public interface ArticlesService {
	public Article get(Long id) throws Exception;
	public List<Article> getAll();
	public Article add(Article article) throws Exception;
	public Article delete(Long id) throws Exception;
}
