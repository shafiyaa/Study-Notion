import React from 'react'

const IconButton = ({ text, onclick, children, disabled, outline = false, customClass, type }) => {
    return (
        <button disabled={disabled} onClick={onclick} type={type} className={customClass} outline>
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