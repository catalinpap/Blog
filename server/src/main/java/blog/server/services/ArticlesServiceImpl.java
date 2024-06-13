package blog.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.server.Exceptions.ArticleNotFoundException;
import blog.server.domains.Article;
import blog.server.repositories.ArticlesRepository;

@Service
public class ArticlesServiceImpl implements ArticlesService {

	@Autowired
	private ArticlesRepository articlesRepository;

	@Autowired
	public ArticlesServiceImpl(ArticlesRepository articlesRepository) {
		this.articlesRepository = articlesRepository;
	}

	@Override
	public Article get(Long id) throws Exception {
		Article article = articlesRepository.get(id);

		if (article == null) throw new ArticleNotFoundException(id.toString());

		return article;
	}

	@Override
	public List<Article> getAll() {
		return articlesRepository.getAll();
	}

	@Override
	public Article add(Article article) throws Exception {
		return articlesRepository.add(article);
	}

	@Override
	public boolean delete(Long id) throws Exception {
		Article article = articlesRepository.get(id);
		if (article == null) throw new ArticleNotFoundException(id.toString());

		boolean isDeleted = articlesRepository.delete(id);
		
		return isDeleted;
	}
	
}
