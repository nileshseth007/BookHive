package com.neom108.spring_boot_library.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "checkout")
@Data
public class Checkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "checkout_date")
    public String checkoutDate;

    @Column(name = "return_date")
    public String returnDate;

    @Column(name = "book_id")
    public Long bookId;

    public Checkout() {
    }

    public Checkout(String userEmail, String checkoutState, String returnDate, Long bookId) {
        this.userEmail = userEmail;
        this.checkoutDate = checkoutState;
        this.returnDate = returnDate;
        this.bookId = bookId;
    }
}
