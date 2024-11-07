package blog.server.Articles;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import blog.server.Articles.exceptions.ArticleNotFoundException;
import blog.server.Authors.Author;
import blog.server.Authors.AuthorsService;
import blog.server.DTO.ArticleDTO;
import blog.server.Users.UsersService;

@Service
public class ArticlesService {

	private ArticlesRepository articlesRepository;
	private AuthorsService authorsService;
	private UsersService usersService;

	@Autowired
	public ArticlesService(ArticlesRepository articlesRepository, AuthorsService authorsService, UsersService usersService) {
		this.articlesRepository = articlesRepository;
		this.authorsService = authorsService;
		this.usersService = usersService;
	}

	public Article get(Long id) throws Exception {
		Article article = articlesRepository
			.findById(id)
			.orElseThrow(() -> new ArticleNotFoundException(id.toString()));

		return article;
	}

	public List<Article> getAll() {
		return articlesRepository
			.findAll()
			.stream()
			.collect(Collectors.toList());
	}

	public Page<Article> getAll(ArticleFilter filter, PageRequest pageRequest) {
		Specification<Article> specifications = ArticlesSpecs.filterBy(filter);
		return articlesRepository
			.findAll(specifications, pageRequest);
	}

	public Article add(Article article) throws Exception {
		String authorUser = SecurityContextHolder.getContext().getAuthentication().getName();
		
		Long userId = usersService.getByUsername(authorUser).getId();
		article.setAuthorId(userId);

		if (!authorsService.existsByUsername(authorUser)) {
			authorsService.add(new Author()
				.fromUser(usersService.get(userId)));
		}
		
		return articlesRepository.save(article);
	}

	public Article delete(Long id) throws Exception {
		Article article = articlesRepository
			.findById(id)
			.orElseThrow(() -> new ArticleNotFoundException(id.toString()));

		articlesRepository.deleteById(id);
	
		return article;
	}

	public Article update(Article updateRequest) throws Exception {
		Long articleId = updateRequest.getId();

		Article article = articlesRepository
			.findById(articleId)
			.orElseThrow(() -> new ArticleNotFoundException(articleId.toString()));

		
		// Merge properties from updateRequest and article
		Article updatedArticle = applyUpdates(article, updateRequest);

		return articlesRepository.save(updatedArticle);
	}

	public List<Article> filterByCategory(String category) throws Exception {
		return articlesRepository.findAll()
			.stream()
			.filter((article) -> 
				article.getCategory().equals(category)
			).collect(Collectors.toList());
	}
	

	private ArticleDTO mapToDTO(Article article) {
		ArticleDTO dto = new ArticleDTO().from(article);
		return dto;
	}

	// TODO: move it to the helpers package and make it generic, so it applies to any class
	private Article applyUpdates(Article original, Article updates) {
		Field[] fields = Article.class.getDeclaredFields();

		for(Field field : fields) {
			field.setAccessible(true);
			try {
				Object newValue = field.get(updates);
				if(newValue != null) 
					field.set(original, newValue);
			} catch (IllegalAccessException e) {
				throw new RuntimeException("Error updating field: " + field.getName(), e);
			}
		}

		return original;
	}
}
