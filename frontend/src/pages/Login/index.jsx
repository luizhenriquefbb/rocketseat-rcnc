import React, { useState } from 'react';
import api from '../../services/api';


export default function Login({ history }) {

    const [email, setEmail] = useState('');


    async function submitLogin(evt) {
        evt.preventDefault();

        const response = await api.post('/new_user', {
            email
        });


        const { _id: user_id } = response.data.new_user;

        // store id in localStorage
        localStorage.setItem('user_id', user_id);

        history.push('/dashboard');
    }


    return (
        <>
            <p>
                Offer <strong>spots</strong> to programmers and find <strong>talents</strong> to your company
            </p>

            <form onSubmit={(evt) => submitLogin(evt)}>
                <label htmlFor="email"> E-mail *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Your best email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                />
                <button className="btn" type="submit">Submit</button>
            </form>
        </>

    );
}