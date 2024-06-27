import { useState, useEffect } from "react";
import axios from "axios";
import style from "./Card.module.css";

// new cool lib
import composeHooks from "react-hooks-compose";

const useUserData = () => {
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

    return {
        gender: userData?.gender || "N/A",
        email: userData?.email || "N/A",
        location: userData?.location || "N/A",
        title: userData?.title || "N/A",
        image: userData?.image || "",
    };
};

const Card = ({ title, location, email, gender, image }) => (
    <section className={style.card}>
        <img className={style.cardImage} src={image} alt={title} />
        <div className={style.cardContent}>
            <h3 className={style.cardTitle}>{title}</h3>
            <span className={style.cardLocation}>{location}</span>
            <div className={style.cardContact}>
                <span className={style.cardMail}>{`email: ${email}`}</span>
                <span className={style.cardGender}>{`gender: ${gender}`}</span>
            </div>
        </div>
    </section>
);

// composing card with our hook
const ComposedCard = composeHooks({ useUserData })(Card);
