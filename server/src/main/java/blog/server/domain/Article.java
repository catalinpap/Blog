package blog.server.domain;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import blog.server.utils.JSON;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Article {
	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	private Long id;

	private String name;
	
	private String author;

	private String content;

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
