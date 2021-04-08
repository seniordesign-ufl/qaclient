import { React, useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import '../Styling/index.css'
import '../Styling/Header.css'

import Download from './Download'

import { Container, FormControl, Dropdown, DropdownButton, Button, InputGroup } from 'react-bootstrap'
import { Route } from 'react-router'

function Header(props) {
    return (
        <div className="header">
            <Container fluid>
                <div className="md:flex">
                    <div className="flex-initial">
                        <a className="navbar-brand" href="/">
                            SmallTalk
                        </a>
                    </div>
                    {/* Only show when URL matches a room url. */}
                    <Route path={'/room/:roomID/'} component={Searchbar} />
                </div>
            </Container>
        </div>
    )
}
function Searchbar(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const [filterValue, updateFilterValue] = useState('')

    const handleSearch = (e) => {
        dispatch({ type: 'update-search', search_phrase: e.target.value })
    }

    const handleSort = (e) => {
        updateFilterValue(e.target.innerText)
        dispatch({ type: 'update-filter', filter_by: e.target.innerText })
    }

    if (contextState.displayName != null) {
        return (
            <>
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
                    <div className="flex-initial">
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
                        </DropdownButton>
                    </div>
                    <div className="flex-initial self-center">
                        <Download />
                    </div>

                </div>
            </>
        )
    } else {
        return <></>
    }
}
export default Header
