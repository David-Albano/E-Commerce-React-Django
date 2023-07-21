import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { PROFILE_UPDATE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [successUpdate, setSuccessUpdate] = useState(false)

    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile
    
    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {

            if(!user || !user.name || success) {
                dispatch({type: PROFILE_UPDATE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())

            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch, navigate, user, userInfo, success])


    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword) {
            setMessage('Passwords do not match')
            setSuccessUpdate(false)
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setSuccessUpdate(true)
            setMessage('Details successfully updated')
        }
    }

    return (
        <Row>
            <Col md={3}>
                {message && <Message  variant={successUpdate ? 'success' : 'warning'}>{message}</Message>}
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}

                <FormContainer md={2}>
                    <h2>USER PROFILE</h2>

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            required
                            type='text'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId='email' className='mt-4'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId='password' className='mt-4'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId='passwordConfirm' className='mt-4'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </Form.Group>

                        <Button className='mt-4' type='submit' variant='primary'>UPDATE</Button>
                    </Form>
                </FormContainer>
            </Col>

            <Col md={9}>
                <h2>MY ORDERS</h2>

                {loadingOrders ? (
                    <Loader/>
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) :
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr style={{textAlign: 'center'}}>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Order</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                        orders.map(order => (
                            <tr key={order._id} style={{textAlign: 'center'}}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.slice(0, 10)}</td>
                                <td>€{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.slice(0, 10) : <i className="fas fa-times" style={{color: 'red'}} ></i>}</td>
                                <td>{order.isDelivered ? order.deliveredAt.slice(0, 10) : <i className="fas fa-times" style={{color: 'red'}} ></i>}</td>
                                
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
            }

            </Col>
        </Row>
    )
}

export default ProfileScreen