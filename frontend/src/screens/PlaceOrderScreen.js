import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { createOrder } from '../actions/orderActions'

function PlaceOrderScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const orderCreate = useSelector(state => state.orderCreate)
    // const {order, error, success} = orderCreate

    const orderCreate = useSelector(state => state.orderCreate)

    const {success, error, order} = orderCreate

    const cart = useSelector(state => state.cart)

    cart.totalItemsPrice = cart.cartItems.reduce((totalPrice, item) => totalPrice + (item.qty * item.price), 0).toFixed(2)
    cart.shippingPrice = (cart.totalItemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.totalItemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.totalItemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment')
        }

        if (success) {
            navigate(`/order/${order._id}`)
        }

    }, [success, navigate])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            totalItemsPrice: cart.totalItemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,

        }))
    }

    return (
        <div>
        <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        {/* SHIPPING */}
                        <ListGroup.Item>
                            <h2>SHIPPING</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        {/* PAYMENT METHOD */}
                        <ListGroup.Item>
                            <h2>PAYMENT METHOD</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        {/* ORDER ITEMS */}
                        <ListGroup.Item>
                            <h2>ORDER ITEMS</h2>

                            {cart.cartItems.length == 0
                            ? <Message variant='info'>Your cart is empty</Message>
                            : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
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
                                    <Col>€{cart.totalItemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>€{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>€{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>€{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message> }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type='button'
                                        className='btn-block'
                                        variant='primary'
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrder}
                                        >
                                        PLACE ORDER
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen