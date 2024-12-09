import React from 'react'

const List = (props) => {



    return (

        <>

            <li className='userBox'>
                <span>

                <p style={{
                    fontWeight: '600',
                    fontSize: '21px'
                }}>{props.name}</p>
                <p className='username'>{props.userName}</p>
                </span>
                <button>Add</button>

            </li>
        </>


    )
}

export default List
