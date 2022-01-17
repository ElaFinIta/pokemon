import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   axios.get("https://pokeapi.co/api/v2/pokemon/")
  //   .then(res => setPokemons(res.data.results))
  // }, []);


  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => {
        const fetches = res.data.results.map((poke) =>
        axios.get(poke.url).then((singlePokeRes) => singlePokeRes.data)
      );
      Promise.all(fetches).then((data) => {
        setPokemons(data);
      });
    });
  }, []);

  console.log('state after get:', pokemons);
  pokemons.forEach(p => {
    console.log('type', p.types.forEach(ob => ob.type.name));
  })
  return (
    <div>
      <Navbar variant="dark" bg="light" className="add_color">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row xs={1} md={3} lg={5} className="justify-content-between my-5 d-flex gap-3">
          {pokemons.map((poke) => (
              <Card style={{ width: '16rem'}}
                    key={poke.name}
                    bg='dark'
                    text="light">
                <Card.Img src={poke.sprites.other.home.front_default}/>
                <Card.Body>
                  <Card.Title>{poke.name.toUpperCase()}</Card.Title>
                  <Card.Text>
                    Type: {poke.types[0].type.name}
                  </Card.Text>
                  <Button variant="info">Next</Button>
                </Card.Body>
              </Card>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;