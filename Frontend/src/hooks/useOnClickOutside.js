
import { useEffect } from 'react'

const useOnClickOutside = (ref,handler) => {
 
    useEffect( ()=>{
        const listener = (event) =>{
            // agr box k andar click hua toh kuch nhi krna
            if(!ref.current || ref.current.contains(event.target)){
                return
            }
            // bahar click hua toh call krna h
            handler(event)
        }

        // adding event listeners
        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)

        // remove the listeners
        return ()=>{
            document.removeEventListener("mousedown",listener)
            document.removeEventListener("touchstart",listener)
        }


        
    },[ref,handler])
}

export default useOnClickOutside