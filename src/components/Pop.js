import { motion } from "framer-motion";
import React from "react";


function PopUp(props) {
    if (props.vis === true) {
        return (
            <motion.div className="popup" animate={{ scale: 1, opacity: 1 }}>
                <h1>{props.add} has been {props.process}</h1>
            </motion.div>
        )
    } else {
        return (
            <motion.div className="popup" animate={{ scale: 0 }}>
                <h1>{props.add} has been {props.process}</h1>
            </motion.div>
        )
    }

}

export default PopUp;