package blog.server.Articles.Likes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import blog.server.Articles.Article;
import blog.server.Articles.ArticlesService;
import blog.server.Users.User;
import blog.server.Users.UsersService;

@Service
public class ArticleLikesService {

    private ArticleLikesRepository articleLikesRepository;
    private UsersService usersService;
    private ArticlesService articlesService;

    @Autowired
    public ArticleLikesService(ArticleLikesRepository articleLikesRepository, UsersService usersService, ArticlesService articlesService) {
        this.articleLikesRepository = articleLikesRepository;
        this.usersService = usersService;
        this.articlesService = articlesService;
    }

    public List<ArticleLikes> getAll() {
        return articleLikesRepository.findAll();
    }

    public ArticleLikes add(Long articleId) throws Exception {
        Article article = articlesService.get(articleId);

        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = usersService.getByUsername(userName);

        if (articleLikesRepository.existsByArticleIdAndUserId(articleId, user.getId())) {
            throw new Error("User already liked this article");
        }

        ArticleLikes newEntry = new ArticleLikes()
            .setArticleId(articleId)
            .setUserId(user.getId());

        article.setLikes(article.getLikes() + 1);

        return articleLikesRepository.save(newEntry);            
    }

    public ArticleLikes delete(Long articleId) throws Exception {
        Article article = articlesService.get(articleId);

        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = usersService.getByUsername(userName);

        if (!articleLikesRepository.existsByArticleIdAndUserId(articleId, user.getId())) {
            throw new Error("User did not like this article yet");
        }

        article.setLikes(article.getLikes() - 1);

        ArticleLikes entity = articleLikesRepository.findByArticleIdAndUserId(articleId, user.getId());

        articleLikesRepository.deleteById(entity.getId());

        return entity;
    }
    
}
