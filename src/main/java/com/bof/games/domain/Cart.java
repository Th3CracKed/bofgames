package com.bof.games.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Cart.
 */
@Entity
@Table(name = "cart")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "cart")
public class Cart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "expired")
    private Boolean expired;

    @OneToOne(mappedBy = "cart")
    @JsonIgnore
    private Client driver;

    @OneToOne(mappedBy = "cart")
    @JsonIgnore
    private CartLine cartLine;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isExpired() {
        return expired;
    }

    public Cart expired(Boolean expired) {
        this.expired = expired;
        return this;
    }

    public void setExpired(Boolean expired) {
        this.expired = expired;
    }

    public Client getDriver() {
        return driver;
    }

    public Cart driver(Client client) {
        this.driver = client;
        return this;
    }

    public void setDriver(Client client) {
        this.driver = client;
    }

    public CartLine getCartLine() {
        return cartLine;
    }

    public Cart cartLine(CartLine cartLine) {
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
        if (!(o instanceof Cart)) {
            return false;
        }
        return id != null && id.equals(((Cart) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cart{" +
            "id=" + getId() +
            ", expired='" + isExpired() + "'" +
            "}";
    }
}
