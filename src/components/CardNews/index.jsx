import React, { useState, useEffect } from "react";
import axiosSession from "@/libs/axiosSession";

const CardNews = () => {
    const [news, setNews] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axiosSession({
                method: "get",
                url: "/api/get-latest-news",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'ngrok-skip-browser-warning':  '69420'
                }
            });

            if (response.data && Array.isArray(response.data.data)) {
                setNews(response.data.data);
            } else {
                console.error("Unexpected response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } 
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {news.length > 0 ? (
                news.map((item) => (
                    <div key={item.id} style={{ marginBottom: "20px" }}>
                        <a href={item.original_url} target="_blank" rel="noopener noreferrer">
                            <h2>{item.title}</h2>
                        </a>
                        <img src={item.image_url} alt={item.title} style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />
                        <p>{item.content}</p>
                    </div>
                ))
            ) : (
                <p>No news available</p>
            )}
        </div>
    );
};

export default CardNews;
