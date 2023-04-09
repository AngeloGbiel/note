import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { ListNote } from '../type/Type';

import * as MdIcons from 'react-icons/md'
interface Props {
    value:ListNote,
    Delete:(id:number)=>void,
    EditNote:(id:number)=>void,
    search:string
}

export default function Note({value,Delete,EditNote,search}:Props) {

  return (
    <Card sx={{ width: "100%" }} style={{backgroundColor:`${value.color}`}}>
      <CardHeader 
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {value.title[0]}
          </Avatar>
        }
        title={value.title}
        subheader={value.date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" component={'span'}>
          {value.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>Delete(value.id)}>
            {/* colocar para deletar e editar */}
            <MdIcons.MdDelete />
        </IconButton>
        <IconButton aria-label="share" onClick={()=>EditNote(value.id)}>
            {/* colocar para deletar e editar */}
            <MdIcons.MdModeEditOutline/>
        </IconButton>
        
      </CardActions>
    </Card>
  );
}