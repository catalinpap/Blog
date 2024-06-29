package blog.server.Article.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import blog.server.Article.Article;

public interface ArticlesRepositoryJpa extends JpaRepository<Article, Long> {
    
}
