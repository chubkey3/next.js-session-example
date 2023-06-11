const Signup = () => {

    return (
        <div>
            <h1>
                Sign up
            </h1>
            <form action={'/api/signup'} method="POST">
                <label htmlFor="login_field">Username</label>
                <input type="text" name="username" id="login_field" autoCapitalize="off" autoCorrect="off" autoComplete="username" autoFocus={true}></input>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" autoComplete="current-password"></input>
                <input type="submit" value={'Sign up'}/>
            </form>
        </div>
    )

}

export default Signup