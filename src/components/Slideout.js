import { useTransition, animated } from 'react-spring'

export default function Slideout(props) {
    const transitions = useTransition(null, null, {
        from: { transform: 'translate3d(-50%,0,0)' },
        enter: { transform: 'translate3d(0,0,0)' },
        leave: { transform: 'translate3d(-50%,0,0)' },
    })
    const children = props.children
    return transitions.map(({ item: Item, props, key }) => (
        <div key={key} style={{ overflow: 'hidden' }}>
            <animated.div key={key} style={props}>
                {children}
            </animated.div>
        </div>
    ))
}
