import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { jwtDecode } from "jwt-decode";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userDetail,setUserDetail] = useState();

  const navigate = useNavigate()

  //create the submit method.
  const submit = async (e) =>{
    e.preventDefault();

    const user = {
      email : username,
      password : password
    };
    // create the POST request
    const {data} = await
    axios.post('http://127.0.0.1:8000/api/token/',
                user)

    // Initialize the access & refresh token in localstorage.
    console.log(user);
    
    console.log(data,"helllo");

    // Decode the token to get user details
    const decodedUser = jwtDecode(data.access);
    setUserDetail(decodedUser);
    console.log(decodedUser, "pppppppppp");
    
    localStorage.clear();
    localStorage.setItem('access_token',data.access);
    localStorage.setItem('refresh_token',data.refresh);
    // setUserDetail(jwtDecode(data.access))
    // console.log(userDetail,"pppppppppp");
    
    axios.defaults.headers.common['Authorization'] = `Beares ${data['access']}`;
    // window.location.href = '/user/userhome'
    navigate('/user/userhome')

    setUsername('')
    setPassword('')

  }
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 h-screen bg-gray-900 w-full text-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
              Sign in to your account
            </h2>
          </div>
          <div className=" dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6 ">
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form action="#" method="POST" onSubmit={submit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={username}
                    onChange={(e)=>
                      setUsername(e.target.value)
                    } 
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e)=>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to='/user/registration'>
              <Link to="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create an account
              </Link>
              </Link>
            </p>
          </div>
          </div>
        </div>
      </>
    )
  }
  