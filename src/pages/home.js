import React, { useState, useEffect } from "react";
import socket from '../socket';
import { Link, useNavigate } from "react-router-dom";
import '../App.css'
import { TextField, Button, Box } from "@mui/material";
import { ImSearch } from "react-icons/im";

function Home() {
  const [roomId, setRoomId] = useState('');
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('playerJoined', (players) => {
      setPlayers(players);
    });

    return () => {
      socket.off('playerJoined');
    };
  }, []);

  const createRoom = () => {
    if (playerName.trim() !== '') {
      socket.emit('createRoom', playerName, (newRoomId) => {
        if (newRoomId !== '' && playerName !== '') {
          setRoomId(newRoomId); // Update the roomId state with the newRoomId
          
          // Navigate to the room page with the received room ID
          navigate(`/room/${newRoomId}`);
        }
      });
    } else {
      setPlayerName('Anonymous');
      socket.emit('createRoom', playerName, (newRoomId) => {
        if (newRoomId !== '' && playerName !== '') {
          setRoomId(newRoomId); // Update the roomId state with the newRoomId
          
          // Navigate to the room page with the received room ID
          navigate(`/room/${newRoomId}`);
        }
      });
    }
  };
  
  

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleJoinRoomIdChange = (event) => {
    setJoinRoomId(event.target.value);
  };

  const joinRoom = () => {
    if (joinRoomId.trim() !== '' && playerName.trim() !== '') {
      socket.once('joinRoomResponse', (success) => {
        if (success) {
          console.log('Successfully joined the room!');
          setRoomId(joinRoomId);
        } else {
          console.log('Failed to join the room!');
        }
      });
  
      socket.emit('joinRoom', { roomId: joinRoomId, playerName });
    }
  };

  return (
    <div className="home-page">
      <div className="name-setting">
        <TextField
          id="name-setting"
          label="ENTER YOUR NAME"
          color="success"
          fullWidth
          value={playerName}
          onChange={handlePlayerNameChange}
        />
      </div>

      <div className="home-button">
        <div className="home-button-single">
          <Button variant="contained" color="success" fullWidth >
            JOIN
          </Button>
          
            <Box>
              <TextField
                id="id-room-search"
                variant="filled"
                hiddenLabel
                style={{ margin: "5%" }}
                value={joinRoomId}
                onChange={handleJoinRoomIdChange}
              />
            <Link to={`/room/${joinRoomId}`}style={{ margin: " 8%" }} onClick={joinRoom}><ImSearch  size={30} /></Link>
              
            </Box>
          
        </div>
        <div className="home-button-single">
          <Button variant="outlined" color="success" fullWidth onClick={createRoom}>
            CREATE
          </Button>
          
        </div>
        <div className="home-button-single">
          <div className="prog-play">
            <Button
              variant="contained"
              color="success"
              fullWidth
              style={{ backgroundColor: "yellowgreen", paddingTop: "5%", paddingBottom: "5%" }}
            >
              HOW TO PLAY
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

