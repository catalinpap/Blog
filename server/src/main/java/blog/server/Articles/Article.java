package blog.server.Articles;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import blog.server.Authors.Author;
import blog.server.Comments.Comment;
import blog.server.Topics.Topic;
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
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "article")
public class Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	private String title;
	
	private Long authorId;

	@ManyToOne(fetch = FetchType.EAGER, targetEntity = Author.class)
	@JoinColumn(name = "authorId", insertable = false, updatable = false)
	private Author author;

	@Lob
	@NotBlank
	private String content;

	@ColumnDefault("1")
	private Long topicId;

	@Transient
	private String topic;

	@ManyToOne(fetch = FetchType.EAGER, targetEntity = Topic.class)
	@JoinColumn(name = "topicId", insertable = false, updatable = false)
	@JsonIgnoreProperties("articles")
	private Topic topicRef;

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

	@OneToMany(mappedBy = "articleId", fetch = FetchType.EAGER, targetEntity = Comment.class)
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

	public Long getTopicId() {
		return this.topicId;
	}

	public String getTopic() {
		return this.topicRef.getName();
	}

	public Topic getTopicRef() {
		return this.topicRef;
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

	public Article setTopicId(final Long topicId) {
		this.topicId = topicId;
		return this;
	}

	public Article setTopic(final String topic) {
		this.topic = topic;
		return this;
	}
	
	public Article setTopicyRef(final Topic topicRef) {
		this.topicRef = topicRef;
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

	@Override
	public boolean equals(Object other) {
		if(this == other) return true;
		if (other == null || this.getClass() != other.getClass()) return false;

		Article otherArticle = (Article) other;
		if(this.getId() == null || otherArticle.getId() == null) return false;

		return this.getId().equals(otherArticle.getId());
	}

	@Override
	public int hashCode() {
		return (this.getId() == null) ? System.identityHashCode(this) : this.getId().hashCode();
	}

	private String formatUrl(String input) {
		return String.join("-", input.trim().split(" ")).toLowerCase().replaceAll("[^-a-z0-9]", "");
	}
}
