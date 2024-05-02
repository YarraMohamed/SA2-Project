import React ,{useState,useEffect} from "react";
import BooksCard from "../../components/BooksCard";
import Spinner from "react-bootstrap/Spinner";
import  Alert  from "react-bootstrap/Alert";
import axios from "axios";

const Home =()=>{
  
  const [books,setBooks] = useState ({
    loading : true,
    results : [],
    err : null,
    reload : 0
  })

  useEffect(()=>{
    setBooks({...books, loading : true })
    axios.get("http://localhost:6002/books")
    .then(resp =>{
      setBooks({...books , results :resp.data.value ,loading : false , err : null })
    })
    .catch(err =>{
      setBooks({...books, loading : false , err :"This service isn't avaliable now, please try again later"  })
    })
  },[books.reload])

    return(
    <div className="home-container p-3">

                        {/* Loading */}
      {books.loading === true && (
          <Spinner animation="border" role="status" variant="Dark">
            <span className="visually-hidden">Loading...</span>
           </Spinner>
      )}

                        {/* ERROR */}
                        { books.loading === false && books.err!== null && (
           <Alert variant="danger" className="p-1">
                This service isn't available now, please try again later
            </Alert>
            )}
        { books.loading=== false && books.err=== null && books.results.length===0 && (
           <Alert variant="info" className="p-1">
                 no book , please try again later!
            </Alert>
         )}

                    {/* HOME */}
       { books.loading=== false && books.err=== null && (
        <>
          <div className="row">
              {
            books.results.map(book =>
              <div className="col-3 card-book" key={book._id}>
                 <BooksCard 
                 name={book.name} description={book.description} 
                 imageUrl={book.imageUrl} _id={book._id}
                 />
              </div>
              )}
          </div>
          </>
         )}


    </div>
  )}

export default Home;