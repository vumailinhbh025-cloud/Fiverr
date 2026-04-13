import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderHome from '../components/HeaderHome'
import Footer from '../components/Footer'

type Props = {
    children?: React.ReactNode
}

const HomeTemplates = (_props: Props) => {
    return (
        <div className='home-page w-100'>
            <HeaderHome />
            <div className="content">
                <Outlet />
            </div>
            <div className='mt-5'>
                <Footer/>
            </div>
        </div>
    )
}

export default HomeTemplates