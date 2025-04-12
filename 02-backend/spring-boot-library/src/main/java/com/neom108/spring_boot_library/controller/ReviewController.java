package com.neom108.spring_boot_library.controller;

import com.neom108.spring_boot_library.entity.Review;
import com.neom108.spring_boot_library.requestmodels.ReviewRequest;
import com.neom108.spring_boot_library.service.ReviewService;
import com.neom108.spring_boot_library.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;


    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/secure")
    public void posReview(@RequestHeader(value = "Authorization") String token,
                          @RequestBody ReviewRequest reviewRequest) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(userEmail == null){
            throw new Exception("User email is missing");
        }
        reviewService.postReview(userEmail,reviewRequest);
    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@RequestHeader(value = "Authorization") String token,
                                    @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(userEmail == null) throw new Exception("User email is missing");
        return reviewService.userReviewListed(userEmail, bookId);

    }
}
