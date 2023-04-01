import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {Btn} from "../common/Btn";
import {apiUrl} from "../../config/api";
import {Link} from "react-router-dom";
import {AddShoppingList} from "../AddShoppingList/AddShoppingList";
import {UserIdContext} from "../../contexts/userId.context";

import './Login.css';

const initForm = {
    nickname: '',
    password: '',
}

const getInitialState = (): boolean => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? JSON.parse(isLoggedIn) : false;
}

export const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getInitialState);
    const {setUserId} = useContext(UserIdContext);
    const [error, setError] = useState<string | null>(null);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [form, setForm] = useState(initForm);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    const handleLogin = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault();

        try {
            const res = await fetch(`${apiUrl}/user/login`, {
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
            } else {
                setError(null);
                setIsLoggedIn(true);
                setUserId(data);
            }
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
            {(() => {
                if (isLoggedIn) {
                    return <AddShoppingList/>
                } else {
                    return (
                        <div className="background background-login-register">
                            <h1 className="section-title">Zaloguj się do aplikacji Zakupsy!</h1>
                            <form className="user-login-form" onSubmit={handleLogin} noValidate>
                                <p className="one-input">
                                    <label>
                                        <span className="input-name">Nazwa użytkownika: </span>
                                        <input
                                            type="text"
                                            name="user-nickname"
                                            maxLength={255}
                                            value={form.nickname}
                                            onChange={e => updateForm('nickname', e.target.value)}
                                        />
                                    </label>
                                </p>
                                <p className="one-input">
                                    <label>
                                        <span className="input-name">Hasło: </span>
                                        <input
                                            type="password"
                                            name="user-password"
                                            maxLength={30}
                                            value={form.password}
                                            onChange={e => updateForm('password', e.target.value)}
                                        />
                                    </label>
                                </p>
                                <Btn className="login-btn" text="Zaloguj" onClick={showError}/>
                                {isErrorShown && (
                                    <p className="error">{error}</p>
                                )}
                            </form>
                            <p className="info-login-register">Nie masz jeszcze konta? Zarejestruj się <Link
                                className='redirect-login-register' to='/register'>tutaj</Link></p>
                        </div>
                    )
                }
            })()}
        </>
    );
};