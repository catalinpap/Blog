package blog.server.Article;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import blog.server.Article.Article;
import blog.server.Article.exceptions.ArticleNotFoundException;
import blog.server.Article.repository.ArticlesRepository;
import blog.server.Article.repository.ArticlesRepositoryJpa;
import blog.server.Article.service.ArticlesService;
import blog.server.Article.service.ArticlesServiceImpl;

@ExtendWith(MockitoExtension.class)
public class ArticlesServiceTest {
	Long testId = 1L;
	String testName = "Demo Article Name";
	String testAuthor = "Demo Author";

	@Mock
	ArticlesRepositoryJpa articlesRepository;

	@BeforeEach
	public void init(){
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void getArticleById() throws Exception {
		ArticlesService articlesService = new ArticlesServiceImpl(articlesRepository);
		Article mockArticle = new Article()
			.setId(testId)
			.setAuthor(testAuthor)
			.setName(testName);
		

		when(articlesRepository.findById(testId)).thenReturn(Optional.of(mockArticle));

		Article foundArticle = articlesService.get(testId);

		Assertions.assertThat(foundArticle).isEqualTo(mockArticle);

		verify(articlesRepository).findById(testId);
	}

	@Test
	public void getArticleByIdNotFound() {
		ArticlesService articlesService = new ArticlesServiceImpl(articlesRepository);

		when(articlesRepository.findById(testId)).thenReturn(null);

		assertThrows(ArticleNotFoundException.class, () -> {
			articlesService.get(testId);
		});

		verify(articlesRepository).findById(testId);
	}
}
