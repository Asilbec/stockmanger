import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import './css/login.css'
import './css/sidebar.css'
import './css/dashboard.css'
import './css/add.css'
import './css/stockpage.css'
import './css/setting.css'
import './css/newsection.css'
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { AnimateSharedLayout } from "framer-motion"
import Store from './Store'
import { proxy, useSnapshot } from 'valtio'
import StatusBar from './components/StatusBar';
import { AnimatePresence } from 'framer-motion';
import LineChart from './components/LineChart';
import burger from './pictures/burger.png'
import News from './components/News';
const state = proxy({ count: 'TSLA', username: '' })


function Login() {
  let navigate = useNavigate();
  function trytolog() {
    const users = document.getElementById('username').value
    const pass = document.getElementById('password').value
    axios.post('https://glacial-fortress-97136.herokuapp.com/users/searchUsername/', {
      user: users,
      password: pass
    }).then((results) => {
      console.log(results.data)
      localStorage.setItem("userid", results.data._id);
      navigate('/');
    })
  }
  useEffect(() => {
    if ((localStorage.getItem('userid')) === null || (localStorage.getItem('userid')) === undefined) {
      console.log('loginJit')
    } else {
      navigate('/')
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <motion.div transition={{ delay: 0.3, duration: 1 }} animate={{ opacity: 1 }} className='loginCon'>
      <div className='loginInputCont'>
        <label className='input'> Username
          <br></br>
          <input autoComplete="off" type='text' id='username'></input>
        </label>
        <label className='input'> Password
          <br></br>
          <input autoComplete="off" type='password' id='password'></input>
        </label>
        <button onClick={() => trytolog()} id='submitLoginInfo'>Submit</button>
      </div>
    </motion.div>
  )
}


function Card(props) {
  let navigate = useNavigate()
  const name = props.name
  const [info, newInfo] = useState(
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 173.07000000,
      changesPercentage: 0.51106620,
      change: 0.88000490,
      dayLow: 171.09000000,
      dayHigh: 173.78000000,
      yearHigh: 182.94000000,
      yearLow: 116.21000000,
      marketCap: 2826994712576.00000000,
      priceAvg50: 167.11840000,
      priceAvg200: 146.62670000,
      volume: 80440790,
      avgVolume: 91634876,
      exchange: "NASDAQ",
      open: 171.34000000,
      previousClose: 172.19000000,
      eps: 5.61000000,
      pe: 30.85026700,
      earningsAnnouncement: "2022-01-27T21:00:00.000+0000",
      sharesOutstanding: 16334400604,
      timestamp: 1642445629
    }
  )
  useEffect(() => {
    axios.get('https://financialmodelingprep.com/api/v3/quote/' + name + '?apikey=9cbd888276f170c52ac74137377dd93f').then(function (results) {
      console.log(results.data[0])
      newInfo(results.data[0])
    })
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  function handleClick() {
    console.log('updated')
    state.count = name
    navigate('/stock')
  };

  function convert(time) {
    let unix_timestamp = time
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
  }

  function returnColor(x) {
    if (x < 0) {
      return ('#FF0000')
    } else {
      return ('#00FF00')
    }
  }

  return (
    <motion.div animate={{ opacity: 1 }} whileHover={{ scale: 1.03, boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' }} onClick={() => handleClick()} className='Card'>
      <motion.h1 style={{ fontSize: '40px' }}>{name}</motion.h1>
      <motion.h1 style={{ fontSize: '60px' }}>{info.price}</motion.h1>
      <motion.h1 animate={{ color: returnColor(info.changesPercentage) }} style={{ fontSize: '30px' }}>{(info.changesPercentage).toFixed(2)}%</motion.h1>
      <motion.h1 style={{ fontSize: '20px' }}>Time : {convert(info.timestamp)}</motion.h1>
      <motion.div className='CardLowandHigh'>
        <motion.h1 style={{ fontSize: '20px' }}>High : {(info.dayHigh).toFixed(2)}</motion.h1>
        <motion.h1 style={{ fontSize: '20px' }}>Low : {(info.dayLow).toFixed(2)}</motion.h1>
      </motion.div>
      <LineChart color={returnColor(info.changesPercentage)} type={'preview'} change={info.changesPercentage} stock={name} />
    </motion.div>
  )
}


function Dashboard() {
  const snap = useSnapshot(state)
  const [name, newName] = useState([])
  useEffect(() => {
    axios.post('https://glacial-fortress-97136.herokuapp.com/users/UsernameList', {
      id: localStorage.getItem('userid')
    }).then(function (res) {
      newName(res.data.list)
      state.username = res.data.name
    })
  }, []);
  return (
    <motion.div className='dashBoard'>
      <motion.div animate={{ opacity: 1 }} className='dashboardWelcome'>
        <motion.h1 id='welcomeText' animate={{ fontSize: '80px' }}>Hello {snap.username}</motion.h1>
      </motion.div>
      <motion.div className='stocksMap'>
        {name.map((nice, index) => (
          <Card key={index} name={nice} />
        ))}
      </motion.div>
    </motion.div>
  )
}

function AddStock() {
  const [searchresults, newSearchResults] = useState([
    {
      symbol: "NFLX",
      name: "Netflix, Inc.",
      currency: "USD",
      stockExchange: "Nasdaq Global Select",
      exchangeShortName: "NASDAQ"
    }
  ])

  function getResults() {
    newSearchResults([
      {
        symbol: "NFLX",
        name: "Netflix, Inc.",
        currency: "USD",
        stockExchange: "Nasdaq Global Select",
        exchangeShortName: "NASDAQ"
      }
    ])
    const searchid = document.getElementById('searchSymboleInput').value
    if (searchid.length >= 3) {
      axios.get('https://financialmodelingprep.com/api/v3/search?query=' + searchid + '&limit=10&apikey=9cbd888276f170c52ac74137377dd93f').then(function (response) {
        console.log(response.data);
        newSearchResults(response.data)
      }).catch(function (error) {
        console.error(error);
      });
    }
  }
  return (
    <motion.div className='AddSectionOuterCont'>
      <div className='contcont'>
        <motion.div className='AddSection'>
          <motion.div className='addSectionCont'>
            <motion.h1 animate={{ fontSize: '30px', margin: '0' }}>Add</motion.h1>
            <div className='contcontcont'>
              <motion.input autoComplete="off" id='searchSymboleInput' animate={{ width: '90%' }}></motion.input>
              <motion.button onClick={() => getResults()} whileTap={{ scale: 1.2 }} whileHover={{ scale: 1.2 }} id='searchButton' animate={{ width: '50px', height: '30px' }}></motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <AnimateSharedLayout type="switch">
        <AddStokcResults layout data={searchresults} vis={true} />
      </AnimateSharedLayout>
    </motion.div>
  )
}

function AddStokcResults(props) {
  const list = props.data
  if (props.vis === true) {
    return (
      <AnimateSharedLayout type="switch">
        <motion.div layout className='searchResultsContainer'>
          {list.map((nice, index) => (
            <Resultscard type={nice.exchangeShortName} symbol={nice.symbol} name={nice.name} key={index} />
          ))}
        </motion.div>
      </AnimateSharedLayout>
    )
  } else {
    return (
      <h1>Bye</h1>
    )
  }
}

function Resultscard(props) {
  let navigate = useNavigate();
  const [stockprice, newprice] = useState(0)
  function movetopage() {
    state.count = props.symbol
    navigate('/stock')
  }

  useEffect(() => {
    axios.get('https://financialmodelingprep.com/api/v3/quote-short/' + props.symbol + '?apikey=9cbd888276f170c52ac74137377dd93f').then(function (results) {
      newprice(results.data[0].price)
    })
  });

  return (
    <motion.div animate={{ opacity: 1 }} whileHover={{ scale: 1.09, boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' }} onClick={() => { movetopage() }} layout className='resultsCard'>
      <motion.h1 style={{ fontSize: '20px' }} >{props.name}</motion.h1>
      <motion.h1 style={{ fontSize: '20px' }}>{props.symbol}</motion.h1>
      <motion.div className='TypeStock'>
        <motion.h1>{props.type}</motion.h1>
        <motion.h1>{stockprice}</motion.h1>
      </motion.div>
    </motion.div>
  )
}

function StockPage() {
  let navigate = useNavigate()
  const snap = useSnapshot(state)
  const [basic, newbasic] = useState({
  })
  const [vis, newvis] = useState(false)
  useEffect(() => {
    axios.get('https://financialmodelingprep.com/api/v3/profile/' + snap.count + '?apikey=9cbd888276f170c52ac74137377dd93f').then(function (results) {
      console.log(results.data[0])
      newbasic(results.data[0])
      if (results.data[0] === undefined) {
        newvis(false)
      } else {
        newvis(true)
      }
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (vis === true) {
    return (
      <motion.div animate={{ opacity: 1 }} className='stockPage'>
        <motion.div className='basicinfo'>
          <motion.div id='addButton'><StatusBar stock={snap.count} /></motion.div>
          <img alt='nice' width={'50px'} src={basic.image}></img>
          <motion.h1 animate={{ fontSize: '50px' }}>{basic.companyName}</motion.h1>
          <motion.div className='basicinfoContinuted'>
            <motion.h2 animate={{ fontSize: '20px' }}>{basic.symbol}</motion.h2>
            <motion.h2 animate={{ fontSize: '20px' }}>{basic.ceo}</motion.h2>
            <motion.h2 animate={{ fontSize: '20px' }}>{basic.industry}</motion.h2>
            <motion.p id='pTagforbasic' style={{ fontSize: '20px' }} animate={{ opacity: 1, marginTop: '15px' }}>
              {'\t'}{basic.description}
            </motion.p>
          </motion.div>
        </motion.div>
        <LineChart color={'#00FF00'} stock={snap.count} />
      </motion.div>
    )
  }
  else {
    return (
      <motion.div transition={{ delay: 0.4 }} className='returnfalseStockpage' animate={{ opacity: 1 }}>
        <h1>Sorry We dont support this stock as of right now</h1>
        <motion.button onClick={() => navigate('/search')} animate={{ width: '150px', height: '40px', margin: 'auto' }}>Back</motion.button>
      </motion.div>
    )
  }

}

function Setting() {

  let navigate = useNavigate()

  const [testsettings, newtest] = useState({

    _id: "61e3c542229299f9ff03776c",
    name: "test-users",
    password: "test-passwords",
    list: [
      "GOOG",
      "TSLA"
    ],
    createdAt: "2022-01-16T07:12:02.530Z",
    updatedAt: "2022-01-17T15:22:04.361Z",
    __v: 0
  })

  useEffect(() => {
    axios.post('https://glacial-fortress-97136.herokuapp.com/users/UsernameList', {
      id: localStorage.getItem('userid')
    }).then(function (res) {
      console.log(res.data)
      newtest(res.data)
    })
  }, []);



  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  }

  function logOut() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <motion.div initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants} className='settingCard'>
      <motion.div className='settingSection'>
        <motion.h1 animate={{ opacity: 1 }}>Username</motion.h1>
        <motion.h1 animate={{ opacity: 1 }}>{testsettings.name}</motion.h1>
      </motion.div>
      <motion.div className='settingSection'>
        <motion.h1 animate={{ opacity: 1 }}>Password</motion.h1>
        <motion.h1 animate={{ opacity: 1 }}>{testsettings.password}</motion.h1>
      </motion.div>
      <motion.div className='settingSection'>
        <motion.h1 animate={{ opacity: 1 }}>Customer ID</motion.h1>
        <motion.h1 animate={{ opacity: 1 }}>{testsettings._id}</motion.h1>
      </motion.div>
      <motion.div className='settingSection'>
        <motion.button onClick={() => logOut()}>Log Out</motion.button>
      </motion.div>
    </motion.div>
  )
}


function App() {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)
  const sidebarAnimation = {
    closed: {
      opacity: 0, x: '-100%', transition: {
        duration: 0.3
      }
    },
    open: {
      x: '-0',
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }
  const sidebarButtonAnimation = {
    closed: { rotate: 0 },
    open: {
      scale: 0.7,
      rotate: 90,
      left: 0,
      top: 0,
      transition: {
        duration: 0.3
      }
    }
  }
  useEffect(() => {
    if ((localStorage.getItem('userid')) === null || (localStorage.getItem('userid')) === undefined) {
      navigate('/login')
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="App">
      <Store>
        <motion.button className='MenuButton' variants={sidebarButtonAnimation} animate={isOpen ? "open" : "closed"} initial="visible" onClick={() => setIsOpen(isOpen => !isOpen)}><img id='menuIcon' alt='Search' src={burger}></img></motion.button>
        <motion.div variants={sidebarAnimation} animate={isOpen ? "open" : "closed"} className='sidebar'>
          <motion.h1 id='menubartitleText'>Bek Tracker</motion.h1>
          <motion.div className='sidebarContent'>
            <motion.p onClick={() => setIsOpen(isOpen => !isOpen)} whileHover={{ x: '30px' }}>
              <Link to="search">Search</Link>
            </motion.p>
            <motion.p onClick={() => setIsOpen(isOpen => !isOpen)} whileHover={{ x: '30px' }}>
              <Link to="">Dashboard</Link>
            </motion.p>
            <motion.p onClick={() => setIsOpen(isOpen => !isOpen)} whileHover={{ x: '30px' }}>
              <Link to="News">News</Link>
            </motion.p>
            <motion.p onClick={() => setIsOpen(isOpen => !isOpen)} whileHover={{ x: '30px' }}>
              <Link to="setting">Settings</Link>
            </motion.p>
          </motion.div>
        </motion.div>
        <AnimatePresence>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<AddStock />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/News" element={<News />} />
          </Routes>
        </AnimatePresence>
      </Store>
    </div>
  );
}

export default App;
