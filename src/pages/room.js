import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { RxCopy, RxPerson } from 'react-icons/rx';
import { BsHouseDoor } from 'react-icons/bs';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';
import socket from '../socket';
import axios from "axios";

export default function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rooms/${roomId}/names`);
        setPlayers(response.data);
       
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchPlayers();

    socket.on('playerJoined', (updatedPlayers) => {
      setPlayers(updatedPlayers);
      console.log(players);
    });

    return () => {
      socket.off('playerJoined');
      
    };
  }, []);
  
  const handleStartGame = () => {
    socket.emit('startGame'); // Emit a "startGame" event
  };

  // Listen for a "navigateToGameplay" event from the server
  socket.on('navigateToGameplay', () => {
    navigate(`/gameplay/${roomId}`); // Navigate to the Gameplay page
  });

  return (
    <div>
      <div className="table-container">
        <TableContainer component={Paper} sx={{ maxWidth: 300 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>NAME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    {index === 0 ? <BsHouseDoor size={30} /> : <RxPerson size={30} />}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {player}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <TextField hiddenLabel defaultValue={roomId} InputProps={{ readOnly: true }} variant="outlined" />

        <RxCopy size={35} title="Copy" />
      </div>

      <div>
        <Button variant="contained" color="success" onClick={handleStartGame}>
          START
        </Button>
      </div>
      <div>{roomId}</div>
    </div>
  );
}
