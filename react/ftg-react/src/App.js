import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { Container, Row, Col } from 'react-bootstrap';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

import { DestinationCard } from './components/DestinationCard';
import { useFetch } from "./hooks";

// import destinations from 'https://www.forbestravelguide.com/api/destination.json';
// import destinations from './data';



function App() {
  const [destinations, loading] = useFetch(
    "https://www.forbestravelguide.com/api/destination.json",{}
  );

  return (
    <>

      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>

      <h1>FTG Destinations</h1>
      {loading ? (
        "Loading..."
      ) : (

        <Container>
        {
          Object.values(destinations).map((regionData, i) => (
            <div key={i} className="cardBlock">
                <Row>
                  <h2>{Object.keys(destinations)[i]}</h2>
                  {/* <h2>{regionData[i].regionPrimaryLevel}</h2> */}
                </Row>
                <Row>
                  {regionData.map((data, j) => (
                    <Col xs={3} className="mb-5" key={`${data.id}`}>
                      <DestinationCard data={data} />
                    </Col>
                    ))
                  }
                </Row>
            </div>
          ))
        }
      </Container>

        // <Container>
        //   <Row>
        //     {Object.values(destinations).map( (regionData, idx )=> {
        //       console.log(Object.keys(destinations)[idx]);
        //       return (
        //         regionData.map( (data, idx2) => (
        //           <Col xs={3} className="mb-5" key={`${data.id}`}>
        //             <DestinationCard data={data} />
        //           </Col>
        //         ))
        //       )
        //     })}
        //   </Row>
        // </Container>
        )}
    </>


  );
}

export default App;
