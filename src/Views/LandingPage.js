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
    /* 
    Function That Executes When Generate Room Button Is Clicked
    Updates The Room Code, Display Name, and Sets The Show Link Boolean to True
    The Code and Display Name Will Be Sent Over To The Generate Component
    */
    function handleGenerateClick(e) {
        e.preventDefault()
        if (name) {
            dispatch({ type: 'update-name', displayName: name })
            API.requestRoom()
            updateShowLink(true)
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
                        <h3 className="font-bold text-3xl mb-10">Create a Discussion Room</h3>
                        <img className="mx-auto mb-4" src={RoomIllustration} />
                        <form onSubmit={handleGenerateClick}>
                            <input
                                type="text"
                                id="displayName"
                                className="form-control w-full"
                                aria-describedby="passwordHelpBlock"
                                input
                                placeholder="Enter Display Name"
                                onChange={(e) => updateName(e.target.value)}
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
                                <div className="flex justify-center items-center">
                                    <Link to={`/room/${contextState.roomKey}`}>
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
        </div >
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
