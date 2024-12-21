package blog.server.Users;

public class UserDTO {
    private Long id;
    private String username;
    private String displayName;
    private String email;

    public Long getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getDisplayName() {
        return this.displayName;
    }

    public String getEmail() {
        return this.email;
    }

    public UserDTO setId(final Long id) {
        this.id = id;
        return this;
    }

    public UserDTO setUsername(final String username) {
        this.username = username;
        return this;
    }
    public UserDTO setDisplayName(final String displayName) {
        this.displayName = displayName;
        return this;
    }

    public UserDTO setEmail(final String email) {
        this.email = email;
        return this;
    }
    
}
