import React, {SyntheticEvent, useContext, useState} from "react";
import {Btn} from "../common/Btn";
import {NewProductContext} from "../../contexts/newProduct.context"
import {apiUrl} from "../../config/api";

import './AddProduct.css';

interface listIdProps {
    listId: string | undefined;
}

const initForm = {
    name: '',
    count: '',
    unit: 'szt',
}

export const AddProduct = (props: listIdProps) => {
    const {setNewProduct} = useContext(NewProductContext);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState(initForm);
    const [isErrorShown, setIsErrorShown] = useState(false);

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

        try {
            const numbersAfterComma = checkNumbersAfterComma(Number(form.count));
            const listId = props.listId;
            const res = await fetch(`${apiUrl}/productList/${listId}`, {
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

            const data = await res.json();

            res.status >= 400
                ? setError(data.message)
                : setError(null)

            setNewProduct(data);

        } finally {
            setForm(initForm);
        }
    }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };

    const showError = () => {
        setIsErrorShown(true);
    }

    return (
        <>
            <form className="add-product-form" onSubmit={saveProduct} noValidate>
                <h2 className="section-title">Dodawanie produktu</h2>
                <p className="one-input">
                    <label>
                        <span className="input-name">Nazwa:</span>
                        <input
                            type="text"
                            name="name"
                            maxLength={20}
                            value={form.name}
                            onChange={e => updateForm('name', e.target.value)}
                        />
                    </label>
                </p>
                <p className="one-input">
                    <label>
                        <span className="input-name">Ilość:</span>
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
                <p className="one-input">
                    <label>
                        <span className="input-name">Jednostka:</span>
                        <select
                            name="unit"
                            onChange={e => updateForm('unit', e.target.value)}
                            defaultValue={form.unit}
                        >
                            <option value="szt">szt</option>
                            <option value="kg">kg</option>
                            <option value="dkg">dkg</option>
                            <option value="g">g</option>
                            <option value="l">l</option>
                        </select>
                    </label>
                </p>
                <Btn className="add-product-btn" text="Dodaj" onClick={showError}/>
                {isErrorShown && (
                    <p className="error">{error}</p>
                )}
            </form>
        </>
    )
};
