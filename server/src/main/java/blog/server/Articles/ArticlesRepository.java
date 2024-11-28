package blog.server.Articles;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticlesRepository extends JpaRepository<Article, Long>, JpaSpecificationExecutor<Article> {
    
    // TODO: this override is neccesary due to FetchType.EAGER in Article entity. Maybe find a way to fix it
    @Modifying
    @Query("DELETE FROM Article a WHERE a.id = :id")
    void deleteById(@Param("id") @NonNull Long id);
}
