package com.bof.games.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import com.bof.games.domain.enumeration.KEYSTATUS;

/**
 * A Key.
 */
@Entity
@Table(name = "key")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "key")
public class Key implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "value")
    private String value;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private KEYSTATUS status;

    @ManyToOne
    @JsonIgnoreProperties("keys")
    @JsonIgnore
    private Item item;

    @ManyToOne
    @JsonIgnoreProperties("keys")
    @JsonIgnore
    private CartLine cartLine;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public Key value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public KEYSTATUS getStatus() {
        return status;
    }

    public Key status(KEYSTATUS status) {
        this.status = status;
        return this;
    }

    public void setStatus(KEYSTATUS status) {
        this.status = status;
    }

    public Item getItem() {
        return item;
    }

    public Key item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public CartLine getCartLine() {
        return cartLine;
    }

    public Key cartLine(CartLine cartLine) {
        this.cartLine = cartLine;
        return this;
    }

    public void setCartLine(CartLine cartLine) {
        this.cartLine = cartLine;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Key)) {
            return false;
        }
        return id != null && id.equals(((Key) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Key{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
