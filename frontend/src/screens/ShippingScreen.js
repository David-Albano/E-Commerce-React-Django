import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2></CheckoutSteps>

            <h1>SHIPPING</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mt-4' controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter address'
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mt-4' controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter city'
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mt-4' controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode ? postalCode : ''}
                    onChange={(e) => setPostalCode(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mt-4' controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter country'
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value)}/>
                </Form.Group>

                <Button className='mt-4' type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen