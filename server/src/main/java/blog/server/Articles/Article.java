package blog.server.Articles;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import blog.server.Authors.Author;
import blog.server.Categories.Category;
import blog.server.Comments.Comment;
import blog.server.utils.JSON;
import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PostPersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "article")
public class Article {
	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String title;
	
	private Long authorId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "authorId", insertable = false, updatable = false)
	@JsonIgnoreProperties("articles")
	private Author author;

	@Lob
	@NotBlank
	private String content;

	@ColumnDefault("'Uncategorized'")
	private String category;

	// @ColumnDefault("'Uncategorized'")
	// @ManyToOne(fetch = FetchType.EAGER)
	// @JoinColumn(name = "id", insertable = false, updatable = false)
	// private Category categoryObj;

	@Nullable
	private List<String> keywords;

	@ColumnDefault("0")
	private Integer likes = 0;

	@ColumnDefault("0")
	private Integer bookmarks = 0;

	@ColumnDefault("0")
	private Integer views = 0;

	@CreationTimestamp
	private LocalDateTime creationDate;

	private String url;

	private String thumbnail;

	@OneToMany(mappedBy = "articleId", fetch = FetchType.EAGER)
	private List<Comment> comments;

	@PostPersist
	public void onSave() {
		this.url = formatUrl(this.title) + "-" + this.id.toString();
	}

	public Long getId() {
		return this.id;
	}

	public String getTitle() {
		return this.title;
	}

	public Long getAuthorId() {
		return this.authorId;
	}

	public Author getAuthor() {
		return this.author;
	}

	public String getContent() {
		return this.content;
	}

	public String getCategory() {
		return this.category;
	}

	// public Category getCategoryObj() {
	// 	return this.categoryObj;
	// }

	public List<String> getKeywords() {
		return this.keywords;
	}

	public Integer getLikes() {
		return this.likes;
	}

	public Integer getBookmarks() {
		return this.bookmarks;
	}

	public Integer getViews() {
		return this.views;
	}

	public String getCreationDate() {
		return this.creationDate.toLocalDate().toString();
	}

	public String getUrl() {
		return this.url;
	}

	public String getThumbnail() {
		return this.thumbnail;
	}

	public List<Comment> getComments() {
		return this.comments;
	}

	public Article setId(final Long id) {
		this.id = id;
		return this;
	}

	public Article setTitle(final String title) {
		this.title = title;
		return this;
	}

	public Article setAuthorId(final Long authorId) {
		this.authorId = authorId;
		return this;
	}

	public Article setAuthor(final Author author) {
		this.author = author;
		return this;
	}

	public Article setContent(final String content) {
		this.content = content;
		return this;
	}

	public Article setCategory(final String category) {
		this.category = category;
		return this;
	}

	// public Article setCategoryObj(final Category categoryObj) {
	// 	this.categoryObj = categoryObj;
	// 	return this;
	// }

	public Article setKeywords(final List<String> keywords) {
		this.keywords = new ArrayList<>(keywords);
		return this;
	}

	public Article setLikes(final Integer likes) {
		this.likes = likes;
		return this;
	}

	public Article setBookmarks(final Integer bookmarks) {
		this.bookmarks = bookmarks;
		return this;
	}

	public Article setViews(final Integer views) {
		this.views = views;
		return this;
	}

	public Article setUrl(final String url) {
		this.url = url;
		return this;
	}

	public Article setThumbnail(final String thumbnail) {
		this.thumbnail = thumbnail;
		return this;
	}

	public Article setComments(final List<Comment> comments) {
		this.comments = (comments != null) ? new ArrayList<>(comments) : new ArrayList<Comment>();
		return this;
	}

	@Override
	public String toString() {
		try {
			return JSON.write(this);
		} catch (Exception e) {
			e.printStackTrace();
			return String.format("{id:%d, title:'%s', authorId:'%s', content:'%s'}", this.id, this.title, this.authorId, this.content);
		}
	}

	private String formatUrl(String input) {
		return String.join("-", input.trim().split(" ")).toLowerCase().replaceAll("[^-a-z0-9]", "");
	}
}
