import React from 'react'
import 'antd/dist/antd.css'
import { Form, Input, Button, Checkbox, Row, Col, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectauthentication } from '../features/users/usersSlice';

const Login = () => {

    const dispatch = useDispatch()

    const authentication = useSelector(selectauthentication)

    const onFinish = (values) => {
        console.log('Success:', values);

        let data = {
            email : values.email,
            password : values.password
        }

        dispatch(login(data))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='products-catagories-area clearfix' >
            
            <Form
            style={{marginTop:"200px"}}
                name="basic"
                labelCol={{
                    span: 4,
                    offset:3
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
                        <h1>Login</h1>
                    </Col>
                </Row>

                <Row>
                    <Col span={8} offset={7} >
                        {
                            authentication.authstatus === 'failure'
                            &&
                            <Alert style={{ marginBottom: "10px" }} message={authentication.error} type="error" showIcon />
                        }
                    </Col>
                </Row>
                
                <Form.Item
                    label="Email"
                    name="email"
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
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 7,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 7,
                        span: 8,
                    }}
                >
                    <Button style={{background:"#FBB808",outline:"none",width:'100%',border:'none'}} type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login