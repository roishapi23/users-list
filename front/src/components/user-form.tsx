import { Button, Flex, Form, FormProps, message, Space } from "antd"
import { User } from "../models/User"
import { FormInput } from "./input";
import { useNavigate, useParams } from 'react-router-dom';
import { CardSection } from "./card-section";
import { useEffect, useState } from "react";
import useApiService from "../services/api-service";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const UserForm = () => {

    const navigate = useNavigate();
    const { getUser, createUser, updateUser } = useApiService();
    const [user, setUser] = useState<User>(User.init());
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();

    // in case of user edit - get user details
    useEffect(() => {
        if (id) {
            fetchUser(id);
        };
    }, []);

    // api request
    const fetchUser = async (userId: string) => {
        try {
            setLoading(true);
            const res = await getUser(userId);
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const navigateBack = () => {
        navigate('/')
    }


    const onFinish: FormProps<User>['onFinish'] = async (formValues: User) => {
        let userInfo = formValues;
        if (id) {
            userInfo = {
                ...user,
                ...formValues
            }
        }
        try {
            setLoading(true);
            id ? await updateUser(userInfo) : await createUser(userInfo)
            setLoading(false);
            navigateBack();
        } catch (error) {
            setLoading(false);
        }
    };

    const header = <Flex justify='center'>
        <span>{id ? "Edit User" : "Create User"}</span>
        <Space className="back-navigation" onClick={navigateBack}><ArrowLeftOutlined />Back</Space>
    </Flex>

    const requiredValidation = { required: true, message: 'Field is required' };

    return (
        <CardSection title={header} loading={loading} style={{ maxWidth: "700px", minHeight: "450px" }} >
            <Form
                layout="vertical"
                initialValues={user}
                onFinish={onFinish}
            >
                <Flex vertical gap={10}>

                    <FormInput name={"first_name"} label={"First Name"} rules={[requiredValidation]} />
                    <FormInput name={"last_name"} label={"Last Name"} rules={[requiredValidation]} />
                    <FormInput name={"email"} label={"Email"} rules={[requiredValidation, { type: "email", message: "Invalid email address" }]} />
                    <FormInput name={"avatar"} label={"Img Url"} rules={[requiredValidation ]} />

                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Flex>
            </Form>
        </CardSection>
    )
}