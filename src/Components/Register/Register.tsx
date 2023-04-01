import React, {SyntheticEvent, useState} from "react";
import {Btn} from "../common/Btn";
import {apiUrl} from "../../config/api";
import {Link} from "react-router-dom";

const initForm = {
    nickname: '',
    password: '',
}

export const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const [form, setForm] = useState(initForm);


    const saveList = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${apiUrl}/user/register`, {
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
                setError(data.message)
            } else {
                setError(null);
                setIsRegistered(true);
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
                if (isRegistered) {
                    return (
                        <div className="background background-login-register">
                            <p>Konto zostało utworzone!</p>
                            <br/>
                            <Btn text="Przejdź do logowania" className="btn" to="/"/>
                        </div>
                    )
                } else {
                    return (
                        <div className="background background-login-register">
                            <h1 className="section-title">Zarejestruj się!</h1>
                            <form className="user-registration-form" onSubmit={saveList} noValidate>
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
                                <Btn className="registration-btn" text="Zarejestruj" onClick={showError}/>
                                {isErrorShown && (
                                    <p className="error">{error}</p>
                                )}
                            </form>
                            <p className="info-login-register">Posiadasz już konto? Zaloguj się <Link
                                className='redirect-login-register' to='/'>tutaj</Link>
                            </p>
                        </div>
                    )
                }
            })()}
        </>
    );
};