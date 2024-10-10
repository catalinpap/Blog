package blog.server.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.util.SerializationUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blog.server.utils.APIResponseBody;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Base64;

@RestController
@RequestMapping("/api")
@EnableWebSecurity
public class AuthenticationController {

	private AuthenticationManager authenticationManager;

	@Lazy
	@Autowired
    public AuthenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/session")
	public ResponseEntity<Object> getAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return ResponseEntity
			.ok()
			.contentType(MediaType.APPLICATION_JSON)
			.body(authentication);
	}

	@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
	@PostMapping("/me")
	public ResponseEntity<UserDetails> getUser(@AuthenticationPrincipal UserDetails user) {
		return ResponseEntity
			.ok()
			.contentType(MediaType.APPLICATION_JSON)
			.body(user);
	}

	@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest credentials, HttpServletResponse response, HttpServletRequest request) {
		try {
			Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(credentials.user(), credentials.password())
			);

			// TODO: Temporary solution for generating a Base64 token to use with Basic Auth
			// ! To be replaced with JWT token authorization in the future !
			String credentialString = credentials.user().toString() + ":" + credentials.password().toString();
			String authToken = Base64.getEncoder().encodeToString(credentialString.getBytes());

			setAuthCookie(response, authentication.isAuthenticated());
			setAuthTokenCookie(response, authToken, false);

			String responseBody = new APIResponseBody()
				.data(authentication.getName())
				.message("Successful login!")
				.json();

			return ResponseEntity
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(responseBody);

		} catch (BadCredentialsException e) {
			setAuthCookie(response, false);

			String responseBody = new APIResponseBody()
				.data(false)
				.message("Invalid Credentials!")
				.json();

			return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.contentType(MediaType.APPLICATION_JSON)
				.body(responseBody);

		} catch (AuthenticationException e) {
			setAuthCookie(response, false);
			String responseBody = new APIResponseBody()
				.data(false)
				.message("Authentication Failed!")
				.json();

			return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.contentType(MediaType.APPLICATION_JSON)
				.body(responseBody);

		} catch (Exception e) {
			String responseBody = new APIResponseBody()
				.data(false)
				.message("An error occured. Try again later")
				.json();

			return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.contentType(MediaType.APPLICATION_JSON)
				.body(responseBody);
		}
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
		return ResponseEntity
			.ok()
			.contentType(MediaType.APPLICATION_JSON)
			.body(new APIResponseBody().message("logged out"));
	}

	private void setAuthCookie(HttpServletResponse response, boolean cookieValue) {
		Cookie authCookie = new Cookie("authenticated", cookieValue ? "true" : "false");
			authCookie.setPath("/");
			// authCookie.setMaxAge(-1);
			// authCookie.setDomain("localhost");
			// authCookie.setHttpOnly(false);
			// authCookie.setSecure(false);


		response.addCookie(authCookie);
	}

	private void setAuthTokenCookie(HttpServletResponse response, String cookieValue, Boolean delete) {
		Cookie authCookie = new Cookie("authToken", cookieValue);
		authCookie.setPath("/");

		if(delete) authCookie.setMaxAge(0);

		response.addCookie(authCookie);
	}
}
