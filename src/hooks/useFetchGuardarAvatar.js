export const useFetchGuardarAvatar = async (usuario, selectedAvatar) => {
    const variableEnt = import.meta.env.VITE_BACKEND_URL
    
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('avatar', selectedAvatar.id);

    const url = `${variableEnt}/agregar/${usuario}`
    const resp = await fetch(url, {
        method: 'POST', headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });
    const data = await resp.text();
    console.log(data);
    
    return data
}