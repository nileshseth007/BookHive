package com.neom108.spring_boot_library.requestmodels;

import lombok.Data;

import java.util.Optional;
//176
@Data
public class ReviewRequest {
    private double rating;

    private Long bookId;

    private Optional<String> reviewDescription; // description with review is optional

}
