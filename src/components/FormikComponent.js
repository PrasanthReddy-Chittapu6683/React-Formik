import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'



const FormikComponent = () => {
    const initialValues = {
        name: 'REDDY',
        email: '',
        channel: ''
    }

    const onSubmit = (values) => {
        console.log("SUBMITTT", values)
    }
    /** YUP : Validation schema for form fields */
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is Required - YUP'),
        email: Yup.string().email('Invalid email format').required('email is Required - YUP'),
        channel: Yup.string().required('channel is Required - YUP')
    })

    /** Custome Validation logic */
    const validate = (values) => {

        let errors = {}

        if (!values.name) {
            errors.name = 'Name is required'
        }
        if (!values.email) {
            errors.email = 'Email is required'
        }
        // else if (!/^A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //     errors.email = 'Invalid Email format'
        // }
        if (!values.channel) {
            errors.channel = 'Channel is required'
        }

        return errors
    }

    // const formData = useFormik({
    //     initialValues: initialValues,
    //     onSubmit: onSubmit,
    //     validationSchema: validationSchema
    //     // validate: validate
    // })

    // console.log("form Values::: >>> ", formData.values)
    // console.log("ERROR::::", formData.errors)
    // console.log("Visited Fields::::", formData.touched)
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form  >
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <Field type="text"
                        id="name" name='name' />
                    <ErrorMessage className='error' name='name' />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <Field type="email"
                        id="email" name='email' />
                    <ErrorMessage name='email' />
                </div>
                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <Field type="text"
                        id="channel" name='channel' />
                    <ErrorMessage name='channel' />
                </div>
                <button type='submit'> Submit</button>
            </Form>
        </Formik>
    )
}

export default FormikComponent
