package blog.server.Bookmarks;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import blog.server.Articles.Article;
import blog.server.Articles.ArticlesService;
import blog.server.Bookmarks.exceptions.AlreadyBookmarkedException;
import blog.server.Bookmarks.exceptions.NoBookmarkException;
import blog.server.Users.User;
import blog.server.Users.UsersService;

@Service
public class BookmarksService {
    private BookmarksRepository bookmarksRepository;
    private UsersService usersService;
    private ArticlesService articlesService;

    @Autowired
    public BookmarksService(BookmarksRepository bookmarksRepository, UsersService usersService, ArticlesService articlesService) {
        this.bookmarksRepository = bookmarksRepository;
        this.usersService = usersService;
        this.articlesService = articlesService;
    }

    public List<Bookmark> getAll() {
        return bookmarksRepository.findAll();
    }

    public List<Article> getAll(BookmarkFilter filter) {
        Specification<Bookmark> specifications = BookmarkSpecs.filterBy(filter);
        List<Bookmark> bookmarks = bookmarksRepository.findAll(specifications);
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

    public Bookmark add(Long articleId) throws Exception {
        Article article = articlesService.get(articleId);

        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = usersService.getByUsername(userName);

        if (bookmarksRepository.existsByArticleIdAndUserId(articleId, user.getId())) {
            throw new AlreadyBookmarkedException();
        }

        Bookmark newEntry = new Bookmark()
            .setArticleId(articleId)
            .setUserId(user.getId());

        article.setBookmarks(article.getBookmarks() + 1);

        return bookmarksRepository.save(newEntry);
    }

    public Bookmark delete(Long articleId) throws Exception {
        Article article = articlesService.get(articleId);

        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = usersService.getByUsername(userName);

        if (!bookmarksRepository.existsByArticleIdAndUserId(articleId, user.getId())) {
            throw new NoBookmarkException();
        }

        article.setBookmarks(article.getBookmarks() - 1);

        Bookmark entity = bookmarksRepository.findByArticleIdAndUserId(articleId, user.getId());

        bookmarksRepository.deleteById(entity.getId());

        return entity;
    }

    public Boolean checkUserBookmarkedArticle(Long articleId) throws Exception {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = usersService.getByUsername(userName);
        return bookmarksRepository.existsByArticleIdAndUserId(articleId, user.getId());
    }
}
