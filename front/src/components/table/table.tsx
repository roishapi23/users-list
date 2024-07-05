import { Button, Flex, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import useApiService from "../../services/api-service";
import { CardSection } from "../card-section";
import { columns } from "./table-columns";
import { PlusOutlined } from "@ant-design/icons";

interface PaginationSettings {
    current: number;
    pageSize: number;
    total: number;
    range: number[];
}

export const UsersTable = () => {

    const navigate = useNavigate();

    const { getUsers } = useApiService();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [pagination, setPagination] = useState<PaginationSettings>({
        current: 1,
        pageSize: 6,
        total: 0,
        range: []
    });

    // fetch data
    useEffect(() => {
        fetchUsers(pagination.current);
    }, [])

    const fetchUsers = async (page: number) => {
        try {
            setLoading(true);
            const res = await getUsers(page);
            setUsers(res.data)
            setPagination({
                current: page,
                pageSize: res.per_page,
                total: res.total,
                range: [1, res.total_pages as number]
            })
            setLoading(false);

        } catch (error) {
            setLoading(false);
        };
    }

    const handleTableChange = (pagination: any) => {
        fetchUsers(pagination.current);
    };


    const createUser = () => {
        navigate('/form')
    }
    const viewUser = (userId: number) => {
        navigate(`/user/${userId}`)
    }
    const onEdit = (userId: number) => {
        navigate(`/form/${userId}`)
    }

    const header = <Flex justify='space-between' align="center">
        <span>Users</span>
        <Button icon={<PlusOutlined/>} type="primary" onClick={createUser}>Create</Button>
    </Flex>



    return (
        <CardSection title={header} loading={loading} style={{ minHeight: "500px" }}>
            <Table columns={columns(onEdit, viewUser)} dataSource={users} pagination={pagination} onChange={handleTableChange} />
        </CardSection>
    )
}