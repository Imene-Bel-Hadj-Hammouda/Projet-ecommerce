import { Badge, message, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Button, Tooltip } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import '../../assets/css/categories.css'
import { useDispatch, useSelector } from 'react-redux';
import { createcategory, deletecategory, getcategories, selectaddstatus, selectcategories } from '../../features/categories/categoriesSlice';
import { CloseCircleOutlined } from '@ant-design/icons';
const Categories = () => {

    const [displayform, setdisplayform] = useState(false);

    const [name, setname] = useState('');
    const [icon, seticon] = useState(null);

    const dispatch = useDispatch()

    const addstatus = useSelector(selectaddstatus)
    const categories = useSelector(selectcategories)

    useEffect(() => {
        if (addstatus === 'success') {
           
            setdisplayform(false)
            success()
            
        }
    }, [addstatus]);

    useEffect(() => {
        dispatch(getcategories())
    }, [addstatus]);

    const success = () => {
        message.success('category successfuly created');
    };

    const error = () => {
        message.error('category not created');
    };

    const addcategory = () => {

        const data = new FormData()

        data.append('name', name)
        data.append('image', icon)

        dispatch(createcategory(data))

    }

    const columns = [
        {
            title: 'Icon',
            key: 'icon',
            render: (text, record) => (
                <img style={{height:'25px',width:'25px'}} src={'http://localhost:5000/getfile/'+record.icon} alt="" />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <CloseCircleOutlined onClick={() => dispatch(deletecategory(record._id))} style={{ color: 'red', cursor: 'pointer' }} />
                </Space>
            ),
        },
    ];

    return (

        <div style={{ width: "100%" }} class="products-catagories-area clearfix mt-5 pr-5" >
            <h2>Categories <Badge count={categories.length} showZero /></h2>

            <div className='products-tools' >
                <Tooltip title={displayform ? 'close' : "create"}>
                    <Button onClick={() => setdisplayform(!displayform)} style={{ background: displayform ? 'red' : "#FBB808", outline: "none", border: 'none' }} type="primary" shape="circle" icon={displayform ? <CloseOutlined /> : <PlusOutlined />} />
                </Tooltip>
            </div>

            {displayform && <div className='categoryform' >
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Name</label>
                    <input value={name} onChange={(e) => setname(e.target.value)} type="text" class="form-control" id="exampleFormControlInput1" placeholder="category name" />
                </div>

                <div class="mb-3">
                    <label for="formFile" class="form-label">Default file input example</label>
                    <input onChange={(e) => seticon(e.target.files[0])} class="form-control" type="file" id="formFile" />
                </div>

                <Button onClick={() => addcategory()} style={{ background: "#FBB808", outline: "none", border: 'none' }} type="primary">Create</Button>
            </div>}

            <Table style={{ marginTop: "15px" }} columns={columns} dataSource={categories} />

        </div>

    )
}

export default Categories
