import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Card from 'react-bootstrap/Card';

const UserOffers = () => {

  const [discount, setDiscount] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
  })

  useEffect(() => {
    setDiscount({ ...discount, loading: true })
    axios.get("http://localhost:6003/api/discount/")
      .then(resp => {
        console.log(resp);
        setDiscount({ ...discount, results: resp.data.data, loading: false, err: null })

      })
      .catch(err => {
        setDiscount({ ...discount, loading: false, err: "something went wrong, please try again later!" })
      })
  }, [discount.reload])

  return (
    <div className="home-container p-3">
      {discount.loading === true && (
        <Spinner animation="border" role="status" variant="dark">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {discount.loading === false && discount.err !== null && (
        <Alert variant="danger" className="p-1">
          This service isn't available now, please try again later
        </Alert>
      )}

      <div className='row'>
        {discount.results.map((offer, index) => (
          <div className="col-3 mb-5" key={index}>
            <Card className='mx-2'>
              <Card.Body>
                <Card.Title className='fs-2 fw-bold'>{offer.discount}</Card.Title>
                <Card.Text className='mb-1'>
                  <span className='fs-5 fw-bold text-success'>Begin date:</span> {offer.BeginDiscount}
                </Card.Text>
                <Card.Text>
                  <span className='fs-5 fw-bold text-danger'>End date:</span> {offer.endDiscount}
                </Card.Text>
                <Link className="btn btn-dark me-2" variant="primary" to={"/"}>Get Offer Now</Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserOffers;
