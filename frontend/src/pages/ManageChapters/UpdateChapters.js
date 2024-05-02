import React ,{useEffect,useState}from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  Alert  from "react-bootstrap/Alert";
import {useParams,useLocation} from "react-router-dom";
import { getAuthUser } from "../../helper/Storage.js";
import axios from "axios";

const UpdateChapters=()=>{
  const Auth = getAuthUser();
  const { state } = useLocation();
  const{id}=state
  var num = (useParams())
 

  const [chapter,setChapter] = useState ({
    err: "",
    success : "",
    loading: false,
    title :"",
    description : "",
    reload : 0
  });

  const updateChapter = (e) => {
    e.preventDefault();
    setChapter({ ...chapter, loading: true });   
    axios
      .put("http://localhost:5003/books/"+id+"/chapters/"+num.chapterId, {
        title :chapter.title,
        description : chapter.description,
      })
      .then((resp) => {
        setChapter({
          ...chapter,
          loading: false,
          success: "Chapter updated successfully !",
          reload:chapter.reload+1,
        });
      })
      .catch((err) => {
        setChapter({
          ...chapter,
          loading: false,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5003/books/" + id+"/chapters/"+num.chapterId)
      .then((resp) => {
        setChapter({
          ...chapter,
          title: resp.data.title,
          description: resp.data.description,
        });
      })
      .catch((err) => {
        setChapter({
          ...chapter,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  }, [chapter.reload]);

    return(
        <div className="login-container">
         <br></br>
      <h1 className="mb-4">Update Chapter</h1>
      
    {chapter.err && (
        <Alert variant="danger" className="p-2">
          {chapter.err}
        </Alert>
      )}

      {chapter.success && (
        <Alert variant="success" className="p-2">
          {chapter.success}
        </Alert>
      )}

      <Form onSubmit={updateChapter}>
       <Form.Group className="mb-3">
        <Form.Control type="text"
        value={chapter.title} 
        onChange={(e) => setChapter({ ...chapter, title: e.target.value })}
        required
         placeholder="Chapter's Title" />
      </Form.Group>
    


      <Form.Group className="mb-3">
        <textarea className="form-control" 
        value={chapter.description} onChange={(e) => setChapter({ ...chapter, description: e.target.value })}
        required
        placeholder="Description"></textarea>
      </Form.Group>

      <Button className="btn btn-dark" variant="primary" type="submit">
       Update chapter
      </Button>

      </Form>
</div>
    );
};

export default UpdateChapters;