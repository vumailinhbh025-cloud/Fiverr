import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

type Props = {}

const ModalHOC = (_props: Props) => {
    const {title,contentComponent}= useSelector((state:RootState)=> state.ModalHOCReducer)
    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {contentComponent}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ModalHOC