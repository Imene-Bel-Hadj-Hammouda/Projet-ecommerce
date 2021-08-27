import React from 'react'
import 'antd/dist/antd.css'
import { Form, Input, Button, Checkbox, Row, Col, Result, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerclient, selectregistration } from '../features/clients/clientsSlice';

const Register = () => {

    const dispatch = useDispatch()

    const registration = useSelector(selectregistration)

    const onFinish = (values) => {
        console.log('Success:', values);

        let data = {
            name: values.name,
            email: values.email,
            password: values.password
        }

        dispatch(registerclient(data))

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {registration.registerstatus === 'success' ? <RegisterResult /> : <div className='products-catagories-area clearfix' >

                <Form
                    style={{ marginTop: "150px" }}
                    name="basic"
                    labelCol={{
                        span: 4,
                        offset: 3
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row>
                        <Col span={2} offset={10} >
                            <h1>Register</h1>
                        </Col>
                    </Row>

                    

                    <Row>
                        <Col span={8} offset={7} >
                            {
                                registration.registerstatus === 'failure'
                                &&
                                <Alert style={{ marginBottom: "10px" }} message={registration.error} type="error" showIcon />
                            }
                        </Col>
                    </Row>


                    <Form.Item
                        label="Username"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 7,
                            span: 8,
                        }}
                    >
                        <Button style={{ background: "#FBB808", outline: "none", width: '100%', border: 'none' }} type="primary" htmlType="submit">
                            register
                        </Button>
                    </Form.Item>
                </Form>
            </div>}
        </>
    )
}

function RegisterResult() {
    return (
        <div style={{ alignSelf:'center' }} >

            <Result
                status="success"
                title="Successfully registred login naw !"
                extra={[
                    <Button onClick={()=> window.location.href = '/login'}  type="primary" key="console">
                        Login
                    </Button>
                ]}
            />
        </div>
    )
}

export default Register

// react & redux
// react => action => redux  (usedispatch(action elifi slice))
// react can read state from redux (useSlector (selectuer))