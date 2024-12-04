package blog.server.Categories;

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
@RequestMapping(Const.CATEGORY_BASE_URL)
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<String> getAll() {

        List<Category> categories = categoryService.getAll();

        String responseBody = new ApiResponseBody()
            .data(categories)
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
        Category category = categoryService.get(name);

        String responseBody = new ApiResponseBody()
            .data(category)
            .json();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @PostMapping("")
    public ResponseEntity<String> add(@RequestBody Category category) throws Exception {
        Category addedCategory = categoryService.add(category);
        URI categoryUri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("{id}")
            .buildAndExpand(addedCategory.getId())
            .toUri();
        String responseBody = new ApiResponseBody()
            .data(addedCategory)
            .json();
        return ResponseEntity
            .created(categoryUri)
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws Exception {
        Category deletedCategory = categoryService.delete(id);
        String responseBody = new ApiResponseBody()
            .data(deletedCategory)
            .json();
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody Category category) throws Exception {
        Category updatedCategory = categoryService.update(category);
        String responseBody = new ApiResponseBody()
            .data(updatedCategory)
            .json();
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }
}
