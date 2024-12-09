package blog.server.Topics;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import blog.server.Topics.exceptions.TopicNotFoundException;

@Service
public class TopicService {
    private TopicRepository topicRepository;

    @Autowired
    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<Topic> getAll() {
        return this.topicRepository.findAll();
    }

    public Page<Topic> getAll(PageRequest pageRequest) {
        return this.topicRepository.findAll(pageRequest);
    }

    public Topic get(final Long id) throws Exception {
        return this.topicRepository
            .findById(id)
            .orElseThrow(() -> new TopicNotFoundException(id.toString()));
    }

    public Topic get(final String name) throws Exception {
        return this.topicRepository
            .findByName(name)
            .orElseThrow(() -> new TopicNotFoundException(name.toString()));
    }

    public Topic add(final Topic category) {
        return this.topicRepository.save(category);
    }

    public Topic delete(final Long id) throws Exception {
        Topic deletedTopic = topicRepository
            .findById(id)
            .orElseThrow(() -> new TopicNotFoundException(id.toString()));

            topicRepository.deleteById(id);

        return deletedTopic;
    }

    public Topic update(final Topic topic) throws Exception {
        this.topicRepository
            .findById(topic.getId())
            .orElseThrow(() -> new TopicNotFoundException(topic.getId().toString()));

        return topicRepository.save(topic);
    }

}
