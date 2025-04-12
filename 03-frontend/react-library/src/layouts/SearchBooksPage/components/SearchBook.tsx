import BookModel from "../../../models/BookModel";
import bookImage from "../../../Images/BooksImages/book-luv2code-1000.png"
import { Link } from "react-router";

export const SearchBook: React.FC<{book: BookModel}> = (props) => {
    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">  
                    <div className="d-none d-lg-block"> {/* this means only render the block when its large enough */}
                        {props.book.img
                            ?
                            <img src={props.book.img} 
                            width='123'
                            height='196'
                            alt="Book" />
                            :
                            <img src={bookImage} 
                            width='123'
                            height='196'
                            alt="Book" />
                        }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center 
                        align-items-center"> {/* this means only render the block when its large enough */}
                        {props.book.img
                            ?
                            <img src={props.book.img} 
                            width='123'
                            height='196'
                            alt="Book" />
                            :
                            <img src={bookImage} 
                            width='123'
                            height='196'
                            alt="Book" />
                        }
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">
                            {props.book.author}
                        </h5>
                        <h4>
                            {props.book.title}
                        </h4>
                        <p className="card-text ">
                            {props.book.description}
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <Link to={`/checkout/${props.book.id}`} className="btn btn-dark main-color text-white" >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};
