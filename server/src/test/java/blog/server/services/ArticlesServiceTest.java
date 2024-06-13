package blog.server.services;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import blog.server.Exceptions.ArticleNotFoundException;
import blog.server.domains.Article;
import blog.server.repositories.ArticlesRepository;

@ExtendWith(MockitoExtension.class)
public class ArticlesServiceTest {
	Long testId = 1L;
	String testName = "Demo Article Name";
	String testAuthor = "Demo Author";

	@Mock
	ArticlesRepository articlesRepository;

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
		

		when(articlesRepository.get(testId)).thenReturn(mockArticle);

		Article foundArticle = articlesService.get(testId);

		Assertions.assertThat(foundArticle).isEqualTo(mockArticle);

		verify(articlesRepository).get(testId);
	}

	@Test
	public void getArticleByIdNotFound() {
		ArticlesService articlesService = new ArticlesServiceImpl(articlesRepository);

		when(articlesRepository.get(testId)).thenReturn(null);

		assertThrows(ArticleNotFoundException.class, () -> {
			articlesService.get(testId);
		});

		verify(articlesRepository).get(testId);
	}
}
