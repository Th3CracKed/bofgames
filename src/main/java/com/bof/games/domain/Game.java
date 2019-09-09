package com.bof.games.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Game.
 */
@Entity
@Table(name = "game")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "game")
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "game")
    private Set<Media> media = new HashSet<>();

    @OneToMany(mappedBy = "game")
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "game")
    private Set<Item> items = new HashSet<>();

    @ManyToMany(mappedBy = "games")
    @JsonIgnore
    private Set<Tag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Game name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Game description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Media> getMedia() {
        return media;
    }

    public Game media(Set<Media> media) {
        this.media = media;
        return this;
    }

    public Game addMedia(Media media) {
        this.media.add(media);
        media.setGame(this);
        return this;
    }

    public Game removeMedia(Media media) {
        this.media.remove(media);
        media.setGame(null);
        return this;
    }

    public void setMedia(Set<Media> media) {
        this.media = media;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public Game reviews(Set<Review> reviews) {
        this.reviews = reviews;
        return this;
    }

    public Game addReview(Review review) {
        this.reviews.add(review);
        review.setGame(this);
        return this;
    }

    public Game removeReview(Review review) {
        this.reviews.remove(review);
        review.setGame(null);
        return this;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public Set<Item> getItems() {
        return items;
    }

    public Game items(Set<Item> items) {
        this.items = items;
        return this;
    }

    public Game addItem(Item item) {
        this.items.add(item);
        item.setGame(this);
        return this;
    }

    public Game removeItem(Item item) {
        this.items.remove(item);
        item.setGame(null);
        return this;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Game tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Game addTag(Tag tag) {
        this.tags.add(tag);
        tag.getGames().add(this);
        return this;
    }

    public Game removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getGames().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Game)) {
            return false;
        }
        return id != null && id.equals(((Game) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Game{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
