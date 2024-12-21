package blog.server.Users;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import blog.server.utils.ApiResponseBody;
import blog.server.utils.Const;

@RestController
@RequestMapping(Const.USERS_BASE_URL)
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping("")
    public ResponseEntity<String> getAll() {
        List<User> users = usersService.getAll();

        String reponseBody = new ApiResponseBody()
            .data(users)
            .json();
        
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(reponseBody);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> get(@PathVariable Long id) throws Exception {
        User user = usersService.get(id);
        String responseBody = new ApiResponseBody()
            .data(user)
            .json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @GetMapping("/@{username}")
    public ResponseEntity<String> get(@PathVariable String username) throws Exception {
        User user = usersService.getByUsername(username);
        String responseBody = new ApiResponseBody()
            .data(user)
            .json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @PostMapping("")
    public ResponseEntity<String> add(@RequestBody User user) throws Exception {
        User addedUser = usersService.add(user);
        String responseBody = new ApiResponseBody()
            .data(addedUser)
            .message("User created")
            .json();
        
        URI userURI = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(addedUser.getId())
			.toUri();
        
        return ResponseEntity
            .created(userURI)
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {
        User deletedUser = usersService.delete(id);

        String responseBody = new ApiResponseBody()
            .data(deletedUser)
            .message("User deleted")
            .json();
        
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody User user) throws Exception {
        User updatedUser = usersService.update(user);

        String responseBody = new ApiResponseBody()
            .data(updatedUser)
            .message("User updated")
            .json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }
}
