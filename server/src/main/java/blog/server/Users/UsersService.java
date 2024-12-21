package blog.server.Users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import blog.server.Users.exceptions.UserNotFoundException;
import blog.server.utils.EntityUtils;

@Service
public class UsersService implements UserDetailsService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsersService(UsersRepository usersRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAll() {
        return usersRepository.findAll();
    }

    public User get(Long id) throws Exception {
        return usersRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id.toString()));
    }

    public User getByUsername(String username) throws Exception {
        return usersRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
    }

    public User add(User user) throws Exception {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }

    public User delete(Long id) throws Exception {
        User deletedUser = usersRepository
            .findById(id)
            .orElseThrow(() -> new UserNotFoundException(id.toString()));

        usersRepository.deleteById(id);

        return deletedUser;
    }

    // TODO: BUG: when an user is updated, its corresponding author entity (if it exists) is not updated
    // Update the author too, or give up entirely on the author entity and stick only with the user
    public User update(User updateRequest) throws Exception {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = this.getByUsername(username);

        Long userId = updateRequest.getId();

        if(userId != user.getId()) throw new Exception(String.format("Not allowed to modify user with id = %s", userId));
        
        User originalUser = usersRepository
            .findById(userId)
            .orElseThrow(() -> new UserNotFoundException(userId.toString()));

        User updatedUser = EntityUtils.applyUpdates(originalUser, updateRequest);

        return usersRepository.save(updatedUser);
    }

    public Boolean exists(Long id) {
        return usersRepository.existsById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(
                String.format("User with username=%s not found!", username)
            ));
    }
}
