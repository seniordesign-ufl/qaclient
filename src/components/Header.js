import { React, useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import '../Styling/Header.css';

import { Form, Container, Row, Col, FormControl, Dropdown, DropdownButton, Button, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { socket } from "../service/socket";

function Header(props) {
    const { state: contextState, dispatch } = useState(AppContext);
    const [displayWholeHeader, updateWholeDisplayHeader] = useState(true);
    const [searchItem, updateSearchItem] = useState("");
    const [sortBy, updateSortBy] = useState("");

    const handleSearch = (e) => {
        updateSearchItem(e.target.value)
        socket.emit("search-for", { string: searchItem, groupID: props.roomKey })
    }

    const handleSort = (e) => {
        updateSortBy(e.target.innerText)
        socket.emit("filter", { condition: sortBy, groupID: props.roomKey })
    }

    useEffect(() => {
        socket.on('update-posts', (r) => {
            const { names } = r;
            // setUsers(names);
        });
        // unsubscribe from event for preventing memory leaks
        return () => {
            socket.off('update-posts');
        };
    }, []);

    if (props.roomKey != null) {
        return (
            <div class="header">
                <Container fluid>
                    <Row>
                        <Col align="left">
                            <a class="navbar-brand" href="/">SmallTalk</a>
                        </Col>
                        <Col xs={6} align="center">
                            <InputGroup>
                                <FormControl placeholder="Search Discussions..." onChange={handleSearch} />
                                <InputGroup.Append>
                                    <Button><BsSearch /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col align="right">
                            <DropdownButton title="Sort By" id="basic-nav-dropdown">
                                <Dropdown.Item value="Popularity" onClick={handleSort}>Popularity</Dropdown.Item>
                                <Dropdown.Item value="Date" onClick={handleSort}>Date</Dropdown.Item>
                                <Dropdown.Item value="Solved" onClick={handleSort}>Solved</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    else {
        return (
            <div class="header">
                <Container fluid>
                    <Row>
                        <Col align="left">
                            <a class="navbar-brand" href="/">SmallTalk</a>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};

export default Header;