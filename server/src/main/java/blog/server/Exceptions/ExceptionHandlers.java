package blog.server.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import blog.server.utils.APIResponseBody;

@ControllerAdvice
public class ExceptionHandlers extends ResponseEntityExceptionHandler {
	@ExceptionHandler(ArticleNotFoundException.class)
	public ResponseEntity<String> handleArticleNotFound (ArticleNotFoundException exception, WebRequest request ) {
			APIResponseBody responseBody = new APIResponseBody()
				.message(String.format("Article with id=%s does not exist!", exception.getMessage()));
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody.json());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleGenericException (Exception exception, WebRequest request) {
		APIResponseBody responseBody = new APIResponseBody()
			.data(exception.getStackTrace())
			.message(exception.getMessage());

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody.json());
	}
}
