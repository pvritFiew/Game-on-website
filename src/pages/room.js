import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { RxCopy, RxPerson } from "react-icons/rx";
import {BsHouseDoor} from "react-icons/bs";
import '../App.css'
import { useParams } from 'react-router-dom';

export default function Room() {

  const { roomId } = useParams();

  function createData(name) {
    return { name};
  }

  const rows = [
    createData('Player 1'),
    createData('Waiting ...'),
    createData('Waiting ...'),
    createData('Waiting ...'),
  ];

  return (
    <div>
      {console.log(roomId)}
      <div className='table-container'>
        <TableContainer component={Paper} sx={{ maxWidth: 300 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>NAME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                ><TableCell>{index === 0 ? <BsHouseDoor size={30}/> : <RxPerson size={30}/>}</TableCell>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <TextField
          hiddenLabel
          defaultValue={roomId}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />

        <RxCopy size={35} title='Copy'/>

      </div>

      <div>
        <Button variant="contained" color="success">START</Button>
      </div>
      <div>{roomId}</div>
    </div>
  );
}