import React, { useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { InputLogin } from '../../lib/types';
import { handleLogin } from '../../lib/api';

export function Login() {
    const [error, setError] = useState<string>("")
    const [succes, setSucces] = useState<string>("")
    const navigate = useNavigate()
    const { register, reset, handleSubmit, formState: { errors } } = useForm<InputLogin>()

    const handleSave = (data: InputLogin) => {
        handleLogin(data)
            .then(response => {
                if (response.status == "error" && response.message) {
                    setError(response.message)
                }else{
                    setError("")
                    setSucces("Login successful! Redirecting to your profile...")
                    setTimeout(() => {
                        navigate("/profile")
                    }, 1000)
                }
            })
         
        reset()
    }

    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />

                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login Info</h3>
                            <p>Don't you have an account? <Link to={'/'}>Signup Now</Link></p>
                            <h3 className='text-success'>{succes}</h3>
                            <h3 className='text-danger'>{error}</h3>

                            <form onSubmit={handleSubmit(handleSave)}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    placeholder='Please enter your login'
                                    {...register("login", {
                                        required: "Oops, you forgot to fill in your login",
                                    })}
                                />
                                {errors.login && <p className='text-danger'>{errors.login.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='password'
                                    placeholder='Please enter your password'
                                    {...register("password", {
                                        required: "Oops,you forgot to fill in your password",
                                    })}
                                />
                                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>



                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}