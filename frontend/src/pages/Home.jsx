import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom';
import Spinner from '../comps/spinner'

const Home = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/books').then((res) => {
            setBooks(res.data.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false)
        })
    }, []);

    return (
        <div className="containerHome">
                <h1>Book List</h1>
                <Link to='/books/create'>Create New Book</Link>
                <div>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="laTable">
                            <table>
                            <thead>
                                <tr>
                                    <th className="cent">No.</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th className="cent">Year</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {books.map((book, index) => (
                                <tr key={book._id}>
                                    <td className="cent">{index + 1}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td className="cent">{book.publishYear}</td>
                                    <td>
                                        <div>
                                            <Link to={`/books/show/${book._id}`}> Details </Link> | 
                                            <Link to={`/books/edit/${book._id}`}> Edit </Link> | 
                                            <Link to={`/books/delete${book._id}`}> Delete </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                            </table>
                        </div>
                    )}
                </div>
        </div>
    );
}

export default Home;
