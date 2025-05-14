package com.capynance.capyapi.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import java.time.LocalDate;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Table(name = "expenses")
public class Expense {
    @Id
    @UuidGenerator
    @Column(name ="id", unique = true, updatable = false)
    private String id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = true)
    private Float amount;
    @Column(nullable = false)
    private float price;
    @JsonFormat(pattern = "dd-MM-yyy")
    @Column(nullable = false)
    private LocalDate date;
//    private Category category;
//    private Product product;
}
