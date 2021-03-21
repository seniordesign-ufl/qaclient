import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import '../Styling/Header.css'
import '../Styling/NewPost.css'

import { Form, Modal, Button } from 'react-bootstrap'

function NewPost(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const [title, updateTitle] = useState('')
    const [body, updateBody] = useState('')
    const [time, updateTime] = useState(new Date())
    const [anonymous, updateAnonymous] = useState(false)
    const [attachment, updateAttachment] = useState()

    const handleSubmitForm = (e) => {
        console.log("We'll submit here.")
        updateTime(new Date())

        const post = {
            title: title,
            content: body,
            author: contextState.displayName,
            time: time,
            isAnon: anonymous,
        }

        console.log(post.title)
        console.log(post.content)
        console.log(post.author)
        console.log(post.time)
        console.log(contextState.roomKey)
        API.createPost(post, contextState.roomKey)
        props.onHide()
    }

    const handleTitleChange = (e) => {
        updateTitle(e.target.value)
    }
    const handleBodyChange = (e) => {
        updateBody(e.target.value)
    }

    const handleAttachment = (e) => {
        console.log(e)
        updateAttachment(e.target.value)
    }

    const handleAnonymousCheck = (e) => {
        updateAnonymous(!anonymous)
    }

    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={props.show}>
            <Modal.Header closeButton onClick={props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">Create New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="post.title">
                        <Form.Label>
                            <b>TITLE</b>
                            <span className="required">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Short, descriptive subject"
                            onChange={handleTitleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="post.body">
                        <Form.Label>
                            <b>DETAILS</b>
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Any additional details..."
                            rows={5}
                            onChange={handleBodyChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="post.attachments">
                        <Form.File id="formAttachments" onChange={handleAttachment} />
                    </Form.Group>
                    <Form.Group controlId="post.anonymous">
                        <Form.Check
                            type={'checkbox'}
                            id={'default-checkbox'}
                            label={'Post Anonymously'}
                            onClick={handleAnonymousCheck}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="cancel-btn" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button variant="primary" className="create-post-btn" onClick={handleSubmitForm}>
                    Create Post
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewPost
