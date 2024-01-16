import React, { useEffect, useState } from 'react'

export const useVerifyUser = () => {

    const [verificaruser, setVerificaruser] = useState(false)

    const verificarSession = () =>{
        if(localStorage.getItem('usuario')){
            setVerificaruser(true);
          }
    }
    
    useEffect(() => {
        verificarSession();
      }, []);

  return verificaruser
}
