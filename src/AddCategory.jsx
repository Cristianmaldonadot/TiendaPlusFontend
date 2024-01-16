import { useState } from 'react'

export const AddCategory = ({onFilterProducts}) => {
  const [inputvalue, setInputvalue] = useState('');

    const onInputChange = ({ target }) => {
        setInputvalue(target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if( inputvalue.trim().length <= 1 ) return;

        console.log("Valor a buscar:", inputvalue.trim());

        //setCategories(categories => [inputvalue,...categories]);
        onFilterProducts(inputvalue.trim());
        setInputvalue('');
    }


    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Buscar producto"
                value={inputvalue}
                onChange={onInputChange}
            />
        </form>
    )
}
