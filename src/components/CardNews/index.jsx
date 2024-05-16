import React, { useState, useEffect } from "react";
import axiosSession from "@/libs/axiosSession";
import { Card, Col, Row } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

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
                    'ngrok-skip-browser-warning': '69420'
                }
            });
            setNews(response.data.data);
            
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
                    <Col xs={12} md={6} lg={6} key={item.id} className="mb-4">
                        <Card className="p-3 shadow">
                            <Card.Img variant="top" className="rounded" src={item.image_url} alt={item.title} />
                            <Card.Body className="px-0">
                                <Card.Title className="d-flex justify-content-between">
                                    <h5 style={{ width: '94%'}}>{item.title}</h5>
                                    <FaHeart />
                                </Card.Title>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex gap-3 align-items-center">
                                        {item.tag && item.tag.map((tag, tagIndex) => (
                                            <Card.Subtitle key={tagIndex} className="bg-item px-3 py-1 rounded-3">
                                                {tag}
                                            </Card.Subtitle>
                                        ))}
                                    </div>
                                    <Link href={item.original_url} target="_blank">
                                        <Card.Subtitle className="bg-item px-3 py-1 rounded-3">
                                            Read More
                                        </Card.Subtitle>
                                    </Link>
                                </div>
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
