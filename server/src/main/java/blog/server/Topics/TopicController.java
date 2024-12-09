package blog.server.Topics;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import blog.server.utils.ApiResponseBody;
import blog.server.utils.Const;

@RestController
@RequestMapping(Const.TOPIC_BASE_URL)
public class TopicController {
    
    @Autowired
    private TopicService topicService;

    @GetMapping("")
    public ResponseEntity<String> getAll(
        @RequestParam(value="page", required = false, defaultValue = Const.DEFAULT_PAGE_NUMBER) Integer page,
        @RequestParam(value="size", required = false, defaultValue = Const.DEFAULT_PAGE_SIZE) Integer size
    ) {

        PageRequest pageRequest = PageRequest.of(page, size);

        Page<Topic> topics = topicService.getAll(pageRequest);

        String responseBody = new ApiResponseBody()
            .data(topics)
            .json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);

    }

    // @GetMapping("/{id}")
    // public ResponseEntity<Category> getById(@PathVariable Long id) throws Exception {
    //     Category category = categoryService.get(id);
    //     return ResponseEntity
    //         .ok()
    //         .contentType(MediaType.APPLICATION_JSON)
    //         .body(category);
    // }

    @GetMapping("/{name}")
    public ResponseEntity<String> getByName(@PathVariable String name) throws Exception {
        Topic topic = topicService.get(name);

        String responseBody = new ApiResponseBody()
            .data(topic)
            .json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @PostMapping("")
    public ResponseEntity<String> add(@RequestBody Topic category) throws Exception {
        Topic addedTopic = topicService.add(category);
        URI topicUri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("{id}")
            .buildAndExpand(addedTopic.getId())
            .toUri();
        String responseBody = new ApiResponseBody()
            .data(addedTopic)
            .json();
        return ResponseEntity
            .created(topicUri)
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {
        Topic deletedTopic = topicService.delete(id);
        String responseBody = new ApiResponseBody()
            .data(deletedTopic)
            .json();
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody Topic category) throws Exception {
        Topic updatedTopic = topicService.update(category);
        String responseBody = new ApiResponseBody()
            .data(updatedTopic)
            .json();
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }
}
