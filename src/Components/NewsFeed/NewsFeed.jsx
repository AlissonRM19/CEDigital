import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const mockNews = [
  { title: "Examen Final", date: "2025-05-20", content: "El examen final será presencial." },
  { title: "Nuevo Material", date: "2025-05-15", content: "Se agregó nuevo PDF en la carpeta Proyectos." }
];

const NewsFeed = () => {
  const sortedNews = [...mockNews].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Card className="bg-dark text-white p-3 mb-4">
      <h4>📰 Noticias</h4>
      <ListGroup variant="flush">
        {sortedNews.map((n, i) => (
          <ListGroup.Item className="bg-secondary text-white" key={i}>
            <strong>{n.date} - {n.title}</strong>
            <p className="mb-1">{n.content}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default NewsFeed;
