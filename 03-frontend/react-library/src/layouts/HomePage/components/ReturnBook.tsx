import React from "react";
import bookImage from './../../../Images/BooksImages/book-luv2code-1000.png'
import BookModel from "../../../models/BookModel";
import { Link } from "react-router";

export const ReturnBook: React.FC<{book: BookModel}> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {props.book.img // if the image is not null
                    ? 
                    <img // then return this image
                        src={props.book.img}
                        width='151'
                        height='233'
                        alt="book"
                    />
                    :
                    <img // else return default image
                        src={bookImage}
                        width='151'
                        height='233'
                        alt="book"
                    />
                }

                <h6 className='mt-2'>{props.book.title}</h6>
                <p>{props.book.author}</p>
                <Link to={`/checkout/${props.book.id}`} className='btn btn-dark main-color text-white'>Reserve</Link>

            </div>
        </div>

    )
}