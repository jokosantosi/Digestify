import React, { useState, useEffect } from "react";
import axiosSession from "@/libs/axiosSession";
import { Card, Col, Row } from "react-bootstrap";

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
        <>
            <Row>
                {news.map((item) => (
                    <Col xs={12} md={6} lg={4} key={item.id} className="mb-4">
                        <Card className="p-3">
                            <Card.Img variant="top" className="rounded" src={item.image_url} alt={item.title} />
                            <Card.Body className="px-0">
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default CardNews;
