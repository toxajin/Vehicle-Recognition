import React, {Component} from 'react';
class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            SignInEmail: '',
            SignInPassword: '',
            WrognEmailPassword: ''
        }
    }

    onEmailChange=(event)=>{
        this.setState({SignInEmail:event.target.value})
        this.setState({WrognEmailPassword: ''})
    }

    onPasswordChange=(event)=>{
        this.setState({SignInPassword:event.target.value})
        this.setState({WrognEmailPassword: ''})
    }

    onSubmitSignin=(event)=>{
        if(event.keyCode === 13 || event.type === 'click')
        {
            fetch('https://murmuring-savannah-20477.herokuapp.com/signin', {
                method:'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    email:this.state.SignInEmail,
                    password:this.state.SignInPassword
                })
            })
            .then(res=>res.json())
            .then(user =>{
                if(user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    this.setState({WrognEmailPassword: 'Wrong'})
                }
            })
        }
    }

    render() {
        const {onRouteChange}=this.props;
        const {onSubmitSignin, onPasswordChange, onEmailChange} = this;
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            onChange={onEmailChange}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            onChange={onPasswordChange}
                            onKeyDown={onSubmitSignin}
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input
                            onClick={onSubmitSignin}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                        />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={()=>onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                        {this.state.WrognEmailPassword === 'Wrong' ? 
                            <p className="f6 link dim red db">Wrong email or password</p>
                        :<p></p>}
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;