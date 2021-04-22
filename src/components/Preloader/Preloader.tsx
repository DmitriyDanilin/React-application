import React from 'react'
import preloader from 'D:\\Git Rep\\React-application\\src\\img\\preloader.svg'
import s from './Preloader.module.css'

const Preloader: React.FC = () => {
    return (
        <div className={s.preloaderIMG}><img src={preloader}></img> </div>
    )
}
export default Preloader