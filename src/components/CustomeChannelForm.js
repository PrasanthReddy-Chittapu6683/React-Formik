import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'



const ChannelForm = () => {
    const initialValues = {
        name: 'REDDY',
        email: '',
        channel: ''
    }

    const onSubmit = (values) => {
        console.log("SUBMITTT", values)
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is Required - YUP'),
        email: Yup.string().email('Invalid email format').required('email is Required - YUP'),
        channel: Yup.string().required('channel is Required - YUP')
    })
    const validate = (values) => {
        // values.name
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

    const formData = useFormik({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validationSchema: validationSchema
        // validate: validate
    })

    console.log("form Values::: >>> ", formData.values)
    console.log("ERROR::::", formData.errors)
    console.log("Visited Fields::::", formData.touched)
    return (
        <div>
            <form onSubmit={formData.handleSubmit} >
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        onBlur={formData.handleBlur}
                        onChange={formData.handleChange} value={formData.values.name} id="name" name='name' />
                    {formData.touched.name && formData.errors.name ?
                        <div className="error">{formData.errors.name}</div> : <></>}
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" onBlur={formData.handleBlur} onChange={formData.handleChange} value={formData.values.email} id="email" name='email' />
                    {formData.touched.email && formData.errors.email ? <div className="error">{formData.errors.email}</div> : <></>}
                </div>
                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" onBlur={formData.handleBlur} onChange={formData.handleChange} value={formData.values.channel} id="channel" name='channel' />
                    {formData.touched.channel && formData.errors.channel ? <div className="error"> {formData.errors.channel}</div> : <></>}
                </div>
                <button type='submit'> Submit</button>
            </form>
        </div>
    )
}

export default ChannelForm
