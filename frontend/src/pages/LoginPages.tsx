import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import type { LoginForm } from '../types/index'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LoginPage: React.FC = () => {
         
    const navigate = useNavigate();

    const { login } = useAuth();

    YupPassword(Yup);

    const initialValues: LoginForm  = {
        usernameOrEmail: '',
        password: ''
    }

    const validationSchema = Yup.object({
        usernameOrEmail: Yup.string().required('Required'),
        password: Yup.string().password().required('Required'),
    })


    const onSubmit = async (values: LoginForm)  => {
        await axios.post('http://localhost:16120/chat-app/auth/login', {
            "username": values.usernameOrEmail,
            "password": values.password
        })
        .then(response => {
            login(response.data.token);
            navigate("/chat-app/");
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
                    <label htmlFor="usernameOrEmail">Username</label>
                    <Field 
                        type="text"
                        id="usernameOrEmail"
                        name="usernameOrEmail"    
                    />
                    <ErrorMessage name="usernameOrEmail"/>
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
                <button type="submit">Login</button>
            </Form>
        </Formik>
    )
}