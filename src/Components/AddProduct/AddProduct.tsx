import {SyntheticEvent, useContext, useState} from "react";
import {Btn} from "../common/Btn";
import {NewProductContext} from "../../contexts/newProduct.context"

interface listIdProps {
    listId: string | undefined;
}

export const AddProduct = (props: listIdProps) => {
    const [loading, setLoading] = useState(false);
    const {setNewProduct} = useContext(NewProductContext);
    const [form, setForm] = useState({
        name: '',
        count: 0,
    });

    const saveProduct = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {

            const listId = props.listId;
            const res = await fetch(`http://localhost:3001/productList/${listId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    listId,
                }),
            });

            const data: string = await res.json();

            setNewProduct(data);

        } finally {
            setLoading(false);

        }
    }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };

    if (loading) {
        return <h2>Trwa dodawanie produktu...</h2>;
    }

    return (
        <form className="add-product-form" onSubmit={saveProduct}>
            <h2>Dodawanie produktu</h2>
            <p>
                <label>
                    Nazwa: <br/>
                    <input
                        type="text"
                        name="name"
                        required
                        maxLength={20}
                        value={form.name}
                        onChange={e => updateForm('name', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Ilość: <br/>
                    <input
                        type="number"
                        name="count"
                        required
                        maxLength={2}
                        value={form.count}
                        onChange={e => updateForm('count', Number(e.target.value))}
                    />
                </label>
            </p>
            <Btn className="add-product-button" text="Dodaj"/>
        </form>
    )
};