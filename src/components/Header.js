import { React, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import '../Styling/index.css';
import '../Styling/Header.css';

import { Container, Row, Col, FormControl, Dropdown, DropdownButton, Button, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { Route } from "react-router";

function Header(props) {
    return (
        <div class="header">
            <Container fluid>
                <Row>
                    <Col align="left">
                        <a class="navbar-brand" href="/">SmallTalk</a>
                    </Col>
                    {/* Only show when URL matches a room url. */}
                    <Route exact path={"/room/:roomID/"} component={Searchbar} />
                </Row>
            </Container>
        </div>
    )
};
function Searchbar(props) {
    const { state: contextState, dispatch } = useContext(AppContext);
    const [displayWholeHeader, updateWholeDisplayHeader] = useState(true);
    const [filterValue, updateFilterValue] = useState("");

    const handleSearch = (e) => {
        dispatch({ type: 'update-search', search_phrase: e.target.value });
        // API.searchFor(searchItem, props.roomKey);
    }

    const handleSort = (e) => {
        updateFilterValue(e.target.innerText);
        dispatch({ type: 'update-filter', filter_by: e.target.innerText });
        // API.filter(sortBy, props.roomKey);
        // socket.emit("filter", { condition: sortBy, groupID: props.roomKey })
    }

    if (contextState.displayName != null) {
        return <>
            <Col xs={5} align="center" className="search-container">
                <InputGroup>
                    <FormControl placeholder="Type any keyword..." onChange={handleSearch} className="search-input" />
                    <InputGroup.Append>
                        <Button className="search-button"><BsSearch className="search-icon" /></Button>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
            <Col align="right">
                <DropdownButton title={filterValue === '' ? "Sort Discussions" : filterValue} id="basic-nav-dropdown">
                    <Dropdown.Item value="Popularity" onClick={handleSort}>Popularity</Dropdown.Item>
                    <Dropdown.Item value="Date" onClick={handleSort}>Date</Dropdown.Item>
                    <Dropdown.Item value="Solved" onClick={handleSort}>Solved</Dropdown.Item>
                </DropdownButton>
            </Col>
        </>
    }
    else {
        return <></>
    }

}
export default Header;