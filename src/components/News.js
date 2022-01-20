import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { motion } from "framer-motion";





function News() {
    const [done, newDone] = useState(false)
    const [load, newLoad] = useState(false)
    const [news, newNews] = useState([{ text: 'nice' }])



    useEffect(() => {
        axios.get('https://financialmodelingprep.com/api/v3/stock_news?limit=20&apikey=9cbd888276f170c52ac74137377dd93f').then(function (results) {
            console.log(results.data)
            newLoad(true)
            newNews(results.data)
        })
    }, [done]);

    if (load === true) {
        return (
            <motion.div className="newssection">
                <motion.div animate={{ opacity: 1 }} className='dashboardWelcome'>
                    <motion.h1 id='welcomeText' animate={{ fontSize: '80px' }}>News</motion.h1>
                </motion.div>
                <motion.div className="newsectionmap">
                    {news.map((nice, index) => (
                        <motion.a rel="noopener noreferrer" target="_blank" href={nice.url} animate={{ opacity: 1 }} id='newsCards' className="Card" key={index}>
                            <div className="textImgCont">
                                <h1 id="">{nice.symbol}</h1>
                                <h3>{nice.text}</h3>
                            </div>
                            <div load='lazy' style={{ backgroundImage: "url(" + nice.image + ')' }} className="imgContclass">
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>
        )
    } else {
        return (
            <motion.div>
                <h1>Could not load</h1>
                <button onClick={() => newDone(true)}></button>
            </motion.div>
        )
    }
}

export default News