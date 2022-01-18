import React from "react";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import axios from 'axios';
import PopUp from "./Pop";

function StatusBar(props) {

    const [idk, newIdk] = useState('')
    const [update, newUpdate] = useState(false)
    function changes() {
        setTimeout(() => {
            document.getElementById('sendtoserverButton').style.pointerEvents = 'none'
            if (change === false) {
                newChange(true)
                axios.post('https://glacial-fortress-97136.herokuapp.com/users/users/addtolist', {
                    userid: localStorage.getItem('userid'),
                    stocktoadd: props.stock
                })
                console.log(change)
                newUpdate(true)
                newIdk('added')
                setTimeout(() => {
                    newUpdate(false)
                }, 1500)
            } if (change === true) {
                newChange(false)
                axios.post('https://glacial-fortress-97136.herokuapp.com/users/deletefromlist', {
                    userid: localStorage.getItem('userid'),
                    stocktoadd: props.stock
                })
                newUpdate(true)
                newIdk('deleted')
                setTimeout(() => {
                    newUpdate(false)
                }, 1500)
            }
        }, 1000);
    }

    useEffect(() => {
        axios.post('https://glacial-fortress-97136.herokuapp.com/users/UsernameList', {
            id: localStorage.getItem('userid')
        }).then(function (results) {
            console.log(results)
            if ((results.data.list).includes(props.stock)) {
                newChange(true)
            }
            else {
                newChange(false)
            }
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [change, newChange] = useState(false)
    if (change === false) {
        return (
            <motion.div animate={{ backgroundColor: '#00FF00', opacity: 1 }} whileHover={{ width: '120px', height: '45px' }} onClick={() => changes()} id='sendtoserverButton'>
                <motion.p animate={{ margin: 'auto' }}>Add + </motion.p>
                <PopUp process={idk} add={props.stock} vis={update} />
            </motion.div>

        )
    }
    else {
        return (
            <motion.button onClick={() => changes()} animate={{ backgroundColor: '#ff0000', opacity: 1 }} whileHover={{ width: '120px', height: '45px' }} id='sendtoserverButton'>
                <motion.p animate={{ margin: 'auto' }}>Delete - </motion.p>
                <PopUp process={idk} add={props.stock} vis={update} />
            </motion.button>
        )
    }
}

export default StatusBar;