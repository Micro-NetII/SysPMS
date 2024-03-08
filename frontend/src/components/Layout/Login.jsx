import React, { useState } from 'react'; // Import useState from React
import Image from 'next/image';
import '../../app/login/styles.css';


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(`Logged in as ${username}`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Logo container */}
        <div className="logo-container">
        <Image src="/images/teste.png" alt="Logotipo" width={275} height={275} />
        </div>

        <form onSubmit={handleLogin}>
          <label>
            Username:
            <hr />
            <input
              type="text"
              class="input-field"
              placeholder="Insira o seu username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span class="icon"><i class="fa fa-user"></i></span>
          </label>
          <br />
          <label>
            Password:
            <hr />
            <input
              type="password"
              class="input-field"
              placeholder="Insira a sua palavra-passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span class="icon"><i class="fa fa-lock"></i></span>
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
