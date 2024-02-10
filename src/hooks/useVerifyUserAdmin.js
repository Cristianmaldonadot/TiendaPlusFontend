import React, { useEffect, useState } from 'react'

export const useVerifyUserAdmin = () => {

    const [verificaruser, setVerificaruser] = useState(false)

    const verificarSession = () =>{
        if(localStorage.getItem('usuario') && localStorage.getItem('roles') === 'ROLE_ADMIN'){
            setVerificaruser(true);
          }
    }
    
    useEffect(() => {
        verificarSession();
      }, []);

  return verificaruser
}
