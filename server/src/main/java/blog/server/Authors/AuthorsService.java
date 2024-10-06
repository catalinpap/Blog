package blog.server.Authors;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import blog.server.Authors.exceptions.AuthorNotFoundException;

@Service
public class AuthorsService {
    
    private AuthorsRepository authorsRepository;

    @Autowired
    public AuthorsService(AuthorsRepository authorsRepository) {
        this.authorsRepository = authorsRepository;
    }

    public List<Author> getAll() {
        return authorsRepository
            .findAll();
    }

    public Author get(Long id) throws Exception {
        return authorsRepository.findById(id).orElseThrow(() -> new AuthorNotFoundException(id.toString()));
    }

    public Author add(Author author) throws Exception {
        return authorsRepository.save(author);
    }

    public Author delete(Long id) throws Exception {
        Author deletedAuthor = authorsRepository
            .findById(id)
            .orElseThrow(() -> new AuthorNotFoundException(id.toString()));

        authorsRepository.deleteById(id);

        return deletedAuthor;
    }

    public Author update(Author updatedAuthor) throws Exception {
        Long authorId = updatedAuthor.getId();

        if(!authorsRepository.existsById(authorId)) throw new AuthorNotFoundException(authorId.toString());
        
        return authorsRepository.save(updatedAuthor);
    }

    public Boolean existsByUsername(String username) {
        return authorsRepository.existsByUsername(username);
    }
}
