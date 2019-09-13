package com.bof.games.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A CartLine.
 */
@Entity
@Table(name = "cart_line")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "cartline")
public class CartLine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "expired")
    private Boolean expired;

    @OneToOne
    private Item item;

    @OneToMany(mappedBy = "cartLine")
    private Set<Key> keys = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("cartLines")
    private Cart cart;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public CartLine quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public CartLine unitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Boolean isExpired() {
        return expired;
    }

    public CartLine expired(Boolean expired) {
        this.expired = expired;
        return this;
    }

    public void setExpired(Boolean expired) {
        this.expired = expired;
    }

    public Item getItem() {
        return item;
    }

    public CartLine item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Set<Key> getKeys() {
        return keys;
    }

    public CartLine keys(Set<Key> keys) {
        this.keys = keys;
        return this;
    }

    public CartLine addKey(Key key) {
        this.keys.add(key);
        key.setCartLine(this);
        return this;
    }

    public CartLine removeKey(Key key) {
        this.keys.remove(key);
        key.setCartLine(null);
        return this;
    }

    public void setKeys(Set<Key> keys) {
        this.keys = keys;
    }

    public Cart getCart() {
        return cart;
    }

    public CartLine cart(Cart cart) {
        this.cart = cart;
        return this;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CartLine)) {
            return false;
        }
        return id != null && id.equals(((CartLine) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CartLine{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", unitPrice=" + getUnitPrice() +
            ", expired='" + isExpired() + "'" +
            "}";
    }
}
