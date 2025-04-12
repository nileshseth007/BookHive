import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import bookImage from './../../Images/BooksImages/book-luv2code-1000.png'
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckoutPage = () => {

    const { authState } = useOktaAuth();

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // review state - 138
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    // checking current user's review on current book - 180
    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    //loans account state (how many books checked out total)
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    // Is book checked out?
    const [isCheckedout, setIsCheckedout] = useState(false);
    const [isLoadingBookCheckedout, setIsLoadingBookCheckedout] = useState(true);


    const bookId = (window.location.pathname).split('/')[2];
    // http://localhost:5173/checkout/3 -> split by / and picked up bookId=3

    // trigger the function when variables in the array changes;

    useEffect(() => {
        const fetchBook = async () => {

            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl); // fetch url data

            if (!response.ok) throw new Error('Something went wrong');
            // fetch json data
            const responseJson = await response.json();

            // store the book data 
            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            };



            setBook(loadedBook);
            setIsLoading(false);

        };
        fetchBook().catch((error: any) => {
            setIsLoading(false); // stop the loading
            setHttpError(error.message); // show the error
        })
    }, [isCheckedout]); // the array

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error("Something went wrong");

            }
            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0; // to calculate average reviews

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription,
                })
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }
            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };
        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, [isReviewLeft]);

    useEffect(() => {
        const fetchUserReviewBook = async () =>{
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/reviews/secure/user/book?bookId=${bookId}`;
                const requestOptions={
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const userReview = await fetch(url, requestOptions);
                if(!userReview.ok){
                    throw new Error('Something went wrong');
                }
                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            }
            setIsLoadingUserReview(false);

        }
        fetchUserReviewBook().catch((error: any)=>{ // if any error stop spinner show error
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })
    }, [authState])

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            console.log(authState);
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/currentloans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content_Type': 'application/json'
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error('Something Went Wrong');
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoansCount(false);

        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckedout]);

    useEffect(() => {
        const fetchUserCheckedoutBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser?bookId=${bookId}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const bookCheckedout = await fetch(url, requestOptions);
                if (!bookCheckedout.ok) {
                    throw new Error("Something went wrong");
                }
                const bookCheckedoutResponseJson = await bookCheckedout.json();
                setIsCheckedout(bookCheckedoutResponseJson);
            }
            setIsLoadingBookCheckedout(false);
        }
        fetchUserCheckedoutBook().catch((error: any) => {
            setIsLoadingBookCheckedout(false);
            setHttpError(error.message);
        })
    }, [authState]);
    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingBookCheckedout || isLoadingUserReview) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    async function checkoutBook() {
        const url = `http://localhost:8080/api/books/secure/checkout?bookId=${bookId}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const checkoutResponse = await fetch(url, requestOptions);
        if(!checkoutResponse.ok) throw new Error ('Something went wrong');
        setIsCheckedout(true);
    }

    // submit a review
    async function submitReview(startInput: number, reviewDescription:string){
        let bookId: number = 0;
        if(book?.id) bookId = book.id;
        console.log(startInput);

        const reviewRequestModel = new ReviewRequestModel(startInput,bookId,reviewDescription);
        console.log(JSON.stringify(reviewRequestModel));
        const url = `http://localhost:8080/api/reviews/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url,requestOptions);
        if(!returnResponse.ok) throw new Error("Something went wrong");
        setIsReviewLeft(true);
    }
    

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img
                            ? <img src={book?.img} width='226' height='349' alt='Book' />
                            : <img src={bookImage} width='226' height='349' alt="Book" />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} currentLoansCount={currentLoansCount} mobile={false} isAuthenticated={authState?.isAuthenticated} isCheckedout={isCheckedout} checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview}/>
                    {/* <p>{book?.id}</p> */}
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img
                        ? <img src={book?.img} width='226' height='349' alt='Book' />
                        : <img src={bookImage} width='226' height='349' alt="Book" />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} currentLoansCount={currentLoansCount} mobile={true} isAuthenticated={authState?.isAuthenticated} isCheckedout={isCheckedout} checkoutBook={checkoutBook} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    );
};
