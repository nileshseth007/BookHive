package com.neom108.spring_boot_library.dao;

import com.neom108.spring_boot_library.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout,Long> {
    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);

    List<Checkout> findBookByUserEmail(String userEmail);
}
