import { Badge, Space, Table, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteuser, getusers, selectdeletestatus, selectusers } from '../../features/users/usersSlice';
import { CloseCircleOutlined } from '@ant-design/icons';
const Users = () => {


    const dispatch = useDispatch()

    const users = useSelector(selectusers)
    const deletestatus = useSelector(selectdeletestatus)

    const success = () => {
        message.success('user successfuly deleted');
    };

    useEffect(() => {
        if (deletestatus === 'success') {
            success()
            dispatch(getusers())
        }
    }, [deletestatus]);

    useEffect(() => {
        dispatch(getusers())
    }, []);

    const columns = [
        {
            title: 'Avatar',
            key: 'image',
            dataIndex: 'image',
            render: (text, record) => (
                <>
                    <img style={{height:"30px", width:'30px',borderRadius:"50%",border:"1px solid lightgray"}} src={'http://localhost:5000/getfile/'+record.avatar} alt="" />
                </>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <CloseCircleOutlined onClick={() => dispatch(deleteuser(record._id))} style={{ color: 'red', cursor: 'pointer' }} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ width: "100%" }} class="products-catagories-area clearfix mt-5 pr-5">
            <h2>Users <Badge count={users.length} showZero /></h2>
            <Table columns={columns} dataSource={users} />
        </div>
    )
}

export default Users
