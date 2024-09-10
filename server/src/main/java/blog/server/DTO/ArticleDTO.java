package blog.server.DTO;

import java.util.ArrayList;
import java.util.List;

import blog.server.Articles.Article;
import blog.server.Authors.Author;

public class ArticleDTO {
    private Long id;
    private String title;
    private String content;
    private String category;
    private List<String> keywords;
    private int likes;
    private int bookmarks;
    private Author author;
    private String creationDate;
    private String url;

    public ArticleDTO() {

    }

    public ArticleDTO from(Article article) {
        return new ArticleDTO()
            .setId(article.getId())
            .setTitle(article.getTitle())
            .setContent(article.getContent())
            .setCategory(article.getCategory())
            .setKeywords(article.getKeywords())
            .setLikes(article.getLikes())
            .setBookmarks(article.getBookmarks())
            .setCreationDate(article.getCreationDate())
            .setUrl(article.getUrl());
    }

    public Long getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public String getContent() {
        return this.content;
    }

    public String getCategory() {
        return this.category;
    }

    public List<String> getKeywords() {
        return this.keywords;
    }

    public int getLikes() {
        return this.likes;
    }
    
    public int getBookmarks() {
        return this.bookmarks;
    }

    public Author getAuthor() {
        return this.author;
    }

    public String getCreationDate() {
        return this.creationDate;
    }

    public String getUrl() {
        return this.url;
    }

    private ArticleDTO setId(final Long id) {
        this.id = id;
        return this;
    }

    public ArticleDTO setTitle(final String title) {
        this.title = title;
        return this;
    }

    public ArticleDTO setContent(final String content) {
        this.content = content;
        return this;
    }

    public ArticleDTO setCategory(final String category) {
        this.category = category;
        return this;
    }

    public ArticleDTO setKeywords(final List<String> keywords) {
        this.keywords = (keywords != null) ? new ArrayList<>(keywords) : new ArrayList<String>();
        return this;
    }

    public ArticleDTO setLikes(final int likes) {
        this.likes = likes;
        return this;
    }

    public ArticleDTO setBookmarks(final int bookmarks) {
        this.bookmarks = bookmarks;
        return this;
    }

    public ArticleDTO setAuthor(final Author author) {
        this.author = author;
        return this;
    }

    public ArticleDTO setCreationDate(final String creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public ArticleDTO setUrl(final String url) {
        this.url = url;
        return this;
    }

}
