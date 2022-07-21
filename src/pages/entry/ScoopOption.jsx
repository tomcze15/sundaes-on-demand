import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const BASE_URL = 'http://localhost:3030/';

export default function ScoopOptions({ name, imagePath, updateItemCount }) {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const currentValue = event.target.value;
    updateItemCount(name, currentValue);

    const currentValueFloat = parseFloat(currentValue);

    setIsValid(
      0 <= currentValueFloat &&
        currentValueFloat <= 10 &&
        Math.floor(currentValueFloat) === currentValueFloat
    );
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={BASE_URL + `${imagePath}`}
        alt={`${name} scoop`}
      ></img>
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }} />
        <Form.Control
          type="number"
          defaultValue={0}
          onChange={handleChange}
          isInvalid={!isValid}
        />
      </Form.Group>
    </Col>
  );
}
