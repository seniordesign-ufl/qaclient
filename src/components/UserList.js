import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import { CSVLink } from 'react-csv'
import { toast } from 'react-toastify'

import '../Styling/Header.css'

import { Form, Modal, Button, Container, Row, Dropdown, DropdownButton } from 'react-bootstrap'
import { BiDotsHorizontal, BiImport, BiUser, BiUserMinus, BiUserCheck, BiMeteor } from 'react-icons/bi'
import { BsExclamationSquareFill } from 'react-icons/bs'

function UserList(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const headers = [{ label: "ID Number", key: "id" }, { label: "Name", key: "name" }, { label: "Administrator?", key: "administrator"}];
    const [ data, setData ] = useState([{}]);
    const [ display, setDisplay] = useState("All")

    function promoteAdmin(id, name) {
        toast.success(name + ' was promoted to admin!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        API.updateAdmin(id, contextState.roomKey);
    }

    function demoteAdmin(id, name) {
        toast.success(name + ' was demoted from admin!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        API.demoteAdmin(id, contextState.roomKey);
    }

    function kickUser(id, name) {
        toast.success(name + ' has been kicked!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });

        API.kickUser(id, contextState.roomKey);
        //TODO
    }

    function option() {
        if(display === "All") 
        {
            return displayAllUsers()
        }
        else if(display === "Administrators") 
        {
            return displayAdministrativeUsers()
        }
        else if(display === "Regulars") 
        {
            return displayRegularUsers()
        }
    }

    function displayAllUsers() {
        let admins = Array.from(contextState.users).filter((c) => contextState.admins.includes(c.id) === true)
        let regular_users = Array.from(contextState.users).filter((c) => contextState.admins.includes(c.id) === false)

        if(contextState.userId === contextState.admins[0])
        {
            let temp = admins.shift()
            return(
                <div className="w-full">
                    <div className="flex flex-row justify-between py-2 bg-gray-300">
                        <div className="pl-4"><b>Name</b></div>
                        <div><b>UserID</b></div>
                        <div className="pr-4"><b>Actions</b></div>
                    </div>
                    <div className="flex flex-row pt-1 justify-between">
                        <div className="pl-4 flex flex-row">
                            <h6 className="pr-2">{temp.name}</h6>
                            <BiUser className="stroke-1" />
                        </div>
                        <div>
                            <p className="text-sm italic">{temp.id}</p>
                        </div>
                        <div className="pr-4">
                            <p>Creator</p>
                        </div>
                    </div>
                    {admins.map(element =>
                        <div className="flex flex-row justify-between border-top pt-1">
                            <div className="pl-4 flex flex-row">
                                <h6 className="pr-2">{element.name}</h6>
                                <BiUser className="stroke-1" />
                            </div>
                            <div>
                                <p className="text-sm italic">{element.id}</p>
                            </div>
                            <div className="flex flex-row pr-3">
                                <div className="pr-2 flex flex-col justify-center items-center">
                                    <BiUserMinus className="stroke-1 text-center" value="demote-admin" onClick={() => demoteAdmin(element.id, element.name)} />
                                    <p className="text-xs text-center">Demote</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <BiMeteor className="stroke-1 text-center" value="kick-user" onClick={() => kickUser(element.id, element.name)} />
                                    <p className="text-xs text-center">Kick</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {regular_users.map(element =>
                        <div className="flex flex-row justify-between border-top pt-1">
                            <div className="pl-4 flex flex-row">
                                <h6 className="pr-2">{element.name}</h6>
                            </div>
                            <div>
                                <p className="text-sm italic">{element.id}</p>
                            </div>
                            <div className="flex flex-row pr-3">
                                <div className="pr-2 flex flex-col justify-center items-center">
                                    <BiUserCheck className="stroke-1 text-center" value="promote-admin" onClick={() => promoteAdmin(element.id, element.name)} />
                                    <p className="text-xs text-center">Promote</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <BiMeteor className="stroke-1 text-center" value="kick-user" onClick={() => kickUser(element.id, element.name)} />
                                    <p className="text-xs text-center">Kick</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        else
        {
            let temp = admins.shift()
            return (
                <div className="w-full">
                    <div className="flex flex-row justify-between py-2 bg-gray-300">
                        <div className="pl-4"><b>Name</b></div>
                        <div><b>UserID</b></div>
                        <div className="pr-4"><b>Actions</b></div>
                    </div>
                    <div className="flex flex-row pt-1 justify-between">
                        <div className="pl-4 flex flex-row">
                            <h6 className="pr-2">{temp.name}</h6>
                            <BiUser className="stroke-1" />
                        </div>
                        <div>
                            <p className="text-sm italic">{temp.id}</p>
                        </div>
                        <div className="pr-4">
                            <p>Creator</p>
                        </div>
                    </div>
                    {admins.map(element =>
                        <div className="flex flex-row justify-between border-top pt-1">
                            <div className="pl-4 flex flex-row">
                                <h6 className="pr-2">{element.name}</h6>
                                <BiUser className="stroke-1" />
                            </div>
                            <div>
                                <p className="text-sm italic">{element.id}</p>
                            </div>
                            <div className="pr-4">
                                <p>Admins</p>
                            </div>
                        </div>
                    )}
                    {regular_users.map(element =>
                        <div className="flex flex-row justify-between border-top pt-1">
                            <div className="pl-4 flex flex-row">
                                <h6 className="pr-2">{element.name}</h6>
                            </div>
                            <div>
                                <p className="text-sm italic">{element.id}</p>
                            </div>
                            <div className="flex flex-row pr-3">
                                <div className="pr-2 flex flex-col justify-center items-center">
                                    <BiUserCheck className="stroke-1 text-center" value="promote-admin" onClick={() => promoteAdmin(element.id, element.name)} />
                                    <p className="text-xs text-center">Promote</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <BiMeteor className="stroke-1 text-center" value="kick-user" onClick={() => kickUser(element.id, element.name)} />
                                    <p className="text-xs text-center">Kick</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    }

    function displayRegularUsers() {

        // API.updateAdmin(contextState.userId, contextState.roomKey)
        // dispatch({ type: 'update-admins', admins: contextState.admins })

        let regular_users = Array.from(contextState.users).filter((c) => contextState.admins.includes(c.id) === false)

        if (regular_users.length === 0)
        {
            return <p>No Regular Users!</p>;
        }
        else
        {
            return (
                <div className="w-full">
                    <div className="flex flex-row justify-between py-2 bg-gray-300">
                        <div className="pl-4"><b>Name</b></div>
                        <div><b>UserID</b></div>
                        <div className="pr-4"><b>Actions</b></div>
                    </div>
                    {regular_users.map(element =>
                        <div className="flex flex-row justify-between border-top pt-1">
                            <div className="pl-4 flex flex-row">
                                <h6 className="pr-2">{element.name}</h6>
                            </div>
                            <div>
                                <p className="text-sm italic">{element.id}</p>
                            </div>
                            <div className="flex flex-row pr-3">
                                <div className="pr-2 flex flex-col justify-center items-center">
                                    <BiUserCheck className="stroke-1 text-center" value="promote-admin" onClick={() => promoteAdmin(element.id, element.name)} />
                                    <p className="text-xs text-center">Promote</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <BiMeteor className="stroke-1 text-center" value="kick-user" onClick={() => kickUser(element.id, element.name)} />
                                    <p className="text-xs text-center">Kick</p>
                                </div>
                            </div>
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
                    <div className="flex flex-row justify-between py-2 bg-gray-300">
                        <div className="pl-4"><b>Name</b></div>
                        <div><b>UserID</b></div>
                        <div className="pr-4"><b>Actions</b></div>
                    </div>
                    <div className="flex flex-row pt-1 justify-between">
                        <div className="pl-4 flex flex-row">
                            <h6 className="pr-2">{temp.name}</h6>
                            <BiUser className="stroke-1" />
                        </div>
                        <div>
                            <p className="text-sm italic">{temp.id}</p>
                        </div>
                        <div className="pr-4">
                            <p>Creator</p>
                        </div>
                    </div>
                    {admins.map(element =>
                        <div className="flex flex-row justify-between border-top pt-1">
                            <div className="pl-4 flex flex-row">
                                <h6 className="pr-2">{element.name}</h6>
                                <BiUser className="stroke-1" />
                            </div>
                            <div>
                                <p className="text-sm italic">{element.id}</p>
                            </div>
                            <div className="flex flex-row pr-3">
                                <div className="pr-2 flex flex-col justify-center items-center">
                                    <BiUserMinus className="stroke-1 text-center" value="demote-admin" onClick={() => demoteAdmin(element.id, element.name)} />
                                    <p className="text-xs text-center">Demote</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <BiMeteor className="stroke-1 text-center" value="kick-user" onClick={() => kickUser(element.id, element.name)} />
                                    <p className="text-xs text-center">Kick</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        else
        {
            let temp = admins.shift()
            return (
                <div className="w-full">
                    <div className="flex flex-row justify-between py-2 bg-gray-300">
                        <div className="pl-4"><b>Name</b></div>
                        <div><b>UserID</b></div>
                        <div className="pr-4"><b>Actions</b></div>
                    </div>
                    <div className="flex flex-row pt-1 justify-between">
                        <div className="pl-4 flex flex-row">
                            <h6 className="pr-2">{temp.name}</h6>
                            <BiUser className="stroke-1" />
                        </div>
                        <div>
                            <p className="text-sm italic">{temp.id}</p>
                        </div>
                        <div className="pr-4">
                            <p>Creator</p>
                        </div>
                    </div>
                    {admins.map(element =>
                        <div className="flex flex-row justify-between border-top pt-1">
                            <div className="pl-4 flex flex-row">
                                <h6 className="pr-2">{element.name}</h6>
                                <BiUser className="stroke-1" />
                            </div>
                            <div>
                                <p className="text-sm italic">{element.id}</p>
                            </div>
                            <div className="pr-4">
                                <p>Admins</p>
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
        <Modal size="xl" aria-labelledby="contained-modal-title-vcenter" centered show={props.show}>
            <Modal.Header className="border-0" closeButton onClick={props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">Users</Modal.Title>
            </Modal.Header>
            <div className="flex flex-row border-bottom">
                <div className="w-2/3 flex flex-row">
                    <div className="pl-3 focus:text-gray-900 focus:border-b-8">
                        <h4 class="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => setDisplay("All")}>All</h4>
                    </div>
                    <div className="px-3 focus:text-gray-900 focus:border-b-8">
                        <h4 class="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => setDisplay("Administrators")}>Administrators</h4>
                    </div>
                    <div className="focus:text-gray-900 focus:border-b-8">
                        <h4 class="cursor-pointer text-gray-600 hover:text-gray-900" onClick={() => setDisplay("Regulars")}>Regulars</h4>
                    </div>
                </div>
                <div className="w-1/3">
                    <Button className="bg-gray-200 float-right">
                        <CSVLink className="max-h-full" onClick={() => downloadUsers()} headers={headers} data={data} filename="users.csv">
                            <BiImport />
                        </CSVLink>
                    </Button>
                </div>
            </div>
            <Modal.Body>
                <Row>
                    {option()}
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default UserList
