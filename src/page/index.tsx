import { useEffect, useState } from 'react'
import { CSSreset } from '../components/CSSreset'
import Header from '../components/header'
import Main from '../components/main'
import {ListNote} from '../components/type/Type'



export default function HomePage() {
  
  const [note,setNote]=useState<ListNote[]>([])
  const [search,setSearch]=useState('')
  useEffect(() => {
    if (!localStorage.getItem('item')) {
      localStorage.setItem('item', JSON.stringify([]))
    } else {
      setNote(JSON.parse(localStorage.getItem('item')!))
    }
  }, [])
  

  interface Props {
    form:{
      title:string,
      description:string,
      date:string
    }
  }
  const showValues = () => {
    setNote(JSON.parse(localStorage.getItem('item')!))
  }

  const addForm = (index:number,color:string,title:string,description:string,date:string) =>{
    const newNote = {
      id: index,
      title: title,
      description: description,
      date: date,
      color:color,
    }
    let values = [...note]
    values.push(newNote)
    localStorage.setItem('item', JSON.stringify(values))
    setNote(values)
    showValues()
  } 


  const Delete = (id: number) => { 
    var filter = note.filter((value) => value.id !== id)
    localStorage.setItem('item', JSON.stringify(filter))
    showValues() 
  }

  return (
    <div style={{height:"100vh"}}>
        <CSSreset/>
        <Header setSearch={setSearch}/>
        <Main 
          Delete={Delete} 
          addForm={addForm} 
          note={note}
          showValues={showValues}
          search={search}
          />
    </div>
  )
}
