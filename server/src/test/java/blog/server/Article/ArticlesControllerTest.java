package blog.server.Article;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import blog.server.Articles.Article;
import blog.server.Articles.ArticlesController;
import blog.server.Articles.ArticlesService;
import blog.server.Articles.exceptions.ArticleNotFoundException;
import blog.server.utils.APIResponseBody;
import blog.server.utils.JSON;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ArticlesController.class)
public class ArticlesControllerTest {
	@MockBean
	ArticlesService articlesService;

	@Autowired
	MockMvc mockMvc;

	@Test
	public void test_getById() throws Exception {
		Long testId = 1L;

		Article article = generateArticle(testId);
		String expectedResponse = new APIResponseBody().data(article).json();

		when(articlesService.get(testId)).thenReturn(article);

		mockMvc.perform(get("/api/articles/1"))
		.andExpect(status().isOk())
		.andExpect(content().json(expectedResponse));

	
		verify(articlesService).get(testId);
	}

	@Test
	public void test_getById_notFound() throws Exception {
		Long testId = 1L;
		
		// Mock the ArticlesService.get(id) method
		when(articlesService.get(testId)).thenThrow(new ArticleNotFoundException(testId.toString()));

		// Perform the GET request
		mockMvc.perform(get("/api/articles/1"))
		.andExpect(status().isNotFound());

		verify(articlesService).get(testId);
	}

	@Test
	public void test_getAll_returnsListOfArticles() throws Exception {
	
		List<Article> articlesList = generateArticleList(2);
		String expectedResponse = new APIResponseBody().data(articlesList).json();


		// Mock the ArticlesService.getAll() method
		when(articlesService.getAll()).thenReturn(articlesList);

		// Perform the GET request
		mockMvc.perform(get("/api/articles"))
		.andExpect(status().isOk())
		.andExpect(content().json(expectedResponse));

		verify(articlesService).getAll();
	}

	@Test
	public void test_getAll_emptyResponseWhenNoArticles() throws Exception {
		List<Article> articlesList = generateArticleList(0);
		APIResponseBody responseBody = new APIResponseBody().data(articlesList);

		// Mock the ArticlesService.getAll() method
		when(articlesService.getAll()).thenReturn(articlesList);

		// Perform the GET request
		mockMvc.perform(get("/api/articles"))
		.andExpect(status().isOk())
		.andExpect(content().json(JSON.write(responseBody)));

		verify(articlesService).getAll();
	}

	@Test
	public void test_add_returnsAddedArticle() throws Exception {
		final Article newArticle = generateArticle(123L);

		// Mock the ArticlesService.add(Article) method
		when(articlesService.add(any(Article.class))).thenReturn(newArticle);

		// Perform the POST request
		MvcResult result = mockMvc.perform(post("/api/articles")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newArticle.toString()))
		.andExpect(status().isCreated())
		.andReturn();

		// Deserialize response
		String response = result.getResponse().getContentAsString();
		APIResponseBody responseBody = JSON.parse(response, APIResponseBody.class);
		Object addedArticleObject = responseBody.getData();
		Article  addedArticle = JSON.parse(JSON.write(addedArticleObject), Article.class);

		//Assertions
		assertNotNull(addedArticle.getId());
		assertEquals(newArticle.getId(), addedArticle.getId());

		verify(articlesService).add(any(Article.class));
	}

	@Test
	public void test_delete_returnsDeletedArticle() throws Exception {
		final long id = 404L;
		final Article articleToDelete = generateArticle(id);

		String expectedResponse = new APIResponseBody().data(articleToDelete).message("Article deleted").json();

		when(articlesService.delete(id)).thenReturn(articleToDelete);

		MvcResult result = mockMvc.perform(delete("/api/articles/{id}", id))
			.andExpect(status().isOk())
			.andExpect(content().json(expectedResponse))
			.andReturn();

		verify(articlesService).delete(id);
	}

	private Article generateArticle(Long id) {
		List<String> keywords = Arrays.asList("react", "java", "spring boot", "rest");
		return new Article()
		// .setId(id)
		.setName("Article name " + id)
		.setAuthor("Author " + id)
		.setContent("Content: abcdefshdy rfubduhfd fuyfudfb ergebuw firugheiurhw  riguwrwrg wriwrghi")
		.setCategory("technology")
		.setKeywords(keywords);
	}

	private List<Article> generateArticleList(int size) {
		List<Article> articlesList = new ArrayList<>();
		
		for(long id = 1; id <= size; id++) {
			Article article = generateArticle(id);
			articlesList.add(article);
		}

		return articlesList;
	}
}