import { Badge, Space, Table, Tag } from 'antd';
import React, { useEffect } from 'react'
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined, CheckOutlined, ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getclientorders, selectclientorders } from '../features/orders/ordersSlice';

const ClientOrders = () => {

    const dispatch = useDispatch()

    const orders = useSelector(selectclientorders)

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getclientorders())
            console.log('This will run every second!');
        }, 5000);
        return () => clearInterval(interval);
        
    }, []);

    const columns = [


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
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            render: (text, record) => <span>${record.products.length}</span>,
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
        }

    ];

    return (

        <div class="products-catagories-area clearfix mt-5 pr-5" >
            <h2>Orders <Badge count={orders?orders.length:0} showZero /></h2>
            <Table columns={columns} dataSource={orders} />
        </div>

    )
}

export default ClientOrders
