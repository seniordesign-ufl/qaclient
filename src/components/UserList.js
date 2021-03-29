import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import '../Styling/Header.css'

import { Form, Modal, Button, Container, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import { BiDotsHorizontal } from 'react-icons/bi'
import context from 'react-bootstrap/esm/AccordionContext'

function UserList(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const [ showUsers, setShowUsers ] = useState(false)

    function displayAllUsers() {
        console.log("CONTEXT")
        console.log(contextState);

        console.log("ADMINs")
    
        API.updateAdmin(contextState.userId, contextState.roomKey)
        // dispatch({ type: 'update-admins', admins: contextState.admins })

        return (
            <div className="flex-initial">
                {contextState.users.map(element => 
                <div>
                    {element.name} - {element.id}
                    <DropdownButton className="flex-none" title={<BiDotsHorizontal />} id="basic-nav-dropdown">
                        <Dropdown.Item value="promote-admin">
                            Promote to Admin
                        </Dropdown.Item>
                        <Dropdown.Item value="kick-user">
                            Kick User
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
                )}
            </div>
        );
    }

    function displayAdministrativeUsers() {
        console.log("ADMINS")
        console.log(contextState)
    }

    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={props.show}>
            <Modal.Header closeButton onClick={props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">Users</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <h4>Administrative Users</h4>
                    </Row>
                    <Row>
                        {displayAdministrativeUsers()}
                    </Row>
                    <Row>
                        <h4>All Users</h4>
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
