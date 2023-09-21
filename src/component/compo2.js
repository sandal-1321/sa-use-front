import React, { useState, useEffect } from 'react';
import '../static/compo2.css'
import logo from '../img/logo.jpg'
import imges from '../img/userid.png'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link } from "react-router-dom";
import country from './country.json';
import axios from 'axios';


function Compo2() {

    const [valid, setValid] = useState(true);
    const [countries, setCountries] = useState(country);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');




    useEffect(() => {
        let finds = countries.forEach((coun) => {
            if (coun.country_name == selectedCountry) {
                setStates(coun.states)
            }
        })


    })






    // server state
    const [mobile, setMobile] = useState('')
    const [input, setInput] = useState({
        fname: '',
        lname: '',
        email: '',
        addres: '',
        add: '',
        country: '',
        state: '',
        pincode: '',
    });


    // validation

    const [validat, setValidat] = useState("")
    const [lvalidat, setLvalidat] = useState("")
    const [evalidat, setEvalidat] = useState("")
    const [avalidat, setAvalidat] = useState("")
    const [cvalidat, setCvalidat] = useState("")
    const [svalidat, setSvalidat] = useState("")
    const [zvalidat, setZvalidat] = useState("")

    const validateSelection = () => {
        let { country, state } = input;
        if (country === 'Select a country') {
            setCvalidat('Select a Country');
        } else {
            setCvalidat('');
        }
        if (state === 'Select a state') {
            setSvalidat('Select a State');
        } else {
            setSvalidat('');
        }
    };

    const validation = () => {
        let { fname, lname, email, addres, add2, pincode } = input;
        if (fname.length == 0) {
            setValidat('')
        } else if (fname.length <= 4) {
            setValidat("Minimum 5 Characters")
            console.log("4 characters")
        }
        else (
            setValidat('')
        )
        if (lname.length == 0) {
            setLvalidat('')
        } else if (lname.length <= 4) {
            setLvalidat("Minimum 5 Characters")
            console.log("4 characters")
        }
        else (
            setLvalidat('')
        )
        let ePtn = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (email.length == 0) {
            setEvalidat('')
        }
        else if (email.match(ePtn)) {
            setEvalidat("")
        }
        else {
            setEvalidat("Your Id Need To One @ And .")

        }
        if (addres.length == 0) {
            setAvalidat('')
        }
        else if (addres.length <= 2) {
            setAvalidat("Invalid Address")
        }
        else {
            setAvalidat("")
        }
        const pcpat = /^[1-9][0-9]{5}$/;
        if (pincode.length == 0) {
            setZvalidat('')
        }
        else if (pincode.match(pcpat)) {
            setZvalidat("")
        }
        else {
            setZvalidat("Invalid PinCode")

        }

    }

    const handleSubmit = (event) => {

        event.preventDefault();
        let { fname, lname, email, addres, add2, country, state, pincode } = input;
        let full = fname.concat(" " + lname);
        if (fname.length == 0) {
            event.preventDefault();
            setValidat("Fill The First Name Field")
        }
        if (lname.length == 0) {
            event.preventDefault();
            setLvalidat("Fill The Last Name Field")
        }
        if (email.length == 0) {
            event.preventDefault();
            setEvalidat("Fill The Email Field")
        }
        if (addres.length == 0) {
            event.preventDefault();
            setAvalidat("Fill The Address Field")
        }
        if (pincode.length == 0) {
            event.preventDefault();
            setZvalidat("Fill The PinCode Field")
        }
        if (fname.length !== 0 && lname.length !== 0 && email.length !== 0 && addres.length !== 0 && pincode.length !== 0) {
            event.preventDefault();
            axios.post('https://sa-client.onrender.com/creatuser', { fname: full, email: email, mobile: mobile, address: addres, address2: add2, country: country, state: state, pincode: pincode })
            clearInputFields();
            alert("Submited");
        }
    };




    const clearInputFields = () => {
        setMobile('');
        setInput({
            fname: '',
            lname: '',
            email: '',
            addres: '',
            add2: '',
            country: '',
            state: '',
            pincode: ''
        });
    };




    const capature = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
        setSelectedCountry(event.target.value)
    }



    const capatur = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
        setSelectedCountry(event.target.value)
    }



    return (
        <div className='main'>
            <div className='sect2-nav'>
                <div className='nav-1'>
                    <img src={logo}></img>
                    <h1>Novelti</h1>
                </div>
                <div className='nav-2'>
                    <Link to={'/'}><i class="fa-solid fa-backward"></i></Link >
                </div>

            </div>

            <section2>
                <div className='sect2'>
                    <div className='sect2-1'>
                        <div className='sect2-2'>
                            <h2>Web Creation</h2>
                            <img src={imges}></img>
                        </div>
                        <div className='sect2-3'>
                            <div className='sect2-3-1'>
                                <h2>Create User Id</h2>
                            </div>
                            <div className='sect2-3-2'>
                                <form>
                                    <div className='sect2-3-2-1'>
                                        <div className='sect2-3-2-2'>
                                            <label for='fname'> First Name </label>
                                            <input type='text' name='fname' value={input.fname} onKeyUp={validation} id='finame' onChange={capature} placeholder='Enter First Name'></input>
                                            <span id='ferr'>{validat}</span>
                                        </div>
                                        <div className='sect2-3-2-2'>
                                            <label for='lname'> Last Name </label>
                                            <input type='text' name='lname' value={input.lname} id='laname' onKeyUp={validation} onChange={capature} placeholder='Enter Last Name'></input>
                                            <span id='lerr'>{lvalidat}</span>
                                        </div>
                                    </div>
                                    <div className='sect2-3-2-1'>
                                        <div className='sect2-3-2-2'>
                                            <label for='email'> Email </label>
                                            <input type='email' value={input.email} name='email' id='mail' onKeyUp={validation} onChange={capature} placeholder='Enter Email'></input>
                                            <span id='eerr'>{evalidat}</span>
                                        </div>
                                        <div className='sect2-3-2-2 '>
                                            <label for='mobile' className='mobilab'> Mobile Number </label>
                                            <div>
                                                <PhoneInput
                                                    name='mobile'
                                                    className="phone"
                                                    value={mobile}
                                                    country={'in'}
                                                    onChange={(value) => { setMobile(value) }}
                                                    countryCodeEditable={false}
                                                />
                                            </div>
                                            {!valid && (
                                                <span id='merr'>Please enter valid number.</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='sect2-3-2-1'>
                                        <div className='sect2-3-2-2'>
                                            <label for='addres'> Address 1 </label>
                                            <input type='text' value={input.addres} onKeyUp={validation} name='addres' id='addres' onChange={capature} placeholder='Enter Addres'></input>
                                            <span id='aerr'>{avalidat}</span>
                                        </div>
                                        <div className='sect2-3-2-2'>
                                            <label for='add2'> Address 2 </label>
                                            <input type='text' value={input.add2} name='add2' id='add2' onChange={capature} placeholder='Enter Addres'></input>
                                            <span id='aderr'></span>
                                        </div>
                                    </div>
                                    <div className='sect2-3-2-1 csz'>
                                        <div className='sect2-3-2-2'>

                                            <select value={input.country}
                                                name='country' className='coun'
                                                onChange={capatur} onBlur={validateSelection} >

                                                <option>Select a country</option>
                                                {countries.map(count => (
                                                    <option value={count.country_name}>{count.country_name}</option>
                                                ))}
                                            </select>
                                            <span id='cerr'>{cvalidat}</span>
                                        </div>
                                        <div className='sect2-3-2-2'>

                                            <select value={input.state}
                                                onChange={capature} onBlur={validateSelection}
                                                name='state' className='sta'>
                                                <option >Select a state</option>
                                                {states.map((st) => (
                                                    <option value={st.state_name}>{st.state_name}</option>
                                                ))}
                                            </select>

                                            <span id='serr'>{svalidat}</span>
                                        </div>
                                        <div className='pin'>
                                            <input type='tel' value={input.pincode} onKeyUp={validation} onChange={capature} maxlength={6} name='pincode' id='zip' placeholder='Enter Zip Code'></input>
                                            <span id='zerr'>{zvalidat}</span>
                                        </div>
                                    </div>
                                    <div className='btn'>
                                        <button className='butt' onClick={handleSubmit}>Submit</button>

                                    </div>
                                </form>
                            </div>
                            <div className='sect2-3-3'></div>
                        </div>
                    </div>
                </div >
            </section2 >
        </div >
    );
}

export default Compo2;