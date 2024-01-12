import React from 'react'

const IconButton = ({ text, onclick, children, disabled, customClass, type }) => {
    return (
        <button disabled={disabled} onClick={onclick} type={type} className={customClass}>
            {
                children ? (
                <> <span>{text}</span>
                {children}
                </>
               
                ) : (
                    <span>{text}</span>
            )
            }
        </button>
    )
}

export default IconButton