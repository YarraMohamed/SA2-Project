import React from 'react'
import { Link } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const AdminOffers = () => {

  const Auth = getAuthUser();
    const [discount,setDiscount] = useState ({
    loading : true,
    results : [],
    err : null,
    reload : 0
  })
  useEffect(()=>{
    setDiscount({...discount, loading : true })
    axios.get("http://localhost:6002/books")
    .then(resp =>{
      console.log(resp);
      setDiscount({...discount , results :resp.data.value,loading : false , err : null })

    })
    .catch(err =>{
      setBooks({...books, loading : false , err :"something went wrong , please try again later!" })
    })
  },[books.reload])

  return (
    <div className="manage-books p-5">
        <div className="header-table mb-4">
        <h3 className="text-center">Manage Offers</h3>
        </div>

        <Alert variant="danger" className="p-1">
            simple Alert.
        </Alert>

        <Alert variant="success" className="p-1">
            simple Alert.
        </Alert>

            <Table striped bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Offer Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td> Offer Book 1 </td>
          <td>29/4/2024</td>
          <td>29/8/2024</td>
          <td>
            <button className="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td> Offer Book 2 </td>
          <td>1/10/2024</td>
          <td>10/10/2024</td>
          <td>
            <button className="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td> Offer Book 3 </td>
          <td>14/5/2024</td>
          <td>16/7/2024</td>
          <td>
            <button className="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
        
       
      </tbody>
      
      <Link to={"add"} className="new-book btn btn-success mt-2">Add New Offer</Link>    
    </Table>
    
        </div>
  )
}

export default AdminOffers;