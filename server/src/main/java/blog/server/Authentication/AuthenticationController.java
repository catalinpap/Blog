package blog.server.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import blog.server.utils.APIResponseBody;
import jakarta.servlet.http.HttpServletRequest;

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

	@GetMapping("/user")
	public ResponseEntity<UserDetails> getUser(@AuthenticationPrincipal UserDetails user) {
		return ResponseEntity
			.ok()
			.contentType(MediaType.APPLICATION_JSON)
			.body(user);
	}

	@PostMapping("/login")
	public boolean login(@RequestBody LoginRequest credentials) {
		try {
			Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(credentials.user(), credentials.password())
			);
			return authentication.isAuthenticated();
		} catch (AuthenticationException e) {
			return false;
		}
	}

	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest req) {
		SecurityContextLogoutHandler handler = new SecurityContextLogoutHandler();
		handler.logout(req, null, null);
		return ResponseEntity
			.ok()
			.contentType(MediaType.APPLICATION_JSON)
			.body(new APIResponseBody().message("logged out"));
	}
}
