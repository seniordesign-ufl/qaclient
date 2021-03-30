import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import '../Styling/Header.css'

import { Form, Modal, Button, Container, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import { BiDotsHorizontal } from 'react-icons/bi'
import context from 'react-bootstrap/esm/AccordionContext'

function UserList(props) {
    const { state: contextState, dispatch } = useContext(AppContext)

    function promoteAdmin(id) {
        API.updateAdmin(id, contextState.roomKey);
    }

    function kickUser(id) {
        //TODO
    }

    function displayAllUsers() {

        // API.updateAdmin(contextState.userId, contextState.roomKey)
        // dispatch({ type: 'update-admins', admins: contextState.admins })

        return (
            <div>
                {contextState.users.map(element =>
                    <div className="flex">
                        <div className="flex-1">
                            {element.name} - {element.id}
                        </div>
                        <DropdownButton className="flex-none justify-end" title={<BiDotsHorizontal />} id="basic-nav-dropdown">
                            <Dropdown.Item value="promote-admin" onClick={() => promoteAdmin(element.id)}>
                                Promote to Admin
                        </Dropdown.Item>
                            <Dropdown.Item value="kick-user" onClick={() => kickUser(element.id)}>
                                Kick User
                        </Dropdown.Item>
                        </DropdownButton>
                    </div>
                )}
            </div>
        );
    }

    function displayAdministrativeUsers() {
        return null;
    }

    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={props.show}>
            <Modal.Header closeButton onClick={props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">Users</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <h5>Administrative Users</h5>
                    </Row>
                    <Row>
                        {displayAdministrativeUsers()}
                    </Row>
                    <Row>
                        <h5>All Users</h5>
                    </Row>
                    <Row>
                        {displayAllUsers()}
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserList
