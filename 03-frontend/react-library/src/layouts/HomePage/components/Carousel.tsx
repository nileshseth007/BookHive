import { Link } from 'react-router';
import BookModel from '../../../models/BookModel';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { ReturnBook } from './ReturnBook'
import { useEffect, useState } from 'react';


export const Carousel = () => {
    const [books, setBooks] = useState<BookModel[]> ([]);
    const [isLoading, setIsLoading] = useState(true); // when api is loading the data
    const [httpError,setHttpError] = useState(null); // if the api fails

    // trigger the function when variables in the array changes;
    
    useEffect(() =>{
        const fetchBooks = async () =>{

            const baseUrl: string = "http://localhost:8080/api/books";

            const url: string = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url); // fetch url data

            if(!response.ok) throw new Error('Something went wrong');
            // fetch json data
            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;
            // grabs data inside 'embedded' JSON object when we call /api/books

            // store the book data in array
            const loadedBooks: BookModel[] = [];

            for(const key in responseData){
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img
                })
            }

            setBooks(loadedBooks);
            setIsLoading(false);

        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false); // stop the loading
            setHttpError(error.message); // show the error
        })
    }, []); // the array

    if(isLoading){
        return(
            <SpinnerLoading/>
        )
    }

    if(httpError){
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3> Find your next "I stayed up too late reading" book</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval='false'>

                {/* Desktop  */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {/* take first three books using 'slice' and loop through them to display */}
                            {books.slice(0,3).map(book =>(
                                <ReturnBook book={book} key ={book.id}/>
                            ))}
                        </div>
                    </div>

                    {/* 2 */}

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                        {books.slice(3,6).map(book =>(
                                <ReturnBook book={book} key ={book.id}/>
                            ))}
                        </div>
                    </div>

                    {/* 3 */}

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                        {books.slice(6,9).map(book =>(
                                <ReturnBook book={book} key ={book.id}/>
                            ))}
                        </div>
                    </div>
                </div>


                <button className='carousel-control-prev' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button'
                    data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* Mobile  */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <ReturnBook book={books[7]} key ={books[7].id}/>
                </div>
            </div>

            <div className='homepage-carousel-title mt-3'>
                <Link to='/search' className='btn btn-outline-secondary btn-lg'>View More</Link>
            </div>
        </div>
    )
}