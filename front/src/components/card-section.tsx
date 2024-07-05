import { Card, CardProps, Flex, Spin } from "antd"

interface CardSectionProps extends CardProps {
    width?: string;
    loading?: boolean;
}

export const CardSection = (props: CardSectionProps) => {
    return (
        <Flex justify='center' align='center' style={{ height: "100vh" }}>
            <Spin spinning={props?.loading ?? false}>
                <Card bordered={false} className="custom-card" style={{ width: props?.width }} {...props}>
                    {props.children}
                </Card>

            </Spin>
        </Flex>
    )
}