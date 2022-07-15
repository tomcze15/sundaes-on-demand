import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOptions from './ScoopOption';

const BASE_URL = 'http://localhost:3030/';

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + `${optionType}`)
      .then((response) => setItems(response.data))
      .catch((err) => console.error(err));
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : null;
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
