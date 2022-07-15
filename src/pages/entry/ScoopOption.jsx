import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const BASE_URL = 'http://localhost:3030/';

export default function ScoopOptions({ name, imagePath, updateItemCount }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={BASE_URL + `${imagePath}`}
        alt={`${name} scoop`}
      ></img>
    </Col>
  );
}
