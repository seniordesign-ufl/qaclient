import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import { CSVLink } from 'react-csv'

import '../Styling/Header.css'

import { Form, Modal, Button, Container, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import { BiDotsHorizontal, BiImport } from 'react-icons/bi'
import context from 'react-bootstrap/esm/AccordionContext'

function UserList(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const headers = [{ label: "ID Number", key: "id" }, { label: "Name", key: "name" }, { label: "Administrator?", key: "administrator"}];
    const [ data, setData ] = useState([{}]);

    function promoteAdmin(id) {
        API.updateAdmin(id, contextState.roomKey);
    }

    function demoteAdmin(id) {
        API.demoteAdmin(id, contextState.roomKey);
    }

    function kickUser(id) {
        //TODO
    }

    function displayAllUsers() {

        // API.updateAdmin(contextState.userId, contextState.roomKey)
        // dispatch({ type: 'update-admins', admins: contextState.admins })

        let regular_users = Array.from(contextState.users).filter((c) => contextState.admins.includes(c.id) === false)

        if (regular_users.length === 0)
        {
            return null;
        }
        else
        {
            return (
                <div className="w-full">
                    <h5>Regular Users</h5>
                    {regular_users.map(element =>
                        <div className="flex">
                            <div className="flex-1 w-4/5">
                                <h4>{element.name}</h4>
                                <p className="text-sm italic">{element.id}</p>
                            </div>
                            <DropdownButton className="flex-2" title={<BiDotsHorizontal />} id="basic-nav-dropdown">
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
        
    }

    function displayAdministrativeUsers() {
        let admins = Array.from(contextState.users).filter((c) => contextState.admins.includes(c.id) === true)
        
        /*
        *   Checks to see if user is the creator of the room.
        *   If true, then they will have the ability to kick and demote any administrator.
        *   If not true, then they will not have the ability to kick and demonte administrators.
        */

        if(contextState.userId === contextState.admins[0])
        {
            let temp = admins.shift()
            return(
                <div className="w-full">
                    <h5>Administrative Users</h5>
                    <div className="flex">
                        <div className="flex-1 w-4/5">
                            <h4>{temp.name}</h4>
                            <p className="text-sm italic">{temp.id}</p>
                        </div>
                    </div>
                    {admins.map(element =>
                        <div className="flex">
                            <div className="flex-1 w-4/5">
                                <h4>{element.name}</h4>
                                <p className="text-sm italic">{element.id}</p>
                            </div>
                            <DropdownButton className="flex-2" title={<BiDotsHorizontal />} id="basic-nav-dropdown">
                                <Dropdown.Item value="promote-admin" onClick={() => demoteAdmin(element.id)}>
                                    Demote Admin
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
        else
        {
            return (
                <div className="w-full">
                    <h5>Administrative Users</h5>
                    {admins.map(element =>
                        <div className="flex">
                            <div className="flex-1 w-4/5">
                                <h4>{element.name}</h4>
                                <p className="text-sm italic">{element.id}</p>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        
    }

    // TO-DO: Create Excel Files With All User Information
    function downloadUsers() {
        let dataValues = [];

        let ordered_list = Array.from(contextState.users);
        ordered_list.sort(function (x,y) {
            return contextState.admins.includes(x.id) - contextState.admins.includes(y.id)
        });
        ordered_list.reverse();

        ordered_list.forEach(element => {
            var dict = {}
            dict["id"] = element.id;
            dict["name"] = element.name;
            dict["administrator"] = contextState.admins.includes(element.id);
            dataValues.push(dict);
        });

        setData(dataValues);
        console.log(data)
    }

    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={props.show}>
            <Modal.Header closeButton onClick={props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        {displayAdministrativeUsers()}
                    </Row>
                    <Row>
                        {displayAllUsers()}
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="bg-gray-200">
                    <CSVLink className="max-h-full" onClick={() => downloadUsers()} headers={headers} data={data} filename="users.csv">
                            <BiImport />
                    </CSVLink>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserList
