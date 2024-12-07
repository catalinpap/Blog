package blog.server.Categories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import blog.server.Categories.exceptions.CategoryNotFoundException;

@Service
public class CategoryService {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAll() {
        return this.categoryRepository.findAll();
    }

    public Page<Category> getAll(PageRequest pageRequest) {
        return this.categoryRepository.findAll(pageRequest);
    }

    public Category get(final Long id) throws Exception {
        return this.categoryRepository
            .findById(id)
            .orElseThrow(() -> new CategoryNotFoundException(id.toString()));
    }

    public Category get(final String name) throws Exception {
        return this.categoryRepository
            .findByName(name)
            .orElseThrow(() -> new CategoryNotFoundException(name.toString()));
    }

    public Category add(final Category category) {
        return this.categoryRepository.save(category);
    }

    public Category delete(final Long id) throws Exception {
        Category deletedCategory = categoryRepository
            .findById(id)
            .orElseThrow(() -> new CategoryNotFoundException(id.toString()));

            categoryRepository.deleteById(id);

        return deletedCategory;
    }

    public Category update(final Category category) throws Exception {
        this.categoryRepository
            .findById(category.getId())
            .orElseThrow(() -> new CategoryNotFoundException(category.getId().toString()));

        return categoryRepository.save(category);
    }

}
