package com.bof.games.domain;

import com.bof.games.domain.enumeration.MEDIATYPE;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.elasticsearch.annotations.FieldType;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A Media.
 */
@Entity
@Table(name = "media")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "media")
public class Media implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "url")
    private String url;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private MEDIATYPE type;

    @Column(name = "alt")
    private String alt;

    @ManyToOne
    @JsonIgnore
    private Game game;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public Media url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public MEDIATYPE getType() {
        return type;
    }

    public Media type(MEDIATYPE type) {
        this.type = type;
        return this;
    }

    public void setType(MEDIATYPE type) {
        this.type = type;
    }

    public String getAlt() {
        return alt;
    }

    public Media alt(String alt) {
        this.alt = alt;
        return this;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public Game getGame() {
        return game;
    }

    public Media game(Game game) {
        this.game = game;
        return this;
    }

    public void setGame(Game game) {
        this.game = game;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Media)) {
            return false;
        }
        return id != null && id.equals(((Media) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Media{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", type='" + getType() + "'" +
            ", alt='" + getAlt() + "'" +
            "}";
    }
}
