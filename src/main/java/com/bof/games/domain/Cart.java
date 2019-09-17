package com.bof.games.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name = "ordered")
    private Boolean ordered;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "cart",cascade = CascadeType.ALL)
    private Set<CartLine> cartLines = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("carts")
    private Client driver;

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

    public Boolean isOrdered() {
        return ordered;
    }

    public Cart ordered(Boolean ordered) {
        this.ordered = ordered;
        return this;
    }

    public void setOrdered(Boolean ordered) {
        this.ordered = ordered;
    }

    public Set<CartLine> getCartLines() {
        return cartLines;
    }

    public Cart cartLines(Set<CartLine> cartLines) {
        this.cartLines = cartLines;
        return this;
    }

    public Cart addCartLine(CartLine cartLine) {
        this.cartLines.add(cartLine);
        cartLine.setCart(this);
        return this;
    }

    public Cart removeCartLine(CartLine cartLine) {
        this.cartLines.remove(cartLine);
        cartLine.setCart(null);
        return this;
    }

    public void setCartLines(Set<CartLine> cartLines) {
        this.cartLines = cartLines;
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
            ", ordered='" + isOrdered() + "'" +
            "}";
    }
}
