import React, {SyntheticEvent, useContext, useState} from "react";
import {Btn} from "../common/Btn";
import {Navigate} from "react-router-dom";
import {apiUrl} from "../../config/api";
import {Header} from "../layout/Header";
import {UserIdContext} from "../../contexts/userId.context";

import "./AddShoppingList.css"

const initForm = {
    name: '',
}

export const AddShoppingList = () => {
    const [id, setId] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [form, setForm] = useState(initForm);
    const {userId} = useContext(UserIdContext);


    const saveList = async (e: SyntheticEvent) => {
        e.preventDefault();


        try {
            const res = await fetch(`${apiUrl}/list/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                }),
            });

            const data = await res.json();

            res.status >= 400
                ? setError(data.message)
                : setError(null)

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
    }

    return (
        <>
            <Header/>
            <div className="add-list">
                <h1 className="section-title">Utwórz nową listę zakupów!</h1>
                <form className="add-list-form" onSubmit={saveList} noValidate>
                    <p className="one-input-add-list">
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
                    <Btn className="add-list-btn" text="Utwórz" onClick={showError}/>
                    {isErrorShown && (
                        <p className="error">{error}</p>
                    )}
                </form>
            </div>
        </>
    );
};