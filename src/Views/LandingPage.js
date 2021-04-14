import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import { FaRegClipboard, FaClipboardCheck } from 'react-icons/fa'
import { CgLink } from 'react-icons/cg'

import Header from '../components/Header'
import RoomIllustration from '../static/room_illustration.svg'

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
            dispatch({ type: 'update-name', displayName: name })
            updateShowLink(true)
            API.requestRoom(emailInfo)
        } else {
            toast.error('Please input a name')
        }
    }

    function handleJoin(e) {
        API.join(contextState.displayName, contextState.roomKey);
    }
    return (
        <div>
            <Header roomKey={contextState.roomKey} />
            <div className="grid grid-cols-2 m-3">
                <div className="landing-welcome ml-9 mt-8 p-10">
                    <h3 className="font-bold text-6xl">Let's get talkin'!</h3>
                    <br />
                    <p className="font-medium text-lg">Introducing a new way to have live lecture discussion.</p>
                    <img className="mx-auto" src={RoomIllustration} />
                </div>

                <div className="landing-page ml-8 p-10">
                    <div className="">
                        <div>
                            <p className="font-medium">Try creating a discussion room!</p>
                            <h3 className="font-bold text-3xl mb-10 text-gray-700">Create a Discussion Room</h3>
                            <form onSubmit={handleGenerateClick}>
                                <label htmlFor="displayName" className="float-left text-gray-700 text-md font-bold mt-2">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    id="displayName"
                                    className="form-control w-full"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Enter Display Name"
                                    onChange={(e) => updateName(e.target.value)}
                                />
                                <label htmlFor="discussionName" className="float-left text-gray-700 text-md font-bold mt-2">
                                    Discussion Name
                                </label>
                                <input
                                    type="text"
                                    id="discussionName"
                                    className="form-control w-full"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Enter Discussion Name"
                                    onChange={(e) => updateDiscussionName(e.target.value)}
                                />
                                <label htmlFor="email" className="float-left text-gray-700 text-md font-bold mt-2">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="form-control w-full"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Enter Email (optional)"
                                    onChange={(e) => updateEmail(e.target.value)}
                                />
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
                    </div>
                    <div className="link-box">
                        {showLink ? (
                            <Slideout>
                                <div className="flex justify-center items-center">
                                    <Link to={`/room/${contextState.roomKey}`} onClick={handleJoin}>
                                        <CgLink size={24} className="inline-block" />
                                        {window.location.href + contextState.roomKey}
                                    </Link>
                                    <Copy link={window.location.href + contextState.roomKey} />
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
 * @param { } props
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
            <button onClick={doCopy} disabled={clicked} className={`p-2 ml-2 rounded-md copy-btn inline-flex ${clicked && 'clicked'}`}>
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
