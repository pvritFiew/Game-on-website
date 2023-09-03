import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RxPerson } from 'react-icons/rx';
import { BsHouseDoor } from 'react-icons/bs';
import axios from 'axios';

function Gameplay() {
  const { roomId } = useParams(); // Get roomId from the URL
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
  }, [roomId]); // Fetch players when roomId changes

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
                    <RxPerson size={30} />
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
    </div>
  );
}

export default Gameplay;
