// src/Components/Professor/NewsManager.jsx
import React, { useState } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';

const NewsManager = ({ course }) => {
  const [newsList, setNewsList] = useState([]);
  const [news, setNews] = useState({ title: '', content: '' });

  const handlePublish = () => {
    setNewsList([{ ...news, date: new Date().toLocaleString() }, ...newsList]);
    setNews({ title: '', content: '' });
  };

  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>📰 Noticias del Curso - {course.name}</h4>
      <Form className="mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Título</Form.Label>
          <Form.Control value={news.title} onChange={(e) => setNews({ ...news, title: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Contenido</Form.Label>
          <Form.Control as="textarea" rows={3} value={news.content} onChange={(e) => setNews({ ...news, content: e.target.value })} />
        </Form.Group>
        <Button variant="success" onClick={handlePublish}>Publicar</Button>
      </Form>

      <ListGroup>
        {newsList.map((n, i) => (
          <ListGroup.Item key={i} className="bg-secondary text-white">
            <strong>{n.title}</strong> <small>({n.date})</small><br />
            <span>{n.content}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default NewsManager;
