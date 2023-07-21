import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../actions/userActions'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector(state => state.userRegister)

    const {loading, error, userInfo} = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        
        if(password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }
    
    return (
        <div>
        {message && <Message  variant='warning'>{message}</Message>}
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}

        <FormContainer>
            <h1>Sign Up</h1>

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
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId='passwordConfirm' className='mt-4'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    required
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                </Form.Group>

                <Button className='mt-4' type='submit' variant='primary'>Sign Up</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Already Have An Account? <Link to='/login'>Sign In</Link>
                </Col>
            </Row>

        </FormContainer>
        </div>
    )
}

export default RegisterScreen