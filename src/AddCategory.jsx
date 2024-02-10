import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AddCategory = ({ onFilterProducts }) => {
    const history = useNavigate();

    function obtenerParametro(nombre) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
    }

    const valorVariable = obtenerParametro('id');

    const [inputvalue, setInputvalue] = useState('');

    const onInputChange = ({ target }) => {
        setInputvalue(target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (inputvalue.trim().length <= 1) return;

        console.log("Valor a buscar:", inputvalue.trim());

        //setCategories(categories => [inputvalue,...categories]);
        onFilterProducts(inputvalue.trim());
        setInputvalue('');
        //history(`/?id=${valorVariable}`);
    }


    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Buscar producto en Tiendaplus.com"
                value={inputvalue}
                onChange={onInputChange}
            />
        </form>
    )
}
