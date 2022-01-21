import React, { Component } from 'react';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RegisterName: '',
            RegisterEmail: '',
            RegisterPassword: ''
        }
    }

    onNameChange=(event)=>{
        this.setState({RegisterName:event.target.value})
    }

    onEmailChange=(event)=>{
        this.setState({RegisterEmail:event.target.value})
    }

    onPasswordChange=(event)=>{
        this.setState({RegisterPassword:event.target.value})
    }

    onSubmitRegister=(event)=>{
        fetch('https://murmuring-savannah-20477.herokuapp.com/register', {
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                name:this.state.RegisterName,
                email:this.state.RegisterEmail,
                password:this.state.RegisterPassword,
            })
        })
        .then(res=>res.json())
        .then(user =>{
            if(user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render(){
        const {onSubmitRegister, onPasswordChange, onEmailChange, onNameChange} = this;
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                            onChange={onNameChange}
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                        </div>
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
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input
                            onClick={onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"
                        />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;