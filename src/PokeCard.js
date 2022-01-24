import React from 'react';
import Card from 'react-bootstrap/Card';

const PokeCard = ({poke}) => {
    return (
            <Card style={{ width: '14rem'}}
                key={poke.key}
                bg='dark'
                text="light">
                <Card.Text>
                  {poke.id}
                </Card.Text>
                <Card.Img src={poke.sprites.other.home.front_default}/>
                <Card.Body>
                  <Card.Title>{poke.name.toUpperCase()}
                  </Card.Title>
                  <Card.Text>
                    Type: {poke.types.map((t, i) => (<li key={i}className="poke_type">{t.type.name} </li>))}
                  </Card.Text>
                  <Card.Text>
                    Weak against: {}
                  </Card.Text>
                </Card.Body>
              </Card>
    );
};

export default PokeCard;