package fr.bofgames.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Item.
 */
@Entity
@Table(name = "item")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "item")
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "price")
    private Long price;

    @OneToMany(mappedBy = "item")
    private Set<Key> keys = new HashSet<>();

    @OneToMany(mappedBy = "item")
    private Set<Promo> promos = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "item_cart",
               joinColumns = @JoinColumn(name = "item_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "cart_id", referencedColumnName = "id"))
    private Set<Cart> carts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("items")
    private Game game;

    @ManyToOne
    @JsonIgnoreProperties("items")
    private Platform platform;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrice() {
        return price;
    }

    public Item price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Set<Key> getKeys() {
        return keys;
    }

    public Item keys(Set<Key> keys) {
        this.keys = keys;
        return this;
    }

    public Item addKey(Key key) {
        this.keys.add(key);
        key.setItem(this);
        return this;
    }

    public Item removeKey(Key key) {
        this.keys.remove(key);
        key.setItem(null);
        return this;
    }

    public void setKeys(Set<Key> keys) {
        this.keys = keys;
    }

    public Set<Promo> getPromos() {
        return promos;
    }

    public Item promos(Set<Promo> promos) {
        this.promos = promos;
        return this;
    }

    public Item addPromo(Promo promo) {
        this.promos.add(promo);
        promo.setItem(this);
        return this;
    }

    public Item removePromo(Promo promo) {
        this.promos.remove(promo);
        promo.setItem(null);
        return this;
    }

    public void setPromos(Set<Promo> promos) {
        this.promos = promos;
    }

    public Set<Cart> getCarts() {
        return carts;
    }

    public Item carts(Set<Cart> carts) {
        this.carts = carts;
        return this;
    }

    public Item addCart(Cart cart) {
        this.carts.add(cart);
        cart.getItems().add(this);
        return this;
    }

    public Item removeCart(Cart cart) {
        this.carts.remove(cart);
        cart.getItems().remove(this);
        return this;
    }

    public void setCarts(Set<Cart> carts) {
        this.carts = carts;
    }

    public Game getGame() {
        return game;
    }

    public Item game(Game game) {
        this.game = game;
        return this;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Platform getPlatform() {
        return platform;
    }

    public Item platform(Platform platform) {
        this.platform = platform;
        return this;
    }

    public void setPlatform(Platform platform) {
        this.platform = platform;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Item)) {
            return false;
        }
        return id != null && id.equals(((Item) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Item{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            "}";
    }
}
