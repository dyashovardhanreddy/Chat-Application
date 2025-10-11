import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import axios from 'axios';
import type { RegistrationForm } from "../types";


export const RegisterPage: React.FC = () => {

    YupPassword(Yup);

    const initialValues: RegistrationForm  = {
        username: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid e-mail format'),
        firstname: Yup.string().required('Required'),
        password: Yup.string().password().required('Required'),
        confirmPassword: Yup.string().password().required('Required')
    })


    const onSubmit = (values: RegistrationForm)  => {
        axios.post('http://localhost:16120/chat-app/auth/register', {
            "username": values.username,
            "password": values.password,
            "confirmPassword": values.confirmPassword,
            "email": values.email,
            "firstname": values.firstname
        })
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
    return(
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema} 
            onSubmit={onSubmit}   
        >
            <Form>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <Field 
                        type="text"
                        id="username"
                        name="username"    
                    />
                    <ErrorMessage name="username"/>
                </div>
                <div className="form-control">
                    <label htmlFor="firstname">First Name</label>
                    <Field 
                        type="text"
                        id="firstname"
                        name="firstname"    
                    />
                    <ErrorMessage name="firstname"/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <Field 
                        type="password"
                        id="password"
                        name="password"    
                    />
                    <ErrorMessage name="password"/>
                </div>
                <div className="form-control">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field 
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"    
                    />
                    <ErrorMessage name="confirmPassword"/>
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <Field 
                        type="text"
                        id="email"
                        name="email"    
                    />
                    <ErrorMessage name="email"/>
                </div>
                <button type="submit">Register</button>
            </Form>
        </Formik>
    )
}