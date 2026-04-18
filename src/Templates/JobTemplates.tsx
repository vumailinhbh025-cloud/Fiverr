import React from 'react'
import HeaderJobList from '../components/HeaderJobList'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

type Props = {
    children?: React.ReactNode
}

const JobTemplates = (_props: Props) => {
    return (
        <div className='job-page w-100'>
            <HeaderJobList />
            <div className="content">
                <Outlet />
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    )
}

export default JobTemplates