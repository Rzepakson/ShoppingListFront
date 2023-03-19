import React, {SyntheticEvent, useState} from "react";
import {Btn} from "../common/Btn";

import "./AddShoppingList.css"

export const AddShoppingList = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [form, setForm] = useState({
        name: ''
    });


    const saveList = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await fetch('http://localhost:3001/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                }),
            });

            const data = await res.json();

            setId(data.id);
            setCreatedAt(data.createdAt)

        } finally {
            setLoading(false);
        }

    }


    if (loading) {
        return <h2>Trwa dodawanie listy...</h2>
    }

    if (id) {
        return <h2>Twoja lista "{form.name}" została dodana {createdAt}!</h2>
    }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    };

    return (
        <div className="form">
            <form className="add-list" onSubmit={saveList}>
                <h1>Utwórz nową listę zakupów!</h1>
                <p>
                    <label>
                        <span>Nazwa: </span>
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
                <Btn className="submitAddList" text="Utwórz"/>
            </form>
        </div>
    );
};