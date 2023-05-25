import {Form, Button} from "react-bootstrap"
import * as React from "react"

function LoginPage({handleLoginSubmit}){




    
    return(
        <div>
            
            <div className='bg-image'>
                
                <div className="background-form">
                    <Form className="bootstrap-form rounded p-4 p-sm-3" onSubmit={handleLoginSubmit} >
                        <img  className='login-logo' src='/vinfetcher_v3.png' />
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
                        <input type='password' name='password' />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                        Login
                        </Button>
                        <br/>
                        <span>Not a member? <a href="/signup">Sign up!</a></span>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage