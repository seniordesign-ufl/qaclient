import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import '../Styling/Header.css'

import { Form, Modal, Button, Container, Row } from 'react-bootstrap'
import { BsPeopleFill } from 'react-icons/bs'

import UserList from '../components/UserList'

function UsersPage(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const [showUsers, setShowUsers] = useState(false)
    const handleShow = () => setShowUsers(true)
    const handleClose = () => setShowUsers(false)

    if (contextState.admin === true) {
        return (
            <div>
                <Button id="userlist" onClick={handleShow}>
                    <BsPeopleFill />
                </Button>
                <UserList show={showUsers} onHide={handleClose} />
            </div>
        )
    }
    else {
        return null;
    }
}

export default UsersPage