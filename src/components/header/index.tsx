import Lupa from '../img/Lupa.png'
import React from 'react'
import styled from 'styled-components'

interface Props {
    setSearch:(search:string)=>void
}

export default function Header({setSearch}:Props) {
  return (
    <StyledHeader>
        <div className='search'>
            <input onChange={(e)=>setSearch(e.target.value)} type='text' id='search' placeholder='Search'/>
            <label htmlFor='search' className='lupa'>
                <img src={Lupa}/>
            </label>
        </div>
    </StyledHeader>
  )
}


const StyledHeader = styled.div`
    height:10%;
    display:flex;
    align-items:center;
    margin:auto;
    max-width:90%;
    .search{
        display:flex;
        align-items: center;
    }
    #search{
        height:40px;
        width:450px;
        outline:none;
        border:none;
        border-radius:25px 0 0 25px;
        padding-left:15px;
        font-size:.9rem;
    }
    .lupa img{
        height:20px
    }
    .lupa{
        background-color:#6B6B6B;
        height:40px;
        width:40px;
        border-radius:0 25px 25px 0;
        display:flex;
        justify-content: center;
        align-items: center;
    }
`