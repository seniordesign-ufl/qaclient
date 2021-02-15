import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

//Components
import PostSummary from "../components/PostSummary"
import { socket } from "../components/socket";

function Room(props) {
    const { state: contextState, dispatch } = useContext(AppContext);
    const [numUsers, setNumUsers] = useState(0);
    const [name, setName] = useState('');
    const [content, setContent] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed suscipit arcu, ac sagittis felis. Integer dictum vehicula odio, et dignissim risus commodo et. Mauris vitae nisl mi. Vestibulum semper arcu tortor, vel egestas tellus volutpat non. Morbi porttitor gravida massa, ac finibus quam malesuada vitae. Suspendisse gravida tincidunt arcu, in maximus erat convallis sed. Quisque ac accumsan eros.')

    useEffect(() => {
        //Will be undefined on first load for everyone except creator of room
        if (contextState.displayName !== null)
        {
            socket.emit('join', {userName: contextState.displayName, groupID: props.match.params.roomID});
            socket.on('update-users', ({names}) => {
                setNumUsers(names.length);
            });
            //Called when user leaves current page
            window.addEventListener("beforeunload", function (event) {
                socket.emit('leave', {userName: contextState.displayName, groupID: props.match.params.roomID});
                socket.off('update-users', ({}));
            })
            // unsubscribe from event for preventing memory leaks
            return () => {
                window.removeEventListener("beforeunload", function (event) {
                    socket.emit('leave', {userName: contextState.displayName, groupID: props.match.params.roomID});
                    socket.off('update-users', ({}));
                })
            };
        }
    }, [contextState.displayName]); //Rerun once name is added

    function handleJoinClick() {
        dispatch({ type: "update-name", displayName: name });
    }

    return (
        <div className="room-page">
            {contextState.displayName !== null ?
                <div>
                    <p>{numUsers}</p> 
                    <PostSummary title='Test Title' content={content} author='Noah Rieck' upVotes={5} comments={6} time={10}></PostSummary>
                </div> 
                
                :

                <div className="create">
                    <input placeholder="Enter Display Name" onChange={(e) => setName(e.target.value)} /> <br />
                    <button onClick={handleJoinClick}>Join Room</button>
                </div>
            }
        </div>
    );
}

export default Room;