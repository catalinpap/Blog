package blog.server.Articles;

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

	public ArticleDTO get(Long id) throws Exception {
		ArticleDTO article = articlesRepository
			.findById(id)
			.map(this::mapToDTO)
			.orElseThrow(() -> new ArticleNotFoundException(id.toString()));

		return article;
	}

	public List<ArticleDTO> getAll() {
		return articlesRepository
			.findAll()
			.stream()
			.map(this::mapToDTO)
			.collect(Collectors.toList());
	}

	public Page<ArticleDTO> getAll(ArticleFilter filter, PageRequest pageRequest) {
		Specification<Article> specifications = ArticlesSpecs.filterBy(filter);
		return articlesRepository
			.findAll(specifications, pageRequest)
			.map(this::mapToDTO);
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

	public Article update(Article updatedArticle) throws Exception {
		Long articleId = updatedArticle.getId();

		if(!articlesRepository.existsById(articleId)) throw new ArticleNotFoundException(articleId.toString());

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

		// TODO: Learn how to configure @ManyToOne relations then this won't be necessary
		Author author = new Author();
		try {
			// author = authorsService.get(article.getAuthorId());
		} catch (Exception e) {
			// TODO: Auto-generated catch block
			e.printStackTrace();
		}
		
		// dto.setAuthor(author);

		return dto;
	}
}
