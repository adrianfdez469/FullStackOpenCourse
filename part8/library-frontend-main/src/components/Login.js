import React, { useRef } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../apollo/mutations'


const Login = ({show, setToken}) => {

  const userRef = useRef()
  const passRef = useRef()

  const [ login ] = useMutation(LOGIN, {
    onError: (error) => {
      alert(error.graphQLErrors[0].message);
    }
  })

  if(!show){
    return null
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if(userRef.current.value !== '' && passRef.current.value !== ''){
      login({variables: {
        username: userRef.current.value,
        password: passRef.current.value
      }})
      .then(({data}) => {
        const token = data.login.value 
        setToken(token)
        localStorage.setItem('library-user-token', token)
      })
    }else{
      alert('Please provide a username and a password!')
    }
  }


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          username
          <input ref={userRef}/>
        </div>
        <div>
          password
          <input ref={passRef}/>
        </div>
        <button>Login</button>
      </form>
    </>
  )

}
export default Login