import { Avatar, Button, Flex } from "antd";
import { ColumnsType } from "antd/es/table";
import { User } from "../../models/User";
import { EditOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";

export const columns = (
  onEdit: (id: number) => void,
  onView: (id: number) => void,

): ColumnsType<User> => {
  return [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (_text, record) => <Avatar src={record?.avatar} icon={record?.avatar ? undefined : <UserOutlined />} />,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Flex justify='space-evenly'>
          <Button icon={<EyeOutlined/>} type="primary" onClick={() => record.id && onView(record.id)}>View</Button>
          <Button icon={<EditOutlined/>} type="primary" onClick={() => record.id && onEdit(record.id)}>Edit</Button>
        </Flex>
      ),
    },
  ];
}

