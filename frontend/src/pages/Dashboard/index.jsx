import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import "./Dashboard.css";
import socketio from "socket.io-client";
import consts from "../../consts"

export default function Dashboard() {

    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem("user_id");

    // config socket with server
    const socket = useMemo(() => (
        socketio(consts.BASE_URL, {
            query: {
                user_id
            }
        })
    ), [user_id]);

    // listen to booking request
    useEffect(()=> {
        socket.on("booking_request", (data) => {
            setRequests([...requests, data]) // append with previous request
        });
    }, [requests, socket])

    // get spots from server
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

    async function handleAccept(booking_id) {
        await api.post(`/booking/${booking_id}/approval/`);

        // remove recent accepted request
        setRequests(requests.filter(request => request._id !== booking_id))
    }

    async function handleReject(booking_id) {
        await api.post(`/booking/${booking_id}/rejection/`);

        // remove recent rejected request
        setRequests(requests.filter(request => request._id !== booking_id))
    }

    return (
        <>

            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email} </strong>
                            are requesting a booking at
                            <strong> {request.spot.company} </strong>
                            to:
                            <strong> {request.date} </strong>
                        </p>

                        <button className="btn-accept" onClick={() => handleAccept(request._id)}>ACCEPT</button>
                        <button className="btn-reject" onClick={() => handleReject(request._id)}>REJECT</button>
                    </li>
                ))}
            </ul>

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