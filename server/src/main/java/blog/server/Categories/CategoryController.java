package blog.server.Categories;

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

import blog.server.utils.Const;

@RestController
@RequestMapping(Const.CATEGORY_BASE_URL)
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<List<Category>> getAll() {

        List<Category> categories = categoryService.getAll();

        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(categories);

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
    public ResponseEntity<Category> getByName(@PathVariable String name) throws Exception {
        Category category = categoryService.get(name);
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(category);
    }

    @PostMapping("")
    public ResponseEntity<Category> add(@RequestBody Category category) throws Exception {
        Category addedCategory = categoryService.add(category);
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(addedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> delete(@PathVariable Long id) throws Exception {
        Category deletedCategory = categoryService.delete(id);
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(deletedCategory);
    }

    @PutMapping("")
    public ResponseEntity<Category> update(@RequestBody Category category) throws Exception {
        Category updatedCategory = categoryService.update(category);
        return ResponseEntity
            .ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(updatedCategory);
    }
}
