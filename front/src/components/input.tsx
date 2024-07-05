import { Form, FormItemProps, Input } from "antd"
interface FormInputProps extends FormItemProps {
    type?: string 
}

export const FormInput = (props: FormInputProps) => {


    return (
        <Form.Item<string>
            {...props}
            required={false}
        >
            <Input type={props.type} />
        </Form.Item>
    )
}