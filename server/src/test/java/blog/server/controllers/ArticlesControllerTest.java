package blog.server.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
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

import com.fasterxml.jackson.databind.ObjectMapper;

import blog.server.Exceptions.ArticleNotFoundException;
import blog.server.controller.ArticlesController;
import blog.server.domains.Article;
import blog.server.services.ArticlesService;

@ExtendWith(SpringExtension.class)
@WebMvcTest(ArticlesController.class)
public class ArticlesControllerTest {
	@MockBean
	ArticlesService articlesService;

	@Autowired
	MockMvc mockMvc;

    ObjectMapper objectMapper = new ObjectMapper();

	@Test
	public void test_getById() throws Exception {
		Long testId = 1L;

		Article article = generateArticle(testId);

		when(articlesService.get(testId)).thenReturn(article);

		mockMvc.perform(get("/api/articles/1"))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.id").value(testId))
		.andExpect(jsonPath("$.name").value(article.getName()))
		.andExpect(jsonPath("$.author").value(article.getAuthor()));

	
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


		// Mock the ArticlesService.getAll() method
		when(articlesService.getAll()).thenReturn(articlesList);

		// Perform the GET request
		mockMvc.perform(get("/api/articles"))
		.andExpect(status().isOk())
		.andExpect(content().json(articlesList.toString()));

		verify(articlesService).getAll();
	}

	@Test
	public void test_getAll_emptyResponseWhenNoArticles() throws Exception {
		List<Article> articlesList = generateArticleList(0);

		// Mock the ArticlesService.getAll() method
		when(articlesService.getAll()).thenReturn(articlesList);

		// Perform the GET request
		mockMvc.perform(get("/api/articles"))
		.andExpect(status().isOk())
		.andExpect(content().json(articlesList.toString()));

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
		String res = result.getResponse().getContentAsString();
		Article addedArticle = objectMapper.readValue(res, Article.class);

		//Assertions
		assertNotNull(addedArticle.getId());
		assertEquals(newArticle.getId(), addedArticle.getId());

		verify(articlesService).add(any(Article.class));
	}

	@Test
	public void test_delete_returnsDeletedArticle() throws Exception {
		final long id = 404L;
		final Article articleToDelete = generateArticle(id);

		// when(articlesService.delete(id)).thenReturn(articleToDelete);

		//MvcResult result = mockMvc.perform(delete("/api/articles/{id}"))
	}

	private Article generateArticle(Long id) {
		return new Article()
		.setId(id)
		.setName("Article name " + id)
		.setAuthor("Author " + id);
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