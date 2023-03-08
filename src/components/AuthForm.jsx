import { useState } from 'react';

const API_URL = 'http://localhost:8008';

function loginUser(callback, data) {
  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    })
  })
  .then(res => res.json())
  .then(user => {
    let session = user.id;
    callback(session)
  })
}

function AuthForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    loginUser((token) => {
      console.log({ token })
      props.onSubmit(token)
    }, { email, password })
  }

  return (
    <div className="container-fluid mt-5">
      <div className="container login">
        <section className="card mb-5">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input 
                  name="email" 
                  type="email" 
                  className="form-control" 
                  id="exampleInputEmail1" 
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input  
                  name="password" 
                  type="password" 
                  className="form-control" 
                  id="exampleInputPassword1" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}  
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>    
          </div>
        </section>
      </div>
    </div>
  )
}

export default AuthForm;