import { React, useContext, useEffect, useRef, useState } from 'react'
import { AppContext, useAppState, useDispatch } from '../AppContext'
import '../Styling/index.css'
import '../index.css'
import '../Styling/Header.css'

import Download from './Download'
import UsersPage from '../Views/UsersPage'

import { Container, FormControl, Dropdown, DropdownButton, Button, InputGroup } from 'react-bootstrap'
import { IoSettingsSharp } from "react-icons/io5"
import { useRouteMatch } from 'react-router'

function Header(props) {


    return (
        <div className="flex flex-col md:flex-row justify-between max-w mx-8 mt-4">
            <div className="flex-initial pl-16">
                <a className="primary-color font-bold text-2xl" href="/">
                    SmallTalk
                </a>
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
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const checkClick = (e) => {
        if (ref.current) {
            if (e.target.contains(ref.current)) {
                setOpen(false);
            }
        }
    }

    useEffect(() => {
        window.addEventListener("mousedown", checkClick);
        return () => {
            window.removeEventListener("mousedown", checkClick);
        }
    })

    const Item = (props) => {
        const item = props.item();
        if (!item) {
            return null
        }
        return <div className="flex hover:bg-gray-200 hover:shadow-md py-3 rounded-md cursor-pointer">
            <span className="flex-initial">
                {item}
            </span>
            <div className="flex flex-col">
                <div className="pl-2 font-semibold self-start">
                    {props.title}
                </div>
                <span className="pl-2">
                    {props.desc}
                </span>
            </div>
        </div>
    }
    return <div ref={ref} className="relative w-full h-full">
        <button className="m-2 lg-button" onClick={() => setOpen(!open)}>
            <IoSettingsSharp size={18} />
        </button>
        <div className={(!open ? "hidden " : "") + "absolute origin-top-right right-0"}>
            <div className="grid grid-cols-2 gap-4 h-full bg-gray-100 rounded-md p-4 shadow-lg border-gray-200 border-2" style={{ width: "60rem" }}>
                <Item item={Download} title="Download" desc="Download a transcript of the current discussion." />
                <Item item={UsersPage} title="Users" desc="View the current users in the room." />
            </div>
        </div>
    </div>
}

const RenderIfInRoom = ({ component }) => {
    const state = useAppState();
    const match = useRouteMatch("/room/:roomID");
    if (state.displayName == null || !match) {
        return null;
    } else {
        return component();
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
                    <FormControl
                        placeholder="Type any keyword..."
                        onChange={handleSearch}
                        className="search-input text-center"
                    />
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
        updateFilterValue(e.target.innerText)
        dispatch({ type: 'update-filter', filter_by: e.target.innerText })
    }

    return <div>
        <DropdownButton
            title={filterValue === '' ? 'Sort Discussions' : filterValue}
            id="basic-nav-dropdown"
        >
            <Dropdown.Item value="Popularity" onClick={handleSort}>
                Popularity
            </Dropdown.Item>
            <Dropdown.Item value="Date" onClick={handleSort}>
                Date
            </Dropdown.Item>
            <Dropdown.Item value="Solved" onClick={handleSort}>
                Solved
            </Dropdown.Item>
            <Dropdown.Item value="" onClick={handleSort}>
                Reset
            </Dropdown.Item>
        </DropdownButton>
    </div>
}

