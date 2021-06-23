import React from 'react'
import { Col, Row } from 'antd'
import { MyCard } from './Card'
import s from './Music.module.css';


export const MusicPage = () => {

    return (
        <div className={s.wrappedBlock}>
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
        </div>
    )
}
