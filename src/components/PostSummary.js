import React, { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";
import { socket } from "../components/socket";

//Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {BsChevronUp} from 'react-icons/bs'
import {BsChatSquareDots} from 'react-icons/bs'

function PostSummary(props) {

    return (
        <div class='postSummary'>
            <Card style={{ width: '80rem' }}>
                <Container>
                    <Row>
                        <Col sm='1'>
                            <Button variant='light' style={{marginTop: '10px'}}><BsChevronUp /></Button>
                            <br />
                            <a>{props.upVotes}</a>
                            <br />
                            <Button variant='light' style={{marginTop: '10px'}}><BsChatSquareDots /></Button>
                            <br />
                            <a>{props.comments}</a>
                        </Col>
                        <Col lg style={{textAlign: 'left'}}>
                            <Card.Title>{props.title}</Card.Title>
                            <Card.Text>{props.content}</Card.Text>
                            <blockquote>
                                <Row>
                                    <Col>
                                        <footer className="blockquote-footer">
                                            {props.author}
                                        </footer>
                                    </Col>
                                    <Col sm={2}>
                                        <p class='postTime'>{props.time} mins ago</p>
                                    </Col>
                                </Row>
                            </blockquote> 
                        </Col>
                    </Row>
                </Container>
            </Card>
        </div>
    )

}

export default PostSummary;