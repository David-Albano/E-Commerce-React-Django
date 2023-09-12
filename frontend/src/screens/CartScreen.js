import React, { useEffect, useState} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen() {
    const dispatch = useDispatch()
    
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    
    const { id } = useParams()
    const productId = id
    const qty = Number(searchParams.get('qty'))
    
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    
    useEffect(() => {
        if(productId){
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, productId, qty])
    
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }

    return (
        <div>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message variant='info'>
                            Your cart is empty <Link to='/'>Go back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>

                                        <Col md={3}>
                                            <Link to={`/product/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </Col>

                                        <Col md={2}>
                                            <strong>€{item.price}</strong>
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                className='quantity'
                                                as='select'
                                                value={item.qty}
                                                onChange={(e)=> dispatch(addToCart(item._id, Number(e.target.value)))}
                                                >
                                                {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>

                                        <Col md={1}>
                                            <Button
                                            className='trash-can'
                                            type='button'
                                            varian='light'
                                            onClick={()=> removeFromCartHandler(item._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>

                <Col md={4}>
                    <Card className='p-2'>
                        <ListGroup variant='flush'>
                            <ListGroup>
                                <h2>
                                    Subtotal ({cartItems.reduce((totalItems, item) => (totalItems + Number(item.qty)), 0)} ITEMS)
                                </h2>
                                <h5>
                                    €{cartItems.reduce((totalValue, item) => (totalValue + Number(item.price * item.qty)), 0).toFixed(2)}
                                </h5>
                            </ListGroup>
                            <ListGroup.Item>
                                <Button className='btn-block'
                                        type='button'
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                        >
                                    PROCEED TO CHECK OUT
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>                
                </Col>
            </Row>
        </div>
    )

}

export default CartScreen
