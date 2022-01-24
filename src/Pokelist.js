import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Loader from './Loader';
import axios from "axios";
import PokeCard from './PokeCard';


const API = 'https://pokeapi.co/api/v2/pokemon/';

const Pokelist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState();
  const [topLeftPoke, setTopLeftPoke] = useState();

  useEffect(() => {
    getPokemons(API);
  }, []);

  const getPokemons = (endpoint) => {
    setIsLoading(false);
    axios.get(endpoint)
      .then((res) => {
        setNext(res.data.next);
        const fetches = res.data.results.map((poke) =>
          axios.get(poke.url).then((singlePokeRes) => singlePokeRes.data)
        );
      Promise.all(fetches).then((data) => {
        setPokemons(data);
        setIsLoading(false);
      });
      if (pokemons[0]) {
        setTopLeftPoke(pokemons[0].id);
      }
    });
  }
  return (
    <div>
      <Container>
        <Row xs={1}
            md={3} 
            lg={5} 
            className="justify-content-between my-5 d-flex gap-3"
        >
          {isLoading && <Loader /> }
          {!isLoading && pokemons.map((poke) => (
            <PokeCard poke={poke} key={poke.id}/>))}
        </Row>
        {/* {next !== 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20' ? <Button variant="info" onClick={() => getPokemons(`https://pokeapi.co/api/v2/pokemon/?offset=${topLeftPoke-1}&limit=20`)}>PREV</Button> : undefined} */}
        {topLeftPoke > 1 ? <Button variant="info" onClick={() => getPokemons(`https://pokeapi.co/api/v2/pokemon/?offset=${topLeftPoke-21}&limit=20`)}>PREV</Button> : undefined}
        {next !== 'https://pokeapi.co/api/v2/pokemon/?offset=1100&limit=18' ?<Button variant="info" onClick={() => getPokemons(next)}>NEXT</Button> : undefined}
      </Container>
    </div>
  );
};

export default Pokelist;