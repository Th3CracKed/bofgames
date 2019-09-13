package com.bof.games.domain;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "client")
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "street")
    private String street;

    @Column(name = "post_code")
    private String postCode;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @OneToMany(mappedBy = "client")
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "driver", cascade = CascadeType.ALL)
    private Set<Cart> carts = new HashSet<>();

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public Client street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getPostCode() {
        return postCode;
    }

    public Client postCode(String postCode) {
        this.postCode = postCode;
        return this;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getCity() {
        return city;
    }

    public Client city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public Client country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public Client birthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
        return this;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public Client reviews(Set<Review> reviews) {
        this.reviews = reviews;
        return this;
    }

    public Client addReview(Review review) {
        this.reviews.add(review);
        review.setClient(this);
        return this;
    }

    public Client removeReview(Review review) {
        this.reviews.remove(review);
        review.setClient(null);
        return this;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public Set<Cart> getCarts() {
        return carts;
    }

    public Client carts(Set<Cart> carts) {
        this.carts = carts;
        return this;
    }

    public Client addCart(Cart cart) {
        this.carts.add(cart);
        cart.setDriver(this);
        return this;
    }

    public Client removeCart(Cart cart) {
        this.carts.remove(cart);
        cart.setDriver(null);
        return this;
    }

    public void setCarts(Set<Cart> carts) {
        this.carts = carts;
    }

    public User getUser() {
        return user;
    }

    public Client user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Client)) {
            return false;
        }
        return id != null && id.equals(((Client) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", street='" + getStreet() + "'" +
            ", postCode='" + getPostCode() + "'" +
            ", city='" + getCity() + "'" +
            ", country='" + getCountry() + "'" +
            ", birthdate='" + getBirthdate() + "'" +
            "}";
    }
}
