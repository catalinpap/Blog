package blog.server.Comments;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentsService {
    private CommentsRepository commentsRepository;

    @Autowired
    public CommentsService(CommentsRepository commentsRepository) {
        this.commentsRepository = commentsRepository;
    }

    public List<Comment> getAll() {
        return this.commentsRepository.findAll();
    }

    public Comment get(final Long id) throws Exception {
        return this.commentsRepository.findById(id).orElseThrow();
    }

    public Comment add(final Comment comment) {
        return this.commentsRepository.save(comment);
    }

    public Comment delete(final Long id) throws Exception {
        Comment deletedComment = this.commentsRepository
            .findById(id)
            .orElseThrow();

        this.commentsRepository.deleteById(id);
        return deletedComment;
    }

    public Comment update(final Comment comment) throws Exception {
        this.commentsRepository
            .findById(comment.getId())
            .orElseThrow();

        return this.commentsRepository.save(comment);
    }
}
