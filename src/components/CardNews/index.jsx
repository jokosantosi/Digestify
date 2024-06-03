import React, { useState, useEffect } from "react";
import axiosSession from "@/modules/axiosSession";
import { Card, Col, Row } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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
                    // 'ngrok-skip-browser-warning': '69420'
                }
            });
            setNews(response.data.data);
            
        } catch (error) {
            console.log("Error fetching data:", error);
        } 
    };

    // Create initial likes state
    const initialLikesState = news.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
    }, {});

    const [like, setLike] = useState(initialLikesState);

    const handleLike = (id) => {
        setLike((prevLikes) => ({
          ...prevLikes,
          [id]: !prevLikes[id],
        }));
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
                                    <h5 style={{ width: '80%'}}>{item.title}</h5>
                                    {like[item.id] ? (
                                        <FaHeart style={{ cursor: 'pointer' }} onClick={() => handleLike(item.id)} />
                                    ) : (
                                        <FaRegHeart style={{ cursor: 'pointer' }} onClick={() => handleLike(item.id)} />
                                    )}
                                </Card.Title>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="d-flex gap-3 align-items-center flex-wrap">
                                        {item.categories && item.categories.map((tag, tagIndex) => (
                                            <Card.Subtitle key={tagIndex} className="bg-item px-3 py-1 rounded-3">
                                                {tag}
                                            </Card.Subtitle>
                                        ))}
                                    </div>
                                    <Link href={item.original_url} target="_blank" className="text-decoration-none">
                                        <Card.Subtitle className="bg-item px-3 py-1 rounded-3 text-secondary text-nowrap">
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
