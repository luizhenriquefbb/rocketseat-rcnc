import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import "./Dashboard.css";

export default function Dashboard() {

    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user_id');
            const response = await api.get('/dashboard', {
                headers: {
                    user_id
                }
            });

            setSpots(response.data.spots)
        }

        loadSpots();

    }, []);

    useEffect(() => {
        console.log('spots', spots);
    }, [spots])

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}></header>
                        <strong>{spot.company}</strong>
                        <span>{spot.value ? `R$ ${spot.value}/day` : 'Free'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">New Spot</button>
            </Link>
        </>
    )
}