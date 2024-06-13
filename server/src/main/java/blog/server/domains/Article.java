package blog.server.domains;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Article {
	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	private Long id;

	private String name;
	
	private String author;

	public Long getId() {
		return this.id;
	}

	public String getName() {
		return this.name;
	}

	public String getAuthor() {
		return this.author;
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

	@Override
	public String toString() {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			return objectMapper.writeValueAsString(this);
		} catch (Exception e) {
			e.printStackTrace();
			return String.format("{id:%d, name:'%s', author:'%s'}", this.id, this.name, this.author);
		}
		
	}
}
