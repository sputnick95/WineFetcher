import {Form, Button} from "react-bootstrap"
import * as React from "react"

function LoginPage({handleLoginSubmit}){




    
    return(
        <div className="background-form">
            <div className="login-form d-flex justify-content-center align-items-center">
            <Form className="bootstrap-form rounded p-4 p-sm-3" onSubmit={handleLoginSubmit} >
                <Form.Group className="mb-3">
                <h1>Login</h1>
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
                
                <Button variant="primary" type="submit">
                Login
                </Button>
                <br/>
                <span>Not a member? <a href="/signup">Sign up!</a></span>
            </Form>
            </div>
        </div>
    )
}

export default LoginPage