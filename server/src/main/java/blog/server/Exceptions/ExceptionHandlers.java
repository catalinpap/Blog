package blog.server.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import blog.server.domains.Article;

@ControllerAdvice
public class ExceptionHandlers extends ResponseEntityExceptionHandler {
	@ExceptionHandler(ArticleNotFoundException.class)
	public ResponseEntity<Article> handleArticleNotFound (
		ArticleNotFoundException exception,
		WebRequest request ) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
