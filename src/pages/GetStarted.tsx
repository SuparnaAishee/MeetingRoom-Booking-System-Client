import { Tabs, Form, Input, Button, Checkbox, Row, Col, Typography } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoginSignupForm = () => {
  // Function to handle form submission
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoginSubmit = (values: any) => {
    console.log('Login Form Values:', values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSignupSubmit = (values: any) => {
    console.log('Sign-Up Form Values:', values);
  };

  return (
    <Row justify="center" style={{ backgroundColor: '#f5f5f5', padding: '50px 0' }}> {/* gray-100 */}
      <Col xs={24} sm={18} md={12} lg={10}>
        <div className="form-container" style={{ padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <Title level={3} style={{ color: '#22c55e', textAlign: 'center' }}> {/* green-500 */}
            Welcome! Please Login or Sign Up
          </Title>
          
          {/* Tabs for Login and Sign Up */}
          <Tabs defaultActiveKey="1" centered>
            {/* Login Tab */}
            <Tabs.TabPane tab="Login" key="1">
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={handleLoginSubmit}
              >
                {/* Username */}
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please enter your username!' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                  />
                </Form.Item>

                {/* Password */}
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>

                {/* Remember Me Checkbox */}
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%', backgroundColor: '#22c55e', borderColor: '#22c55e' }} 
                  >
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            </Tabs.TabPane>

            {/* Sign-Up Tab */}
            <Tabs.TabPane tab="Sign Up" key="2">
              <Form
                name="signup"
                onFinish={handleSignupSubmit}
              >
                {/* Username */}
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please enter your username!' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                  />
                </Form.Item>

                {/* Email */}
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please enter your email!', type: 'email' }]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                  />
                </Form.Item>

                {/* Password */}
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                  />
                </Form.Item>

                {/* Confirm Password */}
                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm Password"
                  />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%', backgroundColor: '#22c55e', borderColor: '#22c55e' }} 
                  >
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
};

export default LoginSignupForm;

