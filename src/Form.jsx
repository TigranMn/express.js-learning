import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [country, setCountry] = useState('')
	const [age, setAge] = useState('')
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		const newUser = {
			"id": Date.now(),
			"name": name,
			"phone": phone,
			"email": email,
			'country': country,
			'age': age
		}
		e.preventDefault()
		fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser)
		}).then(res => {
			navigate('/')
		})
	}

	return <form onSubmit={(e) => handleSubmit(e)} style={{ width: '50%', gap: '20px', display: 'flex', flexDirection: 'column', margin: 'auto' }}>
		<input onChange={(e) => setName(e.target.value)} value={name} type={'text'} name='name' placeholder="enter your name" />
		<input onChange={(e) => setPhone(e.target.value)} value={phone} type={'text'} name='phone' placeholder="enter your phone" />
		<input onChange={(e) => setEmail(e.target.value)} value={email} type={'email'} name='email' placeholder="enter your email" />
		<input onChange={(e) => setCountry(e.target.value)} value={country} type={'text'} name='country' placeholder="enter your country" />
		<input onChange={(e) => setAge(e.target.value)} value={age} type={'number'} name='age' placeholder="enter your age" />
		<button type="submit">Submit</button>
	</form>;
}
