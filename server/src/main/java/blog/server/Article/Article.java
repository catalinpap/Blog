package blog.server.Article;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import blog.server.utils.JSON;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Article {
	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	
	private String author;

	private String content;

	private String category;

	private List<String> keywords;

	@CreationTimestamp
	private LocalDateTime creationDate;

	public Long getId() {
		return this.id;
	}

	public String getName() {
		return this.name;
	}

	public String getAuthor() {
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

	public Article setId(final Long id) {
		this.id = id;
		return this;
	}

	public Article setName(final String name) {
		this.name = name;
		return this;
	}

	public Article setAuthor(final String author) {
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

	@Override
	public String toString() {
		try {
			return JSON.write(this);
		} catch (Exception e) {
			e.printStackTrace();
			return String.format("{id:%d, name:'%s', author:'%s', content:'%s'}", this.id, this.name, this.author, this.content);
		}
		
	}
}
