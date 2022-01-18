import React from "react";
import { Context } from "../Store";
import { useContext } from "react";

function TestComponent(props) {
    const [state, setState] = useContext(Context)
    return (
        <div onClick={() => setState({
            username: props.test,
            password: 'password',
            list: ['AAPL']
        })}>
            {state.username}
        </div>
    )
}

export default TestComponent;