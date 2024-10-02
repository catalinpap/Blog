package blog.server.Users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.server.Users.exceptions.UserNotFoundException;

@Service
public class UsersService {

    private UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<User> getAll() {
        return usersRepository.findAll();
    }

    public User get(Long id) throws Exception {
        return usersRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id.toString()));
    }

    public User add(User user) throws Exception {
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
    
}
