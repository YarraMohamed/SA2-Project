import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

const UserOffers = () => {
  return (
      <div className="home-container p-3">
          <div className='row'>
              <div className="col-3 mb-5">
                    <Card className='mx-2'>
                        <Card.Body >
                        <Card.Title className='fs-2 fw-bold'>Offer Title</Card.Title>
                        <Card.Text className='mb-1'>
                            <span className='fs-5 fw-bold text-success'>Begin date:</span> 29/4/2022
                        </Card.Text>
                        <Card.Text>
                            <span className='fs-5 fw-bold text-danger'>End date:</span> 29/6/2022
                        </Card.Text>  
                        <Link className="btn btn-dark me-2" variant="primary" to={"/"}>Get Offer Now</Link> 
                        </Card.Body>
                    </Card>
                </div>
              <div className="col-3 mb-5">
                    <Card className='mx-2'>
                        <Card.Body >
                        <Card.Title className='fs-2 fw-bold'>Offer Title</Card.Title>
                        <Card.Text className='mb-1'>
                            <span className='fs-5 fw-bold text-success'>Begin date:</span> 29/4/2022
                        </Card.Text>
                        <Card.Text>
                            <span className='fs-5 fw-bold text-danger'>End date:</span> 29/6/2022
                        </Card.Text>  
                        <Link className="btn btn-dark me-2" variant="primary" to={"/"}>Get Offer Now</Link> 
                        </Card.Body>
                    </Card>
                </div>
              <div className="col-3 mb-5">
                    <Card className='mx-2'>
                        <Card.Body >
                        <Card.Title className='fs-2 fw-bold'>Offer Title</Card.Title>
                        <Card.Text className='mb-1'>
                            <span className='fs-5 fw-bold text-success'>Begin date:</span> 29/4/2022
                        </Card.Text>
                        <Card.Text>
                            <span className='fs-5 fw-bold text-danger'>End date:</span> 29/6/2022
                        </Card.Text>  
                        <Link className="btn btn-dark me-2" variant="primary" to={"/"}>Get Offer Now</Link> 
                        </Card.Body>
                    </Card>
                </div>
              <div className="col-3 mb-5">
                    <Card className='mx-2'>
                        <Card.Body >
                        <Card.Title className='fs-2 fw-bold'>Offer Title</Card.Title>
                        <Card.Text className='mb-1'>
                            <span className='fs-5 fw-bold text-success'>Begin date:</span> 29/4/2022
                        </Card.Text>
                        <Card.Text>
                            <span className='fs-5 fw-bold text-danger'>End date:</span> 29/6/2022
                        </Card.Text>  
                        <Link className="btn btn-dark me-2" variant="primary" to={"/"}>Get Offer Now</Link> 
                        </Card.Body>
                    </Card>
                </div>
              <div className="col-3 mb-5">
                    <Card className='mx-2'>
                        <Card.Body >
                        <Card.Title className='fs-2 fw-bold'>Offer Title</Card.Title>
                        <Card.Text className='mb-1'>
                            <span className='fs-5 fw-bold text-success'>Begin date:</span> 29/4/2022
                        </Card.Text>
                        <Card.Text>
                            <span className='fs-5 fw-bold text-danger'>End date:</span> 29/6/2022
                        </Card.Text>  
                        <Link className="btn btn-dark me-2" variant="primary" to={"/"}>Get Offer Now</Link> 
                        </Card.Body>
                    </Card>
                </div>
          </div>
      </div>
  )
}

export default UserOffers;