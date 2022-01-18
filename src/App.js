import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const API = 'https://pokeapi.co/api/v2/pokemon/';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();

  useEffect(() => {
    getPokemons(API);
  }, []);

  const getPokemons = (endpoint) => {
    setIsLoading(false);
    axios.get(endpoint)
      .then((res) => {
        console.log(res.data.next);
        setNext(res.data.next);
        const fetches = res.data.results.map((poke) =>
          axios.get(poke.url).then((singlePokeRes) => singlePokeRes.data)
        );
      Promise.all(fetches).then((data) => {
        setPokemons(data);
        setIsLoading(false);
      });
      if (pokemons[0]) {
        // console.log("pokemons[0].id", pokemons[0].id);
        setPrev(pokemons[0].id)
      }
      // console.log('starting id of previous get:', pokemons[0].id);
    });
  }


  return (
    <div>
      <Navbar variant="dark" bg="light" className="add_color">
        <Container>
          <Navbar.Brand href="#">Pokédex</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row xs={1} md={3} lg={5} className="justify-content-between my-5 d-flex gap-3">
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {!isLoading && pokemons.map((poke) => (
              <Card style={{ width: '12rem'}}
                    key={poke.name}
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
            ))}
        </Row>
        {next !== 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20' ? <Button variant="info" onClick={() => getPokemons(`https://pokeapi.co/api/v2/pokemon/?offset=${prev-1}&limit=20`)}>PREV</Button> : undefined}
        {next !== 'https://pokeapi.co/api/v2/pokemon/?offset=1100&limit=18' ?<Button variant="info" onClick={() => getPokemons(next)}>NEXT</Button> : undefined}
      </Container>
    </div>
  );
};

export default App;