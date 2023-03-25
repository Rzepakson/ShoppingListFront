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
        count: '',
        unit: 'szt',
    });

    const checkNumbersAfterComma = (num: number): number => {
        const numStr = num.toString();
        if (numStr.includes('.')) {
            return numStr.split('.')[1].length;
        } else {
            return 0;
        }
    }

    const saveProduct = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const numbersAfterComma = checkNumbersAfterComma(Number(form.count));
            const listId = props.listId;
            const res = await fetch(`http://localhost:3001/productList/${listId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name,
                    count: Number(form.count),
                    unit: form.unit,
                    listId,
                    numbersAfterComma,
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
        <form className="add-product-form" onSubmit={saveProduct} noValidate>
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
                        min="0"
                        max="99"
                        value={form.count}
                        onChange={e => updateForm('count', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Jednostka: <br/>
                    <select
                        name="unit"
                        required
                        onChange={e => updateForm('unit', e.target.value)}
                        defaultValue={form.unit}
                    >
                        <option value="szt">szt</option>
                        <option value="kg">kg</option>
                        <option value="dkg">dkg</option>
                        <option value="g">g</option>
                    </select>
                </label>
            </p>
            <Btn className="add-product-button" text="Dodaj"/>
        </form>
    )
};
