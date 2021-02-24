import { useTransition, animated } from 'react-spring'
import { useState } from 'react'

export default function Slideout(props) {
    const transitions = useTransition(null, null, {
        from: { transform: 'translate3d(-50%,0,0)' },
        enter: { transform: 'translate3d(0,0,0)' },
        leave: { transform: 'translate3d(-50%,0,0)' },
    })
    const children = props.children;
    // const [show, set] = useState(true)
    // const transitions = useTransition(show, null, {
    //     from: { position: 'absolute', opacity: 0 },
    //     enter: { opacity: 1 },
    //     leave: { opacity: 0 },
    // })
    // return transitions.map(({ item, key, props }) =>
    //     item && <animated.div key={key} style={props}>✌️</animated.div>
    // )
    return transitions.map(({ item: Item, props, key }) =>
        <div key={key} style={{ overflow: "hidden" }}>
            <animated.div key={key} style={props}>
                {children}
            </animated.div>
        </div>
    )
}