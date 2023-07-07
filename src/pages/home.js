import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
import axios from "axios";
import { Link } from "react-router-dom";
import '../App.css'
import { TextField, Button, Box } from "@mui/material";
import { ImSearch } from "react-icons/im";
//import Room from './room'

const socket = io('http://localhost:5000');

function Home(){

    const [roomId, setRoomId] = useState('');
    const [players, setPlayers] = useState([]);
    const [playerName, setPlayerName] = useState('');

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
        setRoomId(newRoomId);
        if (newRoomId !== '') {
          // Redirect to the room page with the received room ID
          window.location.href = `/room/${newRoomId}`;
        }
      });
    } else {
      setPlayerName('Anonymous');
      socket.emit('createRoom', playerName, (newRoomId) => {
        setRoomId(newRoomId);
        if (newRoomId !== '') {
          // Redirect to the room page with the received room ID
          window.location.href = `/room/${newRoomId}`;
        }
      });
    }
  };

  const joinRoom = () => {
    if (roomId.trim() !== '' && playerName.trim() !== '') {
      socket.emit('joinRoom', { roomId, playerName }, (success) => {
        if (success) {
          console.log('Successfully joined the room!');
        } else {
          console.log('Failed to join the room!');
        }
      });
    }
  };


  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

    const [drop, setDrop] = React.useState(false);
    const join_room_drop = () => {
        setDrop(!drop);
    };

    return(
        <div className="home-page">

            <div className="name-setting">
                <TextField id="name-setting" label="ENTER YOUR NAME" color="success" fullWidth value={playerName} onChange={handlePlayerNameChange}/>
            </div>

            <div className="home-button">
                <div className="home-button-single">
                    <Button variant="contained" color="success" fullWidth onClick={join_room_drop}>JOIN</Button>
                    {
                        drop ? 
                        <Box>
                        <TextField id="id-room-search"  variant="filled" hiddenLabel style={{margin:"5%"}}/>
                        <ImSearch style={{margin:" 8%",}} size={30} onClick={joinRoom}/>
                        </Box> 
                        :<div></div>
                    }
                    
                </div>
                <div className="home-button-single">
                    <Link>
                        <Button variant="outlined" color="success" fullWidth onClick={createRoom}>CREATE</Button>
                    </Link>
                </div>
                <div className="home-button-single">
                    <div className="prog-play">
                        <Button variant="contained" color="success" fullWidth style={{backgroundColor:"yellowgreen", paddingTop:"5%", paddingBottom:"5%"}}>HOW TO PLAY</Button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;