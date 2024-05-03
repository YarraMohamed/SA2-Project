import React , {useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddOffers = () => {

  const [discounts,setDiscounts] = useState ({
    err: "",
    success : "",
    loading: false,
    success: null,
    discount :"",
    BeginDiscount : "",
    endDiscount : "",
  })

  const createDiscount = (e) => {
    e.preventDefault();

    setDiscounts({ ...discounts, loading: true });
    axios.post("http://localhost:6003/api/discount/",{
      discount : discounts.discount,
      BeginDiscount : discounts.BeginDiscount,
      endDiscount : discounts.endDiscount,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((resp) => {
        console.log(`resp ${resp}`)
        setDiscounts({
          ...discounts,
          discount: "",
          BeginDiscount: "",
          endDiscount : "",
          err: null,
          loading: false,
          success: "Book Created Successfully !",
        });
      })
      .catch((err) => {
        setDiscounts({
          ...discounts,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="login-container">
      <h1 className="mb-4">Add New Offer</h1>

      {discounts.err && (
        <Alert variant="danger" className="p-2">
          {discounts.err}
        </Alert>
      )}

      {discounts.success && (
        <Alert variant="success" className="p-2">
          {discounts.success}
        </Alert>
      )}

    <Form onSubmit={createDiscount}>

        <Form.Group className="mb-3">
          <Form.Control type="text"
            value={discounts.discount} onChange={(e) => setDiscounts({ ...discounts, discount: e.target.value })}
            required
            placeholder="Offer" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="text"
            value={discounts.BeginDiscount} onChange={(e) => setDiscounts({ ...discounts, BeginDiscount: e.target.value })}
            required
            placeholder="Start date" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="text"
            value={discounts.endDiscount} onChange={(e) => setDiscounts({ ...discounts, endDiscount: e.target.value })}
            required
            placeholder="End date" />
        </Form.Group>

        <Button className="btn btn-dark" variant="primary" type="submit">
          Add New Offer
        </Button>

      </Form>
    </div>
  )
}

export default AddOffers;
