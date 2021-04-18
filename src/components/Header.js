import { React, useContext, useEffect, useRef, useState } from 'react'
import { AppContext, useAppState, useDispatch, API } from '../AppContext'
import '../Styling/index.css'
import '../index.css'
import '../Styling/Header.css'
import SmallTalk_Logo from '../static/smalltalk_logo.svg'

import { Container, FormControl, Dropdown, DropdownButton, Button, InputGroup } from 'react-bootstrap'
import { IoLogOutOutline, IoSettingsSharp } from 'react-icons/io5'
import { BsDownload } from 'react-icons/bs'
import { BsPeopleFill } from 'react-icons/bs'
import UserList from '../features/users/UserList'
import { useHistory, useRouteMatch } from 'react-router'
import DownloadTranscript from '../features/transcript/DownloadTranscript'

function Header(props) {
    return (
        <div className="flex flex-col md:flex-row justify-between max-w mx-8 mt-4">
            <div className="flex-initial pl-16">
                <span className="primary-color font-bold text-2xl" href="/">
                    <img src={SmallTalk_Logo} />
                </span>
            </div>
            <div className="flex-1">
                <RenderIfInRoom component={Searchbar} />
            </div>
            <div className="flex-initial">
                <RenderIfInRoom component={SortDiscussions} />
            </div>
            <div className="flex-initial">
                <RenderIfInRoom component={Options} />
            </div>
        </div>
    )
}

function Options(props) {
    const state = useAppState()
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const [showUsers, setShowUsers] = useState(false)
    const handleShow = () => !showUsers && setShowUsers(true)
    const handleClose = () => showUsers && setShowUsers(false)
    const history = useHistory()

    const handleLogout = () => {
        API.leave(state.displayName, state.roomKey)
        localStorage.removeItem('stjwt')
        window.location.replace(`/`)
    }

    const checkClick = (e) => {
        const body = document.querySelector('body')
        const modalOpen = body.classList.contains('modal-open')
        if (ref.current && !ref.current.contains(e.target) && !modalOpen) {
            setOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener('mousedown', checkClick)
        return () => {
            window.removeEventListener('mousedown', checkClick)
        }
    })

    /**
     * Slightly hacky, but takes an child component that will be passed a click event via ref.
     */
    const Item = (props) => {
        if (!props.children) {
            return null
        }
        return (
            <div
                className="flex hover:bg-gray-200 hover:shadow-md py-3 rounded-md cursor-pointer"
                onClick={props.onClick}
            >
                <span className="flex-initial">{props.children}</span>
                <div className="flex flex-col">
                    <div className="pl-2 font-semibold self-start">{props.title}</div>
                    <span className="pl-2">{props.desc}</span>
                </div>
            </div>
        )
    }
    return (
        <div ref={ref} className="relative w-full h-full z-10">
            <button className="m-2 lg-button" onClick={() => setOpen(!open)}>
                <IoSettingsSharp size={18} />
            </button>
            <div className={(!open ? 'hidden' : 'showy') + ' absolute origin-top-right right-0'}>
                <div
                    className="flex flex-col h-full bg-gray-100 rounded-md p-4 shadow-lg border-gray-200 border-2"
                    style={{ width: '60rem' }}
                >
                    <div className="pl-3 self-start">
                        Welcome, <span className="font-semibold">{state.displayName}</span>!
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Item
                            title="Download"
                            desc="Download a transcript of the current discussion."
                            onClick={() => DownloadTranscript(state)}
                        >
                            <button className="lg-button" id="download">
                                <BsDownload size={18} />
                            </button>
                        </Item>
                        <Item title="Users" desc="View the current users in the room." onClick={handleShow}>
                            {state.admin && (
                                <>
                                    <button className="lg-button">
                                        <BsPeopleFill size={18} />
                                    </button>
                                    <UserList show={showUsers} onHide={handleClose} />
                                </>
                            )}
                        </Item>
                        <Item title="Logout" desc="Sign out of the current discussion." onClick={handleLogout}>
                            <button className="lg-button">
                                <IoLogOutOutline size={18} />
                            </button>
                        </Item>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RenderIfInRoom = ({ component }) => {
    const state = useAppState()
    const match = useRouteMatch('/room/:roomID')
    if (state.displayName == null || !match || state.kicked == true) {
        return null
    } else {
        return component()
    }
}
function Searchbar(props) {
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        dispatch({ type: 'update-search', search_phrase: e.target.value })
    }

    return (
        <div className="flex flex-1 flex-col md:flex-row">
            <div className="flex-1 md:pl-40 md:pr-40">
                <InputGroup>
                    <FormControl placeholder="Type any keyword..." onChange={handleSearch} className="search-input" />
                </InputGroup>
            </div>
        </div>
    )
}
export default Header

function SortDiscussions(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const [filterValue, updateFilterValue] = useState('')

    const handleSort = (e) => {
        if (e.target.innerText === 'Reset') {
            updateFilterValue('')
            dispatch({ type: 'update-filter', filter_by: '' })
            return
        }
        updateFilterValue(e.target.innerText)
        dispatch({ type: 'update-filter', filter_by: e.target.innerText })
    }

    return (
        <div>
            <DropdownButton title={filterValue === '' ? 'Sort Discussions' : filterValue} id="basic-nav-dropdown">
                <Dropdown.Item value="Popularity" onClick={handleSort}>
                    Popularity
                </Dropdown.Item>
                <Dropdown.Item value="Date" onClick={handleSort}>
                    Date
                </Dropdown.Item>
                <Dropdown.Item value="Solved" onClick={handleSort}>
                    Solved
                </Dropdown.Item>
                <Dropdown.Item value="Reset" onClick={handleSort}>
                    Reset
                </Dropdown.Item>
            </DropdownButton>
        </div>
    )
}
