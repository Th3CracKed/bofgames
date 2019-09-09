package com.bof.games.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Promo.
 */
@Entity
@Table(name = "promo")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "promo")
public class Promo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "sale")
    private Double sale;

    @Column(name = "start")
    private LocalDate start;

    @Column(name = "jhi_end")
    private LocalDate end;

    @ManyToOne
    @JsonIgnoreProperties("promos")
    private Item item;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getSale() {
        return sale;
    }

    public Promo sale(Double sale) {
        this.sale = sale;
        return this;
    }

    public void setSale(Double sale) {
        this.sale = sale;
    }

    public LocalDate getStart() {
        return start;
    }

    public Promo start(LocalDate start) {
        this.start = start;
        return this;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public Promo end(LocalDate end) {
        this.end = end;
        return this;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public Item getItem() {
        return item;
    }

    public Promo item(Item item) {
        this.item = item;
        return this;
    }

    public void setItem(Item item) {
        this.item = item;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Promo)) {
            return false;
        }
        return id != null && id.equals(((Promo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Promo{" +
            "id=" + getId() +
            ", sale=" + getSale() +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            "}";
    }
}
