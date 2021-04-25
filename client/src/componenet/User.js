import React, { useState } from "react";
import api from "../API/api";

const User = () => {
	const [name, setName] = useState("");
	const [mobile, setMobile] = useState("");
	const [email, setEmail] = useState("");
	const clickHandle = async () => {
		try {
			await api.post("/user", {
				name: name,
				mobile: mobile,
				email: email,
			});
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
			<h1>Create Account</h1>
			<div>
				<label htmlFor="name">Name: </label>
				<input
					onChange={(e) => setName(e.target.value)}
					type="text"
					id="name"
				/>
			</div>
			<div>
				<label type="text" id="mobile" htmlFor="mobile">
					Phone:
				</label>
				<input
					type="text"
					id="mobile"
					onChange={(e) => setMobile(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="Email">Email: </label>
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					id="Email"
				/>
			</div>
			<button onClick={clickHandle}>Submit</button>
		</>
	);
};

export default User;
