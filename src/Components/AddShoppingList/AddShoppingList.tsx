import React, {SyntheticEvent, useState} from "react";
import {Btn} from "../common/Btn";
import {Navigate} from "react-router-dom";

import "./AddShoppingList.css"
import {apiUrl} from "../../config/api";

const initForm = {
    name: '',
}

export const AddShoppingList = () => {
    const [id, setId] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [form, setForm] = useState(initForm);


    const saveList = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${apiUrl}/api/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                }),
            });

            const data = await res.json();

            if (res.status >= 400) {
                setError(data.message);
            }

            setId(data.id);
            setCreatedAt(data.createdAt)

        } finally {
            setForm(initForm);
        }
    }

    if (id) {
        return <Navigate replace to={`/productList/${id}`}/>
    }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };

    const showError = () => {
        setIsErrorShown(true);
        setTimeout(() => {
            setIsErrorShown(false);
            setError(null);
        }, 5000)
    }

    return (
        <div className="add-list">
            <h1>Utwórz nową listę zakupów!</h1>
            <form className="add-list-form" onSubmit={saveList} noValidate>
                <p className="add-list-name">
                    <label>
                        <span className="input-name">Nazwa: </span>
                        <input
                            type="text"
                            name="list-name"
                            required
                            maxLength={20}
                            value={form.name}
                            onChange={e => updateForm('name', e.target.value)}
                        />
                    </label>
                </p>
                <Btn className="submit-add-list" text="Utwórz" onClick={showError}/>
                {isErrorShown && (
                    <p className="add-product-error">{error}</p>
                )}
            </form>
        </div>
    );
};