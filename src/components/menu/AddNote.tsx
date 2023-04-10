import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Data } from '../config';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import { ListNote } from '../type/Type'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean,
  handleClose: () => void,
  index: ListNote[],
  addForm:(index:number,color:string,title:string,description:string,date:string)=>void,
  editForId:number,
  edit:boolean,
  saveChange:(color:string,title:string,description:string,date:string)=>void,
  Cancelar:()=>void
}
interface Form {
  target: {
    value: string,
    name:string
  }
}

function useForm() {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    date: "",
  })
  return {
    form,
    handleChange: (e: Form) => {
      const value = e.target.value
      const name = e.target.name
      setForm({
        ...form,
        [name]:value
      })
    },
    clearForm(){
      setForm({
        title: "",
        description: "",
        date: "",
      })
    }
  }
}


export default function AddaNote({ open, handleClose,index,addForm,editForId,edit,saveChange,Cancelar}: Props) {
  const [active, setActive] = React.useState<number|string>(0)
  const [color,setColor] = React.useState("#EE5656")
  const AddNoteForm = useForm()
  

  return (
    <div>
      {
        edit? <Dialog
        open={edit}
        TransitionComponent={Transition}
        keepMounted
        onClose={Cancelar}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogContent style={{ display: "flex", flexDirection: "column", gap: '20px' }}>
          <TextField
            id="outlined-basic"
            label='Title'
            variant="outlined"
            fullWidth
            name="title"
            onChange={AddNoteForm.handleChange}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            fullWidth
            name="description"
            onChange={AddNoteForm.handleChange}
            value={AddNoteForm.form.description}
          />
          <ColorDate>
            <div className='color'>
              {
                Data.colorNote.map((color) => {
                  return (
                    <ColorNoteStyled
                      colorNote={color}
                      key={color.id}  
                      style={{ boxShadow: `${index[editForId].color === color.cor || active==color.id ? "2px 4px 4px rgba(0, 0, 0, 0.5)" : ""}` }}
                      onClick={() => {
                        setActive(color.id)
                        setColor(color.cor)
                      }}
                    />
                  )
                })
              }
            </div>
            <input type="date" className='date' name="date" onChange={AddNoteForm.handleChange}/>
          </ColorDate>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "black" }} onClick={Cancelar}>Cancelar</Button>
          <Button style={{ backgroundColor: "#06f", color: "black" }} onClick={()=>{
            handleClose()
            saveChange(color,AddNoteForm.form.title,AddNoteForm.form.description,AddNoteForm.form.date)
            AddNoteForm.clearForm()
          }}>Salvar</Button>
        </DialogActions>
      </Dialog>: //divisão-----------------------------------------------------------

      <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
    >
      <DialogContent style={{ display: "flex", flexDirection: "column", gap: '20px' }}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          fullWidth
          name="title"
          onChange={AddNoteForm.handleChange}
          value={AddNoteForm.form.title}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          fullWidth
          name="description"
          onChange={AddNoteForm.handleChange}
          value={AddNoteForm.form.description}
        />
        <ColorDate>
          <div className='color'>
            {
              Data.colorNote.map((color) => {
                return (
                  <ColorNoteStyled
                    colorNote={color}
                    key={color.id}  
                    style={{ boxShadow: `${active == color.id ? "2px 4px 4px rgba(0, 0, 0, 0.5)" : ""}` }}
                    onClick={() => {
                      setActive(color.id)
                      setColor(color.cor)
                    }}
                  />
                )
              })
            }
          </div>
          <input type="date" className='date' name="date" onChange={AddNoteForm.handleChange}/>
        </ColorDate>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: "black" }} onClick={handleClose}>Cancelar</Button>
        <Button style={{ backgroundColor: "#06f", color: "black" }} onClick={()=>{
          handleClose()
          addForm(index.length,color,AddNoteForm.form.title,AddNoteForm.form.description,AddNoteForm.form.date)
          AddNoteForm.clearForm()
        }}>Salvar</Button>
      </DialogActions>
    </Dialog>
      }
    </div>
  );
}

interface Color {
  colorNote: {
    cor: string
  }
}
const ColorDate = styled.div`
  display:flex;
  justify-content: space-between;
  .color{
    display:flex;
    gap:20px;
    flex-wrap: wrap;
    max-width:180px;
  }
  .date{
    height:40px;
    width:50%;
    border:none;
    border-bottom:1px solid black;
    outline:none;
  }
  @media(max-width:600px){
    .color{
      gap:10px;
      max-width:90px;
    }
  }
  `
const ColorNoteStyled = styled.div<Color>`
  background-color:${({ colorNote }) => colorNote.cor};
  height:30px;
  width:30px;
  border:black solid 1px;
  transition: .3s;
  @media(max-width:600px){
    height:15px;
    width:15px;
  }
`