import React, { useState, useEffect } from 'react';
import '../static/compo3.css';
import logo from '../img/logo.jpg'
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";
import axios from 'axios';
import incom from '../img/incom.png';


// material ul
import Button from '@mui/material/Button';
import { styled, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, DialogContentText, } from '@mui/material';






function Compo3() {

    // matrial ui

    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    const handleOpenDialog = (selectedUserData) => {
        setSelectedUser(selectedUserData);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIstext(false)
    };

    useEffect(() => {
        viow()
    })

    // server side

    const [alluser, setalluser] = useState([]);
    const [text, setText] = useState()
    const [istext, setIstext] = useState(false)


    // storing value


    const [fedit, setFedit] = useState("")
    const [eedit, setEedit] = useState("")
    const [aedit, setAedit] = useState("")
    const [aaedit, setAaedit] = useState("")
    const [medit, setMedit] = useState("")
    const [cedit, setCedit] = useState("")
    const [sedit, setSedit] = useState("")
    const [zedit, setZedit] = useState("")

    let viow = async () => {
        let find = await axios.get('https://sa-client.onrender.com/view');
        setalluser(find.data);
    }
    let handleDelete = async (id) => {
        await axios.delete('https://sa-client.onrender.com/duser/' + id)
            .then(res => console.log(res))
            .catch(err => console.log("err"))
        viow()
    }

    let edit = async (id) => {
        await axios.get('https://sa-client.onrender.com/getid/' + id)
            .then(rest => {
                const { fname, email, mobile, address, address2, country, state, pincode } = rest.data
                setFedit(fname)
                setMedit(mobile)
                setEedit(email)
                setAedit(address)
                setAaedit(address2)
                setCedit(country)
                setSedit(state)
                setZedit(pincode)
                setIstext(true)
            })
            .catch(err => console.log(err))
    }

    let update = async (id) => {
        await axios.put('https://sa-client.onrender.com/updateuser/' + id, { fname: fedit, email: eedit, mobile: medit, address: aedit, address2: aaedit, country: cedit, state: sedit, pincode: zedit })
            .then(res => console.log(res))
            .catch(err => console.log("err"))
        viow()
        setOpen(false)
        setIstext(false)
    }

    return (
        <div className="sec5">
            <div className='sect2-nav'>
                <div className='nav-1 com3-nav'>
                    <img src={logo}></img>
                    <h1>Novelti</h1>
                </div>
                <div className='nav-2'>
                    <Link to={'/'}><i class="fa-solid fa-backward"></i></Link >
                </div>
            </div>
            <div className="sec5-1">
                <div className="sec5-2">
                    <div className="sec5-3"><h2>User Create List</h2></div>
                    <div className="sec5-4">
                        {alluser.length != 0 ?
                            (<ul className='ul'>
                                {alluser && alluser.map((pep, index) => (
                                    <li className='list'>
                                        <div className="sec5-4-1">
                                            <i class="fa-solid fa-user-secret"></i>
                                            <div className="sec5-4-1-1">
                                                <div className="sec5-4-1-2"><label>Name : </label>  <p> {pep.fname}</p></div>
                                                <div className="sec5-4-1-3"><label>Email : </label>  <p>  {pep.email}</p></div>
                                            </div>
                                        </div>
                                        <div className="sec5-4-2">
                                            <Tooltip title="View User" placement="top" arrow>
                                                <div onClick={() => handleOpenDialog(pep)} className="sec5-4-2-1"><i class="fa-solid fa-eye"></i></div>
                                            </Tooltip>
                                            <Tooltip title="Delete" placement="top" arrow>
                                                <div onClick={() => handleDelete(pep._id)} className="sec5-4-2-2" ><i class="fa-solid fa-trash"></i></div>
                                            </Tooltip>
                                        </div>
                                    </li>
                                ))}

                            </ul>) : <img className='lod' src={incom}></img>}
                        {selectedUser && (
                            <Dialog open={open} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
                                <div className='dia-a'>
                                    <DialogTitle id='dialog-title'><p> User Id <span>: {selectedUser.id}</span> </p></DialogTitle>
                                    <DialogActions>
                                        <Button onClick={handleClose}><i class="fa-regular fa-circle-xmark"></i></Button>
                                    </DialogActions>
                                </div>
                                <DialogContent>
                                    <DialogContentText id='dialog-description' className='dcont'>
                                        <div className='sname'>
                                            {!istext ? <p>Full Name <span>: {selectedUser.fname}</span></p> : <p>Full Name <span>: <input type='text' value={fedit} onChange={(e) => { setFedit(e.target.value) }}></input> </span></p>}
                                        </div>
                                        <div className='smail'>
                                            {!istext ? <p>Email Id <span>: {selectedUser.email} </span></p> : <p>Email Id <span>: <input type='text' value={eedit} onChange={(e) => { setEedit(e.target.value) }}></input> </span></p>}
                                        </div>
                                        <div className='smobi'>
                                            {!istext ? <p>Mobile <span>: {selectedUser.mobile}</span></p> : <p>Mobile <span>: <input type='tel' value={medit} onChange={(e) => { setMedit(e.target.value) }} placeholder='+91'></input> </span></p>}
                                        </div>
                                        <div className='sadd'>
                                            {!istext ? <p>Address <span>: {selectedUser.address}</span></p> : <p>Address <span>: <input type='text' value={aedit} onChange={(e) => { setAedit(e.target.value) }}></input> </span></p>}
                                        </div>
                                        {selectedUser && selectedUser.address2 ? (
                                            <div className='sadd2'>
                                                {!istext ? <p>Address 2<span>: {selectedUser.address2}</span></p> : <p>Address 2 <span>: <input type='text' value={aaedit} onChange={(e) => { setAaedit(e.target.value) }}></input> </span></p>}
                                            </div>
                                        ) : (
                                            <div style={{ display: "none" }} className='sadd2'>
                                                <p>Address2 <span>: {selectedUser ? selectedUser.address2 : ''}</span></p>
                                            </div>
                                        )}

                                        <div className='scou'>
                                            {!istext ? <p>Country <span className='count'>: {selectedUser.country}</span></p> : <p>Country <span className='inco'>: <input type='text' value={cedit} onChange={(e) => { setCedit(e.target.value) }}></input> </span></p>}
                                            {!istext ? <p>State <span className='st'>: {selectedUser.state}</span></p> : <p>State <span className='inst'>: <input type='text' value={sedit} onChange={(e) => { setSedit(e.target.value) }}></input> </span></p>}
                                            {!istext ? <p>Pin Code <span className='pi'>: {selectedUser.pincode}</span></p> : <p>Pin Code <span className='inz'>: <input type='text' value={zedit} minLength={6} onChange={(e) => { setZedit(e.target.value) }}></input> </span></p>}
                                        </div>
                                    </DialogContentText>
                                </DialogContent>
                                <div className='butns-ed'>
                                    <Button onClick={!istext ? () => edit(selectedUser._id) : () => update(selectedUser._id)}>{!istext ? "Edite" : "Update"}</Button>
                                </div>
                            </Dialog>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Compo3;