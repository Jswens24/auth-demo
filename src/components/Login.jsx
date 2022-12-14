import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = (props) => {
    let navigate = useNavigate();
    const initialValues = {
        username: '',
        password: ''
    };

    const onSubmit = (values) => {
        axios
            .post('http://localhost:4000/login', values)
            .then((res) => {
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('userId', res.data.userid)
                localStorage.setItem('name', res.data.name)
                props.logFunction()
                navigate('/secret')
            })
            .catch(err => console.log(err.response.data))
    };

    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Username Required';
        };
        if (!values.password) {
            errors.password = 'Password Required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be longer than 8 characters';
        };
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type='text'
                    name='username'
                    onChange={formik.handleChange}
                    placeholder='enter username'
                    value={formik.values.username}
                />
                <input
                    type='password'
                    name='password'
                    onChange={formik.handleChange}
                    placeholder='enter password'
                    value={formik.values.password}
                />
                <button type='submit' disabled={!formik.isValid}>Submit</button>
            </form>
        </div>
    );
};

export default Login;