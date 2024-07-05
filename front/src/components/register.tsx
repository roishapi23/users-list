
import { Button, Flex, Form, FormProps } from "antd"
import { CardSection } from "./card-section"
import { FormInput } from "./input"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Registration } from "../models/Registration";
import useApiService from "../services/api-service";


export const Register = () => {
    const navigate = useNavigate();
    const { register } = useApiService();

    const [loading, setLoading] = useState<boolean>(false)

    let initialValues = Registration.init()

    // get token and access to the system
    const onFinish: FormProps<Registration>['onFinish'] = async (formValues: Registration) => {
        let userInfo = formValues;
        try {
            setLoading(true);
            let res = await register(userInfo);
            localStorage.setItem('authToken', res.token)
            setLoading(false);
            navigate("/");
        } catch (error) {
            setLoading(false);
        }
    };

    const requiredValidation = { required: true, message: 'Field is required' };

    return (
        <CardSection title="Please Register" width="40vw" loading={loading}>
            <Form
                layout="vertical"
                initialValues={initialValues}
                onFinish={onFinish}
            >
                <Flex vertical gap={10}>

                    <FormInput name={"user_name"} label={"User Name"} rules={[requiredValidation]} />
                    <FormInput name={"password"} label={"Password"} type="password" rules={[requiredValidation, { min: 5, message: "Password must have at least 5 characters " }]} />

                    <Button type="primary" htmlType="submit">
                        Register and enter
                    </Button>
                </Flex>
            </Form>
        </CardSection>
    )
}