import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'

function OrderScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { id } = useParams()

    const orderDetails = useSelector(state => state.orderDetails)

    const {loading, error, order} = orderDetails

    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((totalPrice, item) => totalPrice + (item.qty * item.price), 0).toFixed(2)
    }

    useEffect(() => {
        if(!order || order._id !== Number(id)) {
            dispatch(getOrderDetails(id))
        }
    }, [order, id])

    return loading ? (
        <Loader/>

    ) : error ? (
        <Message variant='danger'>{error}</Message>

    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        {/* SHIPPING */}
                        <ListGroup.Item>
                            <h2>SHIPPING</h2>
                            <p><strong>Name: </strong> {order.user.name.toUpperCase()}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}> {order.user.email.toUpperCase()}</a></p>

                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                        :  <Message variant='warning'>Not Delivered</Message>
                            }

                        </ListGroup.Item>

                        {/* PAYMENT METHOD */}
                        <ListGroup.Item>
                            <h2>PAYMENT METHOD</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message>
                                        :  <Message variant='warning'>Not Paid</Message>
                            }

                        </ListGroup.Item>

                        {/* ORDER ITEMS */}
                        <ListGroup.Item>
                            <h2>ORDER ITEMS</h2>

                            {order.orderItems.length == 0
                            ? <Message variant='info'>Order is empty</Message>
                            : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X €{item.price} = €{(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>ORDER SUMMARY</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>€{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>€{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>€{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>€{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen