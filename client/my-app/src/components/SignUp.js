import {Form, Button} from "react-bootstrap"
import * as React from "react"
import {useNavigate} from "react-router-dom"

function SignUp(){
    const navigate = useNavigate();

    
    function handleSubmit(event){
        event.preventDefault()
        const data = {
            email: event.target.email.value,
            username: event.target.username.value,
            password: event.target.password.value
        }
        fetch('/user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(data => console.log(data))
        .then(() => navigate('/login'))
    }



    return(
        <div className="background-form">
            <div className="login-form d-flex justify-content-center align-items-center">
            <Form className="bootstrap-form rounded p-4 p-sm-3" onSubmit={handleSubmit} >
                <Form.Group className="mb-3">
                <h1>Sign Up</h1>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <br/>
                <input type='text' name='email' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>
                <br/>
                <input type='text' name='username' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <br/>
                <input type='text' name='password' />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formShippingAddress">
                <Form.Label>Shipping Address:</Form.Label>
                <br/>
                <input type='text' name='shipping-address' />
                </Form.Group> */}
                

                <Button variant="primary" type="submit"  >
                Sign Up
                </Button>
                <br/>
            </Form>
            </div>
        </div>
    )
}

export default SignUp
