import React ,{useState,useRef,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  Alert  from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage.js";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UpdateBook=()=>{
  const Auth = getAuthUser();
  let {id}=useParams();
  const [book,setBook] = useState ({
    err: "",
    success : "",
    loading: false,
    name :"",
    description : "",
    author : "",
    publicationDate : "",
    field : "",
    imageUrl : null,
    reload : 0
  });

  const image = useRef(null);
  const pdfFile = useRef(null);

  const updateBook = (e) => {
    e.preventDefault();
    setBook({ ...book, loading: true });
    const formData = new FormData();
    formData.append("name", book.name);
    formData.append("field", book.field);
    formData.append("author", book.author);
    formData.append("publicationDate",book.publicationDate);
    formData.append("description", book.description);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }
    if (pdfFile.current.files && pdfFile.current.files[0]) {
      formData.append("pdfFile", pdfFile.current.files[0]);
    }
    axios
      .put("http://localhost:6002/books/"+ id , formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setBook({
          ...book,
          loading: false,
          success: "Book updated successfully !",
          reload: book.reload + 1,
        });
        image.current.value = null;
        pdfFile.current.value=null;
      })
      .catch((err) => {
        setBook({
          ...book,
          loading: false,
          err: "Something went wrong, please try again later !",
        });
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:6002/books/" + id)
      .then((resp) => {
        setBook({
          ...book,
          name: resp.data.value.name,
          description: resp.data.value.description,
          imageUrl: resp.data.value.imageUrl,
          author : resp.data.value.author,
          publicationDate : resp.data.value.publicationDate ,
          field : resp.data.value.field,
        });
      })
      .catch((err) => {
        setBook({
          ...book,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [book.reload]);

    return(
        <div className="login-container">
    <h1 className="mb-4">Update Book Form</h1>

    {book.err && (
        <Alert variant="danger" className="p-2">
          {book.err}
        </Alert>
      )}

      {book.success && (
        <Alert variant="success" className="p-2">
          {book.success}
        </Alert>
      )}

      <Form onSubmit={updateBook}>
      <img
          alt={book.name}
          style={{
            width: "50%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
          }}
          src={`http://localhost:6002/uploads/${book.imageUrl}`}
        />

      <Form.Group className="mb-3" >
        <Form.Control  
        type="text" 
        value={book.name} onChange={(e) => setBook({ ...book, name: e.target.value })}
        required
        placeholder="Book's Name"/>
      </Form.Group>

      <Form.Group className="mb-3">
        <textarea
         className="form-control" 
         value={book.description} onChange={(e) => setBook({ ...book, description: e.target.value })}
         required
         placeholder="Description"></textarea>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control 
        type="text" 
        value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })}
         required
        placeholder="Author" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control 
        type="text"
        value={book.field} onChange={(e) => setBook({ ...book, field: e.target.value })}
        required
         placeholder="Filed" />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Control 
         type="text" 
         value={book.publicationDate} onChange={(e) => setBook({ ...book, publicationDate: e.target.value })}
         required
         placeholder="Publication Date" />
      </Form.Group>

      <Form.Group className="mb-3">
        <input type="file" className="form-control" ref={image}></input>
      </Form.Group>

      <Form.Group className="mb-3">
        <input type="file" className="form-control" ref={pdfFile}></input>
      </Form.Group>
      
      <Button className="btn btn-dark" variant="primary" type="submit" 
      style={{marginBottom :"5px"}}>
        Update Book
      </Button>

      </Form>
  
    </div>
    );
};

export default UpdateBook;