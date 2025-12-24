import React from 'react'
import "./Modal.css"

function Modal({ isOpen, setIsOpen, children }) {
    return (
        <>
            {

                isOpen && <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div
                        className="modal" onClick={(e) => e.stopPropagation()}

                    >
                        <button className="modal-close" onClick={() => setIsOpen(false)}>
                            ✕
                        </button>
                        {children}

                    </div>
                </div>
            }
        </>
    )
}

export default Modal