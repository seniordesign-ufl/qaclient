import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import { FaRegClipboard, FaClipboardCheck } from 'react-icons/fa'

import Header from '../components/Header'

import '../Styling/LandingPage.css'
import '../Styling/index.css'
import Slideout from '../components/Slideout'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * Landing page, first view that user interacts with.
 * @param {} props
 */
function Landing(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const [showLink, updateShowLink] = useState(false)
    const [name, updateName] = useState('')
    const [discussionName, updateDiscussionName] = useState('')
    const [email, updateEmail] = useState('')
    /* 
    Function That Executes When Generate Room Button Is Clicked
    Updates The Room Code, Display Name, and Sets The Show Link Boolean to True
    The Code and Display Name Will Be Sent Over To The Generate Component
    */
    function handleGenerateClick(e) {
        e.preventDefault()
        let emailInfo = {
            discussionName: discussionName,
            email: email
        }
        if (name) {
            dispatch({ type: 'update-name', displayName: name})
            updateShowLink(true)
            API.requestRoom(emailInfo)
        } else {
            toast.error('Please input a name')
        }
    }
    return (
        <div>
            <Header roomKey={contextState.roomKey} />
            <div className="landing-page md:w-1/2 p-10">
                <div className="">
                    <div>
                        <h3 className="font-bold text-3xl ">Create a Discussion Room</h3>
                        <br />
                        <br />
                        <form onSubmit={handleGenerateClick}>
                            <input
                                type="text"
                                id="displayName"
                                className="form-control w-full"
                                aria-describedby="passwordHelpBlock"
                                input
                                placeholder="Enter Display Name"
                                onChange={(e) => updateName(e.target.value)}
                            />
                            <br />
                            <input
                                type="text"
                                id="discussionName"
                                className="form-control w-full"
                                aria-describedby="passwordHelpBlock"
                                input
                                placeholder="Enter Discussion Name"
                                onChange={(e) => updateDiscussionName(e.target.value)}
                            />{' '}
                            <br />
                            <input
                                type="text"
                                id="email"
                                className="form-control w-full"
                                aria-describedby="passwordHelpBlock"
                                input
                                placeholder="Enter Email"
                                onChange={(e) => updateEmail(e.target.value)}
                            />{' '}
                            <br />
                            <button
                                type="button"
                                className="btn btn-primary btn-lg generate-btn"
                                disabled={showLink}
                                onClick={handleGenerateClick}
                            >
                                Generate Room
                            </button>
                        </form>
                    </div>
                    <div className="link-box">
                        {showLink ? (
                            <Slideout>
                                <div>
                                    Link:{' '}
                                    <Link to={`/room/${contextState.roomKey}`}>
                                        {'https://localhost:3001/room/' + contextState.roomKey}
                                    </Link>
                                    <Copy link={`https://localhost:3001/room/${contextState.roomKey}`} />
                                </div>
                            </Slideout>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Copy button that disables itself once clicked.
 * @param {} props
 */
function Copy(props) {
    const [clicked, setClicked] = useState(false)
    const doCopy = () => {
        navigator.clipboard.writeText(props.link)
        toast('Copied!')
        setClicked(true)
    }
    return (
        <>
            <button onClick={doCopy} disabled={clicked} className={`copy-btn inline-flex ${clicked && 'clicked'}`}>
                {clicked ? (
                    <FaClipboardCheck className="flex-1 self-center" />
                ) : (
                    <FaRegClipboard className="flex-1 self-center" />
                )}
            </button>
        </>
    )
}

export default Landing
