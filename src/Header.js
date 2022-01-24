import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Header = () => {
    return (
        <div>
            <Navbar variant="dark" bg="light" className="add_color">
                <Container>
            <Navbar.Brand href="#">Pokédex</Navbar.Brand>
        </Container>
      </Navbar>
        </div>
    );
};

export default Header;