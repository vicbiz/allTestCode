import React, { useState } from 'react';
import { Card, Badge, Button, Accordion } from 'react-bootstrap';

export function DestinationCard({ data, setOrdered }){
    return (
        <>

        <Card className="h-100 shadow-sm bg-white rounded">
            <Card.Img variant="top" src={data.heroImage.largeUrl} />
            <Card.Body className="d-flex flex-column">
                <div className="d-flex mb-2 justify-content-between">
                    <Card.Title className="mb-0 font-weight-bold">{data.name}</Card.Title>
                </div>
                <Card.Text className="text-secondardy">
                    {data.regionPrimaryLevel}<br />
                    {data.countryName}
                </Card.Text>

                {/* <Card.Text className="text-secondardy" dangerouslySetInnerHTML={{__html: data.overview}}></Card.Text> */}
                {/* <Card.Text className="text-secondardy">{data.overview.replace(/(<([^>]+)>)/ig,"")}</Card.Text> */}
                
                <Button variant="success" href={'https://www.forbestravelguide.com/'+data.uri} target="_blank">Success <Badge variant="primary">Visited</Badge> </Button>
            </Card.Body>
        </Card>


        {/* <Card className="h-100 shadow-sm bg-white rounded">
            <Accordion>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <Card.Img variant="top" src={data.heroImage.largeUrl} />
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{data.overview.replace(/(<([^>]+)>)/ig,"")}</Card.Body>
                </Accordion.Collapse>
            </Accordion>
        </Card> */}


        </>
    )
}