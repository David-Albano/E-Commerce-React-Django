import React, { useEffect, useState} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'

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

    return (
        <div>CartScreen</div>
    )

}

export default CartScreen
