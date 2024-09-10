package blog.server.Articles;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import blog.server.Articles.exceptions.ArticleNotFoundException;
import blog.server.Authors.Author;
import blog.server.DTO.ArticleDTO;

@Service
public class ArticlesService {

	// @Autowired
	private ArticlesRepository articlesRepository;


	@Autowired
	public ArticlesService(ArticlesRepository articlesRepository) {
		this.articlesRepository = articlesRepository;
	}

	public Article get(Long id) throws Exception {
		Article article = articlesRepository
			.findById(id)
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
		return articlesRepository.save(article);
	}

	public Article delete(Long id) throws Exception {
		Article article = articlesRepository
			.findById(id)
			.orElseThrow(() -> new ArticleNotFoundException(id.toString()));

		articlesRepository.deleteById(id);
	
		return article;
	}

	public Article update(Long id) throws Exception {
		// Article article = articlesRepository
		return null;
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

		//TODO: get author by id from AuthorsRpository 
		Author dumbAuthor = new Author()
			.name("Piedone Hahalalelor");
		
		dto.setAuthor(dumbAuthor);

		return dto;
	}
}
