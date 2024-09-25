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
import { InputUser } from '../../lib/types';
import { handelSignup } from '../../lib/api';

export function Signup() {
    const [succes, setSucces] = useState<string>("")
    const [error, setError] = useState<string>()
    const navigate = useNavigate()
    const { register, reset, handleSubmit, formState: { errors } } = useForm<InputUser>()

    const handleSave = (data: InputUser) => {
        handelSignup(data)
            .then(response => {
                if (response.status == "error" && response.message) {
                    setError(response.message)
                } else {
                    setError("")
                    setSucces("Finally!Thank you for being awesome!")
                    setTimeout(() => {
                        navigate("/login")
                    }, 2000)
                }
            })
            .catch(console.warn)
        reset()
    }
    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />

                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                            <p>Already have an account? <Link to={'/login'}>Login Now</Link></p>
                            <h3 className='text-success'>{succes}</h3>
                            <h3 className='text-danger'>{error}</h3>

                            <form onSubmit={handleSubmit(handleSave)}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Name'
                                    type='text'
                                    placeholder='Please enter your name'
                                    {...register("name", {
                                        required: "Oops, you forgot to fill in your name"
                                    })}
                                />
                                {errors.name && <p className='text-danger'>{errors.name.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Surname'
                                    type='text'
                                    placeholder='Please enter your surname'
                                    {...register("surname", {
                                        required: "Oops,you forgot to fill in your surname"
                                    })}
                                />
                                {errors.surname && <p className='text-danger'>{errors.surname.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    placeholder='Please enter your login'
                                    {...register("login", {
                                        required: "Oops,you forfot to fill in your login",
                                        pattern: {
                                            value: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
                                            message: "your login is invalid"
                                        }
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
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                                            message: "your password is invalid"
                                        }
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
