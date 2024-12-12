package blog.server.Articles.Bookmarks;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import blog.server.Articles.Article;
import blog.server.Articles.ArticlesService;
import blog.server.Articles.Bookmarks.exceptions.AlreadyBookmarkedException;
import blog.server.Articles.Bookmarks.exceptions.NoBookmarkException;
import blog.server.Users.User;
import blog.server.Users.UsersService;

@Service
public class ArticleBookmarksService {
    private ArticleBookmarksRepository articleBookmarksRepository;
    private UsersService usersService;
    private ArticlesService articlesService;

    @Autowired
    public ArticleBookmarksService(ArticleBookmarksRepository articleBookmarksRepository, UsersService usersService, ArticlesService articlesService) {
        this.articleBookmarksRepository = articleBookmarksRepository;
        this.usersService = usersService;
        this.articlesService = articlesService;
    }

    public List<ArticleBookmarks> getAll() {
        return articleBookmarksRepository.findAll();
    }

    public List<Article> getAll(BookmarkFilter filter) {
        Specification<ArticleBookmarks> specifications = BookmarkSpecs.filterBy(filter);
        List<ArticleBookmarks> bookmarks = articleBookmarksRepository.findAll(specifications);
        List<Article> bookmarkedArticles =  new ArrayList<Article>();
        
        bookmarkedArticles = bookmarks
        .stream()
        .map(bookmark -> bookmark.getArticleId())
        .map(articleId -> {
            try {
                return articlesService.get(articleId);
            } catch (Exception e) {
                return null;
            }
        })
        .toList();
        
        return bookmarkedArticles;
    }

    public ArticleBookmarks add(Long articleId) throws Exception {
        Article article = articlesService.get(articleId);

        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = usersService.getByUsername(userName);

        if (articleBookmarksRepository.existsByArticleIdAndUserId(articleId, user.getId())) {
            throw new AlreadyBookmarkedException();
        }

        ArticleBookmarks newEntry = new ArticleBookmarks()
            .setArticleId(articleId)
            .setUserId(user.getId());

        article.setBookmarks(article.getBookmarks() + 1);

        return articleBookmarksRepository.save(newEntry);
    }

    public ArticleBookmarks delete(Long articleId) throws Exception {
        Article article = articlesService.get(articleId);

        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = usersService.getByUsername(userName);

        if (!articleBookmarksRepository.existsByArticleIdAndUserId(articleId, user.getId())) {
            throw new NoBookmarkException();
        }

        article.setBookmarks(article.getBookmarks() - 1);

        ArticleBookmarks entity = articleBookmarksRepository.findByArticleIdAndUserId(articleId, user.getId());

        articleBookmarksRepository.deleteById(entity.getId());

        return entity;
    }

    public Boolean checkUserBookmarkedArticle(Long articleId) throws Exception {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = usersService.getByUsername(userName);
        return articleBookmarksRepository.existsByArticleIdAndUserId(articleId, user.getId());
    }
}
