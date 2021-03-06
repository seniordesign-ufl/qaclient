import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import '../Styling/Header.css'
import '../Styling/NewPost.css'

import { Form, Modal, Button, Badge } from 'react-bootstrap'

function NewPost(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const [title, updateTitle] = useState('')
    const [body, updateBody] = useState('')
    const [time, updateTime] = useState(new Date())
    const [anonymous, updateAnonymous] = useState(false)
    const [attachment, updateAttachment] = useState()
    const [tag, updateTag] = useState('')
    const [displayError, updateDisplayError] = useState(false)
    const [tagList, updateTagList] = useState([])
    const [attachmentName, updateAttachmentName] = useState('')

    const handleSubmitForm = (e) => {
        updateTime(new Date())

        const post = {
            title: title,
            content: body,
            author: contextState.displayName,
            authorId: contextState.userId,
            time: time,
            isAnon: anonymous,
            tags: tagList,
            attachment: attachment,
            attachmentName: attachmentName,
        }

        API.createPost(post, contextState.roomKey)
        props.onHide()
    }

    function addTag() {
        if (tag !== '' && tagList.length < 5) {
            let newList = [...tagList]
            newList.push(tag)
            updateTagList(newList)
            updateTag('')
        } else if (tagList.length >= 5) {
            updateDisplayError(true)
        }
    }

    function removeTag(index) {
        let newList = [...tagList]
        newList.splice(index, 1)
        updateTagList(newList)
        updateDisplayError(false)
    }

    const handleTitleChange = (e) => {
        updateTitle(e.target.value)
    }
    const handleBodyChange = (e) => {
        updateBody(e.target.value)
    }
    const handleTagChange = (e) => {
        updateTag(e.target.value)
    }

    const handleAttachment = (e) => {
        updateAttachmentName(e.target.files[0].name)
        updateAttachment(e.target.files[0])
    }

    const handleAnonymousCheck = (e) => {
        updateAnonymous(!anonymous)
    }

    function mapTags() {
        return (
            <div className="inline-flex w-full text-lg font-extralight content-center mb-2">
                {tagList.map((tag, i) => (
                    <div className="mr-2 content-center" key={i}>
                        <Badge pill className="p-1.5" variant="secondary">
                            {tag}
                            <button className="w-4 h-5 ml-1" onClick={() => removeTag(i)}>
                                X
                            </button>
                        </Badge>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            onHide={props.onHide}
        >
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
                    <Form.Group controlId="post.body">
                        <Form.Label>
                            <b>TAGS</b>
                        </Form.Label>
                        <br />
                        <div className="flex mb-2.5">
                            <Form.Control
                                type="text"
                                value={tag}
                                placeholder="Words that summarize this post"
                                onChange={handleTagChange}
                                className="flex-1"
                            />
                            <Button
                                className="flex-none"
                                style={{ backgroundColor: '#e98074', border: 'none' }}
                                onClick={() => addTag()}
                            >
                                +
                            </Button>
                        </div>
                        {displayError ? (
                            <p className="text-red-600">{'A post can only have a maximum of 5 tags'}</p>
                        ) : null}
                        {tagList.length > 0 ? mapTags() : null}
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
