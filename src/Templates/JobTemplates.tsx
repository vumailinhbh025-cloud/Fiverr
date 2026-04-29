import React from 'react'
import HeaderJobList from '../components/HeaderJobList'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import AppBreadcrumb from '../components/CustomBreadcrumb'

type Props = {
    children?: React.ReactNode
}

const JobTemplates = (_props: Props) => {
    return (
        <div className='job-page w-100'>
            <HeaderJobList />
            <div className="container mt-3">
                <AppBreadcrumb />
            </div>
            <main>
                <Outlet />
            </main>
            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    )
}

export default JobTemplates