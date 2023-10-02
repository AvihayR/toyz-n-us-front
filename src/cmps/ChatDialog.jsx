import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG, socketService } from '../services/socket.service';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

export function ChatDialog({ toyId }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [open, setOpen] = useState(false)
    const [msgToBuild, editMsgToBuild] = useState({ by: loggedInUser?.fullname || 'Guest' })
    const [msgs, addMsgs] = useState([])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId)
        // socketService.emit(SOCKET_EMIT_SEND_MSG, {'hello'})

        socketService.on(SOCKET_EVENT_ADD_MSG, msg => {
            addMsgs(prevMsgs => [...prevMsgs, msg])
        })
    }, [])

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        editMsgToBuild(prevMsg => ({ ...prevMsg, [field]: value }))
    }

    function onSendMsg(ev) {
        ev.preventDefault()
        socketService.emit(SOCKET_EMIT_SEND_MSG, msgToBuild)
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Start chatting about this toy!
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>Chat</DialogTitle>
                <DialogContent sx={{ height: '50vh', width: '50vw' }}>

                    <form className='chat-form' onSubmit={onSendMsg} sx={{ textAlign: 'center' }}>
                        <ul>
                            {msgs && msgs.map(msg => {
                                return (
                                    <li key={msg.txt + new Date().getTime()}>
                                        <p><span>{msg.by}:</span> {msg.txt} </p>
                                    </li>
                                )
                            })}
                        </ul>
                        <input name='txt' onChange={handleChange} type="text" />
                        <button>Send</button>
                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Back</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


// import React, { useState, useEffect, useRef } from 'react'
// import { useSelector } from 'react-redux'

// import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

// export function ChatDialog() {
//     const [msg, setMsg] = useState({ txt: '' })
//     const [msgs, setMsgs] = useState([])
//     const [topic, setTopic] = useState('Love')
//     const [isBotMode, setIsBotMode] = useState(false)

//     const loggedInUser = useSelector(storeState => storeState.userModule.user)

//     const botTimeoutRef = useRef()

//     useEffect(() => {
//         socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
//         return () => {
//             socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
//             botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
//         }
//     }, [])

//     useEffect(() => {
//         socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
//     }, [topic])

//     function addMsg(newMsg) {
//         setMsgs(prevMsgs => [...prevMsgs, newMsg])
//     }

//     function sendBotResponse() {
//         // Handle case: send single bot response (debounce).
//         botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
//         botTimeoutRef.current = setTimeout(() => {
//             setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
//         }, 1250)
//     }

//     function sendMsg(ev) {
//         ev.preventDefault()
//         const from = loggedInUser?.fullname || 'Me'
//         const newMsg = { from, txt: msg.txt }
//         socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
//         if (isBotMode) sendBotResponse()
//         // for now - we add the msg ourself
//         // addMsg(newMsg)
//         setMsg({ txt: '' })
//     }

//     function handleFormChange(ev) {
//         const { name, value } = ev.target
//         setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
//     }

//     return (
//         <section className="chat">
//             <h2>Lets Chat about {topic}</h2>

//             <label>
//                 <input type="checkbox" name="isBotMode" checked={isBotMode}
//                     onChange={({ target }) => setIsBotMode(target.checked)} />
//                 Bot Mode
//             </label>

//             <div>
//                 <label>
//                     <input type="radio" name="topic" value="Love"
//                         checked={topic === 'Love'} onChange={({ target }) => setTopic(target.value)} />
//                     Love
//                 </label>

//                 <label>
//                     <input
//                         type="radio" name="topic" value="Politics"
//                         checked={topic === 'Politics'} onChange={({ target }) => setTopic(target.value)} />
//                     Politics
//                 </label>

//             </div>

//             <form onSubmit={sendMsg}>
//                 <input
//                     type="text" value={msg.txt} onChange={handleFormChange}
//                     name="txt" autoComplete="off" />
//                 <button>Send</button>
//             </form>

//             <ul>
//                 {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
//             </ul>
//         </section>
//     )
// }