import React, { useState } from 'react'

export default function Login() {

  const [name, setName] = useState()
  const [password, setPassword] = useState()

  const submitForm = (e) => {
    console.log("Submit")
    console.log("UserName", name)
    console.log("Password", password)
    fetch("http://localhost:8000/api/login", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer J0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKZWFuZHLDqSBEZSBWaWxsaWVycyIsImlkIjoiMTkwMDI1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.zGMcJJfbk9zoLrHs6PprMOIYbzHufrQ-MFhGPl83n3Y'
      },
    })
      .then(response => response.json())
      .then(data => console.log(data))

  }
  const onNameChange = (e) => {
    console.log(e.target.value)
    setName(e.target.value)
  }
  const onPasswordChange = (e) => {
    console.log(e.target.value)
    setPassword(e.target.value)
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>username:</label><br />
        <input
          type="text"
          name="username"
          value={name}
          onChange={e => onNameChange(e)} /><br />
        <label>Password:</label><br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onPasswordChange(e)} />
      </form>
      <button onClick={() => submitForm()}>Submit</button>
    </div>
  )
}
