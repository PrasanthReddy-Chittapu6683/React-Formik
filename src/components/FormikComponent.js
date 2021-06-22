import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import * as Yup from 'yup'
import ErrorText from "./ErrorText";


const FormikComponent = () => {
    const initialValues = {
        name: '',
        email: '',
        channel: '',
        comments: '',
        address: '', address_two: '',
        social: {
            facebook: '',
            twitter: ''
        },
        phoneNumbers: ['', ''],
        otherLinks: ['']
    }

    const onSubmit = (values) => {
        console.log("SUBMITTT", values)
    }
    /** YUP : Validation schema for form fields */
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is Required - YUP'),
        email: Yup.string().email('Invalid email format').required('email is Required - YUP'),
        channel: Yup.string().required('Channel is Required - YUP'),
        // comments: Yup.string().required('Comments is Required - YUP'),
        address: Yup.string().required('Address is Required - YUP'),
        address_two: Yup.string().required('Address 2 is Required - YUP')
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


    const validateCommnents = (values) => {
        let error;
        if (!values) {
            error = 'Comments Requrired (Field Level Error validation)'
        }
        return error;
    }
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
                    {/* Render error message using custome component using 'component' props */}
                    <ErrorMessage component={ErrorText} name='name' />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <Field type="email"
                        id="email" name='email' />
                    {/* Render Props pattern for Error Messages */}
                    <ErrorMessage name='email' >
                        {
                            errMsg =>
                                <div className='error'> {errMsg}</div>
                        }
                    </ErrorMessage>
                </div>
                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <Field type="text"
                        id="channel" name='channel' />
                    <ErrorMessage className='error' component='div' name='channel' />
                </div>
                <div className="form-control">
                    <label htmlFor="comments">Comments</label>
                    <Field as='textarea' validate={validateCommnents}
                        id="comments" name='comments' >
                    </Field>
                    <ErrorMessage component={ErrorText} name='comments' />
                </div>

                {/*START: FastField components used for Performance issues */}
                <div className="form-control">
                    <label htmlFor="address">Address 1</label>
                    <FastField name='address' >
                        {
                            (props) => {
                                console.log("FAST FIELD RENDER")

                                const { field, form, meta } = props;
                                return (
                                    <div>
                                        <input type='text' id='address' placeholder='using Fast Field Component' {...field} />
                                        {/* {meta.touched && meta.error ? <div>{meta.error} </div> : null} */}
                                        <ErrorMessage name='address' >
                                            {
                                                errMsg =>
                                                    <div className='error'> {errMsg}</div>
                                            }
                                        </ErrorMessage>
                                    </div>
                                )
                            }
                        }
                    </FastField>

                </div>



                {/*END: FastField components used for Performance issues */}

                {/*START: Nested object for Facebook and Twitter fields */}
                <div className="form-control">
                    <label htmlFor="facebook">Facebook Profile</label>
                    <Field type='text'
                        id="facebook" name='social.facebook' >
                    </Field>
                    <ErrorMessage className='error' component='div' name='social.facebook' />
                </div>
                <div className="form-control">
                    <label htmlFor="twitter">Twitter Profile</label>
                    <Field type='text'
                        id="twitter" name='social.twitter' >
                    </Field>
                    <ErrorMessage className='error' component='div' name='social.twitter' />
                </div>
                {/*END: Nested object for Facebook and Twitter fields */}

                {/*START: ARRAY object for Phone Number fields */}

                <div className="form-control">
                    <label htmlFor="phoneNumbers">Phone Numbers1</label>
                    <Field type='text'
                        id="phoneNumbers" name='phoneNumbers[0]' >
                    </Field>
                    <ErrorMessage className='error' component='div' name='phoneNumbers[0]' />
                </div>
                <div className="form-control">
                    <label htmlFor="phoneNumbers">Phone Numbers2</label>
                    <Field type='text'
                        id="phoneNumbers" name='phoneNumbers[1]' >
                    </Field>
                    <ErrorMessage className='error' component='div' name='phoneNumbers[1]' />
                </div>
                {/*END: ARRAY object for Phone Number fields */}

                {/*START: FieldArray components to display dynamically */}
                <div className='form-control'>
                    <label> Other URLS</label>
                    {/* use Render props pattern to get better control on the field */}
                    <FieldArray name='otherLinks'>
                        {
                            fieldArrayProps => {
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                const { otherLinks } = values;
                                return <div>
                                    {
                                        otherLinks.map((lnk, index) => (
                                            <div key={index}>
                                                <Field name={`otherLinks[${index}]`}></Field>
                                                {index > 0 &&
                                                    <button type='button' onClick={() => remove(index)}>{' '}-{' '}</button>
                                                }
                                                <button type='button' onClick={() => push('')}>{' '}+ {' '}</button>

                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        }
                    </FieldArray>
                </div>




                {/*END: FieldArray components to display dynamically */}

                <button type='submit'> Submit</button>
            </Form>
        </Formik>
    )
}

export default FormikComponent
