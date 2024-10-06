package blog.server.Articles;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Generated;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import blog.server.Authors.Author;
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
import jakarta.persistence.PostPersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "article")
public class Article {
	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;
	
	private Long authorId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "author")
	private Author author;

	@Lob
	private String content;

	@ColumnDefault("'Uncategorized'")
	@Generated
	private String category;

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

	@Override
	public String toString() {
		try {
			return JSON.write(this);
		} catch (Exception e) {
			e.printStackTrace();
			return String.format("{id:%d, name:'%s', author:'%s', content:'%s'}", this.id, this.title, this.authorId, this.content);
		}
	}

	private String formatUrl(String input) {
		return String.join("-", input.trim().split(" ")).toLowerCase().replaceAll("[^-a-z0-9]", "");
	}
}
