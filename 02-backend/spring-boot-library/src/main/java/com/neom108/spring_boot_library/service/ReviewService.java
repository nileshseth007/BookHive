package com.neom108.spring_boot_library.service;

import com.neom108.spring_boot_library.dao.BookRepository;
import com.neom108.spring_boot_library.dao.ReviewRepository;
import com.neom108.spring_boot_library.entity.Review;
import com.neom108.spring_boot_library.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
//177
@Service
@Transactional // since using Jpa Repository, we are defining transactional here
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {

        this.reviewRepository = reviewRepository;
    }

    //177
    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception{
        //check if there is a previous review of this book by this same user
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());
        if(validateReview != null) throw new Exception("Review already created");

        Review review = new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);

        if(reviewRequest.getReviewDescription().isPresent()){
            // since review description is of type Optional<String> hence transform it to string or null
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

    public Boolean userReviewListed(String userEmail, Long bookId){
        //check if there is a previous review of this book by this same user
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        return validateReview != null ;

    }


}
