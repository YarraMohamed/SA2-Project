import React , {useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const AdminOffers = () => {
    const [discount,setDiscount] = useState ({
    loading : true,
    results : [],
    err : null,
    reload : 0
  })
  useEffect(()=>{
    setDiscount({...discount, loading : true })
    axios.get("http://localhost:6003/api/discount/")
    .then(resp =>{
      console.log(resp);
      setDiscount({...discount , results :resp.data.data,loading : false , err : null })

    })
    .catch(err =>{
      setDiscount({...discount, loading : false , err :"This service is down now, please try again later" })
    })
  },[discount.reload])

  const deleteDiscount = (id) => {
    axios
      .delete("http://localhost:6003/api/discount/" + id)
      .then((resp) => {
        setDiscount({ ...discount, reload: discount.reload + 1 });
      })
      .catch((err) => {
        setDiscount({...discount, loading : false , err :"something went wrong , please try again later!" })
      });
  };

  return (
    <div className="manage-books p-5">
      
    {discount.loading === true && (
      <Spinner animation="border" role="status" variant="Dark">
      <span className="visually-hidden">Loading...</span>
     </Spinner>
        )}

{ discount.loading === false && discount.err!== null && (
         <Alert variant="danger" className="p-1">
               This service isn't available now, please try again later
          </Alert>
          )}
          
        <div className="header-table mb-4">
        <h3 className="text-center">Manage Offers</h3>
        </div>
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
      {discount.results.map(index =>
            <tr key={index._id}>
          <td>{index._id}</td>
          <td>{index.discount} </td>
          <td>{index.BeginDiscount} </td>
          <td>{index.endDiscount} </td>
          <td>
            <button className="btn btn-sm btn-danger" 
            onClick={(e) => {
              deleteDiscount(index._id);
                  }}
                  >
            Delete
            </button>
          </td>
        </tr>
          )}
    
           
      </tbody>
      
      <Link to={"add"} className="new-book btn btn-success mt-2">Add New Offer</Link>    
    </Table>
    
        </div>
  )
}

export default AdminOffers;