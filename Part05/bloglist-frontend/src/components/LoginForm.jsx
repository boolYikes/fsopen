const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
    return (
        <>
            <h2>You shall not pass!</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </>
    )
}
export default LoginForm