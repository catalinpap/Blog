package blog.server.Articles;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

public class ArticlesSpecs {

    private static final String CATEGORY_REF = "categoryRef"; // The Category object field of Article class
    private static final String CATEGORY_NAME = "name"; // The name field of the Category class 
    private static final String KEYWORDS = "keywords"; // The keywords field of the Article class
    private static final String AUTHOR_ID = "authorId";

    public static Specification<Article> filterBy(ArticleFilter filter) {
        return Specification
            .where(hasCategory(filter.getCategory()))
            .and(hasKeywords(filter.getKeywords()))
            .and(hasAuthorId(filter.getAuthorId()));
    }

    private static Specification<Article> hasCategory(String category) {
        return (root, query, builder) ->
            (category == null || category.isEmpty())
                ? builder.conjunction()
                : builder.equal(root.join(CATEGORY_REF).get(CATEGORY_NAME), category);
        
    }

    private static Specification<Article> hasKeywords(List<String> keywords) {
        return (root, query, builder) -> {
            if (keywords == null || keywords.isEmpty()) {
                return builder.conjunction();
            }

            Predicate[] predicates = keywords.stream()
                .map(keyword ->  builder.like(root.get(KEYWORDS).as(String.class), "%" + keyword + "%"))
                .toArray(Predicate[]::new);

            return builder.or(predicates);
        };
    }

    private static Specification<Article> hasAuthorId(Long authorId) {
        return (root, query, builder) -> 
            (authorId == null)
            ? builder.conjunction()
            : builder.equal(root.get(AUTHOR_ID), authorId);
    }
}

