import { ArrowLeftOutlined, DeleteOutlined } from "@ant-design/icons";
import { Col, Divider, Flex, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../models/User";
import useApiService from "../services/api-service";
import { CardSection } from "./card-section";

export const UserDetails = () => {
    const navigate = useNavigate();
    const { getUser, deleteUser } = useApiService()
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        if (id) {
            try {
                setLoading(true)
                let res = await getUser(id);
                setUser(res.data);
                setLoading(false)

            } catch (error) {
                setLoading(false);
            }
        }
    }

    const navigateBack = () => {
        navigate('/')
    }

    const onDeleteUser = async () => {
        if (id) {
            try {
                setLoading(true)
                await deleteUser(id);
                setLoading(false)
                navigate('/');

            } catch (error) {
                setLoading(false);
            }

        }
    }

    const header = <Flex justify='center'>
        <span>User Details</span>
        <Space className="back-navigation" onClick={navigateBack}><ArrowLeftOutlined />Back</Space>
        {
            id &&
            <Space className="delete-btn" onClick={onDeleteUser}><DeleteOutlined />Delete</Space>
        }
    </Flex>


    return (
        <CardSection title={header} loading={loading} width="45vw" style={{ maxWidth: "700px" }}>
            <Row gutter={20}>
                <Col span={11}>
                    <img src={user?.avatar} alt="avatar" />
                </Col>
                <Col span={2}>
                    <Divider type="vertical" className="h-full" />
                </Col>
                <Col span={11}>
                    <Flex vertical justify="center" className="h-full" >
                        <Space>
                            <Typography.Text className="bold text-lg">First Name:</Typography.Text>
                            <Typography.Text className="text-lg">{user?.first_name}</Typography.Text>
                        </Space>
                        <Space>
                            <Typography.Text className="bold text-lg">Last Name:</Typography.Text>
                            <Typography.Text className="text-lg">{user?.last_name}</Typography.Text>
                        </Space>
                        <Space>
                            <Typography.Text className="bold text-lg">Email:</Typography.Text>
                            <Typography.Text className="text-lg">{user?.email}</Typography.Text>
                        </Space>
                    </Flex>
                </Col>
            </Row>
        </CardSection>
    );
}