import React, { useEffect } from 'react'
import { Avatar, Descriptions } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import '../assets/css/profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { getme, selectuser, uploadavatar } from '../features/users/usersSlice';

const Profile = () => {

    const dispatch = useDispatch()

    const user = useSelector(selectuser)

    useEffect(() => {
        dispatch(getme())
    }, []);

    const handleupload = (e) => {
        const data = new FormData()

        data.append('avatar', e.target.files[0])
        dispatch(uploadavatar(data))

    }

    return (
        <div class="products-catagories-area clearfix mt-5">
            {user ? <><div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center" }} >
                <Avatar
                    size={150}
                    src={'http://localhost:5000/getfile/' + user.avatar}
                />
                <CameraOutlined onClick={() => document.getElementById('upload').click()} className='avataricon' />
                <input onChange={(e) => handleupload(e)} type="file" id='upload' hidden />
            </div>

                <Descriptions style={{ marginTop: "20px" }} title="User Info">
                    <Descriptions.Item label="UserName">{user.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                </Descriptions> </> : '... loading'}
        </div>
    )
}

export default Profile
