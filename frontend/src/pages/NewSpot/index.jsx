import React, {useState, useMemo} from 'react';
import camera from "../../assets/camera.svg";
import api from '../../services/api';

import "./NewSpot.css";

export default function NewSpot({history}) {

    const [company, setCompany] = useState("");
    const [price, setPrice] = useState("");
    const [technologies, setTechnologies] = useState("");

    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail]);

    async function handleNewSpot(evt) {
        evt.preventDefault();

        const data = new FormData();
        data.append('company', company);
        data.append('value', price);
        data.append('technologies', technologies);
        data.append('thumbnail', thumbnail);

        const user_id =  localStorage.getItem("user_id");

        await api.post("/new_spot", data, {headers : {user_id }});

        history.push("/dashboard");
    }



    return (
        <>
            <h1>NewSpot</h1>
            <form onSubmit={handleNewSpot}>

                {/* thumbnail */}
                <label id="thumbnail" style={{backgroundImage: `url(${preview})`}}>
                    <input
                        type="file"
                        onChange={(evt) => setThumbnail(evt.target.files[0])}
                    />
                    <img src={camera} alt="" className={thumbnail ? "hidden" : ""}/>
                </label>

                {/* company */}
                <label htmlFor="company">Company *</label>
                <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(evt) => setCompany(evt.target.value)}
                    placeholder="Your amazing company"
                    required
                />

                {/* techs */}
                <label htmlFor="technologies">
                    Technologies *
                    <span>(Separated by comma)</span>
                </label>
                <input
                    type="text"
                    id="technologies"
                    value={technologies}
                    onChange={(evt) => setTechnologies(evt.target.value)}
                    placeholder="Which techs do you use?"
                    required
                />

                {/* price */}
                <label htmlFor="price">
                    Daily value
                    <span>(White means free)</span>
                </label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(evt) => setPrice(evt.target.value)}
                    placeholder="How much?"
                />

                <button type="submit" className="btn">Submit</button>

            </form>
        </>
    )
}