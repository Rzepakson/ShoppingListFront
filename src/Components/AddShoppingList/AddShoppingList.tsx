import React, {SyntheticEvent, useState} from "react";
import {Btn} from "../common/Btn";

import "./AddShoppingList.css"

export const AddShoppingList = () => {
    const [loading, setLoading] = useState(false);

    const saveList = async (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);
    }

    if (loading) {
        return <h2>Trwa dodawanie listy...</h2>
    }

    return (
        <div className="form">
            <form className="add-list" onSubmit={saveList}>
                <h1>Utwórz nową listę zakupów!</h1>
                <p>
                    <label>
                        <span>Nazwa:</span>
                        <input
                            type="text"
                            name="list-name"
                            required
                            maxLength={99}
                        />
                    </label>
                </p>
                <Btn className="submitAddList" text="Utwórz"/>
            </form>
        </div>
    );
};