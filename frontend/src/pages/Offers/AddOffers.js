import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const AddOffers = () => {
  const [offer, setOffer] = useState({
    err: "",
    success: "",
    loading: false,
    discount: "",
    beginDiscount: "",
    endDiscount: "",
  });

  const addDiscount = (e) => {
    e.preventDefault();
    setOffer({ ...offer, loading: true });
    axios
      .post("http://localhost:6003/api/discount/", {
        discount: offer.discount,
        BeginDiscount: offer.beginDiscount,
        endDiscount: offer.endDiscount
      })
      .then((resp) => {
        setOffer({
          ...offer,
          discount: "",
          beginDiscount: "",
          endDiscount: "",
          err: null,
          loading: false,
          success: "Offer added Successfully !",
        });

      })
      .catch((err) => {
        setOffer({
          ...offer,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  return (
    <div className="login-container">
      <h1 className="mb-4">Add New Offer</h1>

      {offer.err && (
        <Alert variant="danger" className="p-2">
          {offer.err}
        </Alert>
      )}

      {offer.success && (
        <Alert variant="success" className="p-2">
          {offer.success}
        </Alert>
      )}

      <Form onSubmit={addDiscount}>

        <Form.Group className="mb-3">
          <Form.Control type="text"
            value={offer.discount} onChange={(e) => setOffer({ ...offer, discount: e.target.value })}
            required
            placeholder="Offer" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="text"
            value={offer.beginDiscount} onChange={(e) => setOffer({ ...offer, beginDiscount: e.target.value })}
            required
            placeholder="Start date" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="text"
            value={offer.endDiscount} onChange={(e) => setOffer({ ...offer, endDiscount: e.target.value })}
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
