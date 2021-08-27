import { Badge, Space, Table, Tag } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getorders, selectorders, selectupadtestatus, updateorder } from '../../features/orders/ordersSlice';
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined, CheckOutlined, ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';

const Orders = () => {

    const dispatch = useDispatch()

    const orders = useSelector(selectorders)
    const updatestatus = useSelector(selectupadtestatus)

    useEffect(() => {

        const interval = setInterval(() => {
            dispatch(getorders())
            console.log('This will run every second!');
        }, 5000);
        return () => clearInterval(interval);
    }, [updatestatus]);

    const columnsadmin = [
        {
            title: 'Avatar',
            key: 'client',
            dataIndex: 'client',
            render: (text, record) => (
                <>
                    <img style={{ height: "30px", width: '30px', borderRadius: '50%' }} src={'http://localhost:5000/getfile/' + record.client.avatar} alt="" />
                </>
            ),
        },
        {
            title: 'Username',
            dataIndex: 'client',
            key: 'client',
            render: (text, record) => <a> {record.client.name} </a>,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Total',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (text, record) => <span>${record.total_price}</span>,
        },
        {
            title: 'Livred',
            key: 'livred',
            render: (text, record) => (
                <Space size="middle">

                    {record.livred === 1 && <Tag icon={<SyncOutlined spin />} color="processing">in progress</Tag>}
                    {record.livred === 2 && <Tag color="green">livred</Tag>}
                    {record.livred === 3 && <Tag color="volcano">refused</Tag>}
                </Space>
            ),
        },
        {
            title: 'Deliver',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    {record.livred === 3 && < CloseOutlined style={{ fontSize: "20px", color: 'red' }} />}
                    {record.livred === 2 && <CheckOutlined style={{ fontSize: "20px", color: 'green' }} />}
                    {record.livred === 1 &&
                        <>
                            <CheckCircleOutlined onClick={() => update(record, 2)} style={{ fontSize: "20px", color: 'green', cursor: "pointer" }} />
                            <CloseCircleOutlined onClick={() => update(record, 3)} style={{ fontSize: "20px", color: 'red', cursor: "pointer" }} />
                        </>}

                </Space>
            ),
        },

    ];

    const update = (order, value) => {


        let data = {
            id: order._id,
            data: {
                livred: value
            }
        }

        dispatch(updateorder(data))

    }

    return (
        <div class="products-catagories-area clearfix mt-5 pr-5" >
            <h2>Orders <Badge count={orders.length} showZero /></h2>
            <Table columns={columnsadmin} dataSource={orders} />

        </div>
    )
}

export default Orders
