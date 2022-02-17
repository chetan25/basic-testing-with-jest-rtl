import { useState, useEffect } from "react";

import axios from "axios";

import style from "./Card.module.css";

const CardContainer = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://randomuser.me/api/");
            const user = result.data.results[0];
            setUserData({
                gender: user.gender,
                email: user.email,
                location: `${user.location.city}, ${user.location.country}`,
                title: `${user.name.title}. ${user.name.first} ${user.name.last}`,
                image: user.picture.thumbnail,
            });
        };

        fetchData();
    }, []);

    return (
        <section className={style.card}>
            <img className={style.cardImage} src={userData.image} alt={userData.title} />
            <div className={style.cardContent}>
                <h3 className={style.cardTitle}>{userData.title}</h3>
                <span className={style.cardLocation}>{location}</span>
                <div className={style.cardContact}>
                    <span className={style.cardMail}>{`email: ${userData.email}`}</span>
                    <span className={style.cardGender}>{`gender: ${userData.gender}`}</span>
                </div>
            </div>
        </section>
    );
};

export default CardContainer;
