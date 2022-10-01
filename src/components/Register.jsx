import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const Register = () => {
    const initialValues = {
        username: '',
        name: '',
        password: '',
        confirmPassword: ''
    };

    const onSubmit = (values) => {
        axios
            .post('http://localhost:4000/register', values)
            .then((res) => {
                localStorage.setItem('username', res.data[0][0].username)
                localStorage.setItem('userId', res.data[0][0].userid)
                localStorage.setItem('name', res.data[0][0].name)
            })
            .catch(error => console.log(error.response.data))

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
        if (!values.name) {
            errors.name = 'You gotta have a name!'
        };
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Password must match!'
        };
        return errors;

    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type='text'
                    name='name'
                    onChange={formik.handleChange}
                    placeholder='enter name'
                    value={formik.values.name}
                />
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
                <input
                    type='password'
                    name='confirmPassword'
                    onChange={formik.handleChange}
                    placeholder='confirm password'
                    value={formik.values.confirmPassword}
                />
                <button type='submit' disabled={!formik.isValid}>Submit</button>
            </form>
            <div>
                {formik.errors.username ? <div>{formik.errors.username}</div> : null}
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
            </div>
        </div>
    );
};

export default Register;