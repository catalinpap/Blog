package blog.server.Users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import blog.server.Users.exceptions.UserNotFoundException;

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
        return usersRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username.toString()));
    }

    public User add(User user) throws Exception {
        System.out.println(passwordEncoder.encode(user.getPassword()));
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

    public User update(User updatedUser) throws Exception {
        Long userId = updatedUser.getId();
        
        if(!usersRepository.existsById(userId)) throw new UserNotFoundException(userId.toString());

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
