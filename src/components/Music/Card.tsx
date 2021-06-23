import React from 'react'
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import s from './Music.module.css';

const { Meta } = Card;
export const MyCard = () => {
    return (
        <div className={s.card}>
            <Card
                hoverable
                style={{ width: 295 }}
                cover={
                    <img
                        alt="example"
                        src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/75713876/original/9a67eb27f72dd0e4a664bbf6aee708e0bcca7bf4/music-album-cover-designs.jpg"
                    />
                }

            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        </div>
    )
}
