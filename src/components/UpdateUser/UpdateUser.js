import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const [user, setUser] = useState({})
    const {id} = useParams();

    useEffect( () => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setUser(data)
        })
    }, [id])

    // update user
    const handleNameChange = e => {
        const undatedName = e.target.value;
        const updatedUser = {name: undatedName, email: user.email};
        setUser(updatedUser);
    }
    const handleEmailChange = e => {
        const updatedEmail = e.target.value;
        // const updatedUser = {...user};
        // updatedUser.email = updatedEmail;
        const updatedUser = {name: user.name, email: updatedEmail}
        setUser(updatedUser);
    }

    const handleUpdateUser = e => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then( res => res.json())
        .then(data => {
            if(data.modifiedCount>0){
                alert('Updated successfully!')
                setUser({});
            }
        })

        e.preventDefault();
    }

    return (
        <div>
            <h2>Update:  {user.name}  {user.email}</h2>
            <small>{id}</small>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleNameChange} type="text" value={user.name || ''} />
                <input onChange={handleEmailChange} type="email" value={user.email || ''} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;