package blog.server.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import blog.server.Articles.exceptions.ArticleNotFoundException;
import blog.server.Authors.exceptions.AuthorNotFoundException;
import blog.server.Topics.exceptions.TopicNotFoundException;
import blog.server.Users.exceptions.UserNotFoundException;
import blog.server.utils.ApiResponseBody;

@ControllerAdvice
public class ExceptionHandlers extends ResponseEntityExceptionHandler {
	@ExceptionHandler(ArticleNotFoundException.class)
	public ResponseEntity<String> handleArticleNotFound (ArticleNotFoundException exception, WebRequest request ) {
			ApiResponseBody responseBody = new ApiResponseBody()
				.message(String.format("Article with id=%s does not exist!", exception.getMessage()));
			return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.contentType(MediaType.APPLICATION_JSON)
				.body(responseBody.json());
	}

	@ExceptionHandler(AuthorNotFoundException.class)
	public ResponseEntity<String> handleAuthorNotFound (AuthorNotFoundException exception, WebRequest request ) {
			ApiResponseBody responseBody = new ApiResponseBody()
				.message(String.format("Author with id=%s does not exist!", exception.getMessage()));
			return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.contentType(MediaType.APPLICATION_JSON)
				.body(responseBody.json());
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<String> handleUserNotFound (UserNotFoundException exception, WebRequest request ) {
			ApiResponseBody responseBody = new ApiResponseBody()
				.message(String.format("User with id=%s does not exist!", exception.getMessage()));
			return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.contentType(MediaType.APPLICATION_JSON)
				.body(responseBody.json());
	}

	@ExceptionHandler(TopicNotFoundException.class)
	public ResponseEntity<String> handleTopicNotFound (TopicNotFoundException exception, WebRequest request ) {
			ApiResponseBody responseBody = new ApiResponseBody()
				.message(String.format("Category with name=%s does not exist!", exception.getMessage()));
			return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.contentType(MediaType.APPLICATION_JSON)
				.body(responseBody.json());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleGenericException (Exception exception, WebRequest request) {
		ApiResponseBody responseBody = new ApiResponseBody()
			.data(exception.getStackTrace())
			.message(exception.getMessage());

		return ResponseEntity
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.contentType(MediaType.APPLICATION_JSON)
			.body(responseBody.json());
	}
}
