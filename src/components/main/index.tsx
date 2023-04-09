import React, { useState } from 'react'
import styled from 'styled-components'
import AddaNote from '../menu/AddNote'
import { ListNote } from '../type/Type'
import Note from '../menu/Note'
import { Tooltip } from '@mui/material'

interface Props {
  note: ListNote[],
  addForm: (index: number, color: string, title: string, description: string, date: string) => void,
  Delete:(id:number)=>void,
  showValues:()=>void,
  search: string
}

export default function Main({ note, addForm,Delete,showValues,search}: Props) {
  const [edit,SetEdit] = useState(false)
  const [editForId,setEditForId] = useState<number>(0)
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false)
  };
  
  const EditNote = (id:number) =>{
    setEditForId(id);
    SetEdit(true)
  }
  const saveChange = (color:string,title:string,description:string,date:string) =>{
    SetEdit(false)
    const id = note.findIndex((value) => value.id == editForId)
    const newList: ListNote = {
      id: editForId,
      title: title,
      description:description,
      color:color,
      date:date
    }
    const itemlist = [...note]
    itemlist[id] = newList
    localStorage.setItem('item', JSON.stringify(itemlist))
    showValues()
  }
  const Cancelar = () =>{
    SetEdit(false)
  }

  return (
    <MainStyled>
      <div className='containerNote' style={{gridTemplateRows:"mansory"}}>
        {
          note.filter((value)=>{
            const titleNormalized = value.title.toLowerCase()
            const descriptionNormalized = value.description?.toLowerCase()
            const dateNormalized = value.date?.toLowerCase()
            return (
              titleNormalized.includes(search)?
              value:
              descriptionNormalized?.includes(search)?
              value:
              dateNormalized?.includes(search) && value
            )
          }).map((value) => {
            return (
              <p key={value.id} style={{width:"100%",marginBottom:"12px"}}>
                <Note search={search} EditNote={EditNote} Delete={Delete} value={value} />
              </p>
            )
          })
        }
      </div>
      <Tooltip title="Add note" placement="top">
        <button className='button' onClick={() => setOpen(!open)}>
          +
        </button>
      </Tooltip>
      <AddaNote 
        addForm={addForm} 
        index={note} 
        open={open} 
        handleClose={handleClose} 
        editForId={editForId}
        edit={edit}
        saveChange={saveChange}
        Cancelar={Cancelar}
        />
    </MainStyled>
  )
}

const MainStyled = styled.div`
    height:90vh;
    padding: 0 4% 0 4%;
    .button{
      background-color:red;
      height:50px;
      width:50px;
      position:fixed;
      right:30px;
      bottom:30px;
      border:none;
      border-radius:50%;
      font-size:1.5rem;
      color:white;
      transition: .3s;
    }
    .button:hover{
      background: rgba(255, 0, 0, 0.5);
      cursor:pointer;
    }
    .note{
      width:250px;
      height:330px;
    }
    .containerNote{
      /* background-color:red; */
      /* column-count:4;
      column-gap:10px; */
      -webkit-column-count:3;
      -moz-column-count:3;
      column-count:4;
      -webkit-column-width:33%;
      -moz-column-width:33%;
      column-width:33%;
      padding: 0 12px;
    }
`
