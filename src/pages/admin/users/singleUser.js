import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { doApiMethod } from '../../../services/service';
const SingleUser = (props) => {
  const user = props.item;

  const unixToAge = (birthday) => {
    let age = (Date.now() - birthday) / (1000 * 60 * 60 * 24 * 365)
    return Math.floor(age);
  }
  const changeRole = async (_id) => {
    const url = "/users/changeRole/" + _id;
    let { data } = await doApiMethod(url, "PATCH");
    console.log(data)
  }
  const changeActive = async (_id) => {
    const url = "/users/changeActive/" + _id;
    let { data } = await doApiMethod(url, "PATCH");
    console.log(data)
  }
  const deleteUser = async (_id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      const url = "/users/" + _id;
      let { data } = await doApiMethod(url, "DELETE")
      console.log(data)
    }
  }
  return (
    <tr>
      <td>
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8">
            <img className="w-full h-full rounded-full"
              src={user?.profile_img}
              alt="profile" />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {user?.fullName?.firstName} {user?.fullName?.lastName}
            </p>
          </div>
        </div>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">{user?.country}</p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">{user?.city}</p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">{() => unixToAge(Math.floor(new Date(user?.birthdate).getTime()))}</p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">{user?.phone}</p>
      </td>
      <td>
        <p className="text-gray-900 whitespace-no-wrap">
          {user?.craetedAt?.split("T")[0]}
        </p>
      </td>
      <td>
        <span onClick={() => {
          changeActive(user?._id)
          props.setIsChange(true)
          }} className="btn relative inline-block px-3 py-1 font-semibold leading-tight cursor-pointer">
          <span aria-hidden
            className={user?.active ? "absolute inset-0 bg-green-200 opacity-50 rounded-full" : "absolute inset-0 bg-red-400 opacity-50 rounded-full"}></span>
          <span className="relative">{String(user?.active)}</span>
        </span>
      </td>
      <td onClick={() => 
        {changeRole(user?._id)
          props.setIsChange(true)
        }}>
        <span className="btn relative inline-block px-3 py-1 font-semibold leading-tight cursor-pointer">
          <span aria-hidden
            className={user?.role === "admin" ? "absolute inset-0 bg-black opacity-50 rounded-full" : "absolute inset-0 bg-gray-200 opacity-50 rounded-full"}></span>
          <span className="relative">{String(user?.role)}</span>
        </span>
      </td>

      <td>
        <span onClick={() => 
          {deleteUser(user._id, user.fullName.firstName)
            props.setIsChange(true)
          }} 
          className="btn relative cursor-pointer inline-block px-2 py-2 font-semibold leading-tight hover:text-red-900">
          <span aria-hidden
            className={"absolute inset-0 bg-red-200 opacity-50 rounded-full"}></span>
          <span className="relative"><BsTrash /></span>
        </span>
      </td>
    </tr>
  )
}

export default SingleUser