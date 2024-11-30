package blog.server.DTO;

public class UserDTO {
    private Long id;
    private String username;
    private String displayName;

    public Long getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getDisplayName() {
        return this.displayName;
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
}
