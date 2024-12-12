package blog.server.Articles;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

public class ArticlesSpecs {

    private static final String TOPIC_REF = "topicRef"; // The Category object field of Article class
    private static final String TOPIC_NAME = "name"; // The name field of the Category class 
    private static final String KEYWORDS = "keywords"; // The keywords field of the Article class
    private static final String AUTHOR_ID = "authorId";

    public static Specification<Article> filterBy(ArticleFilter filter) {
        return Specification
            .where(hasTopic(filter.getCategory()))
            .and(hasKeywords(filter.getKeywords()))
            .and(hasAuthorId(filter.getAuthorId()));
    }

    private static Specification<Article> hasTopic(String topic) {
        return (root, query, builder) ->
            (topic == null || topic.isEmpty())
                ? builder.conjunction()
                : builder.equal(root.join(TOPIC_REF).get(TOPIC_NAME), topic);
        
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

