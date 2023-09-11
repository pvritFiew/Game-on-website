import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RxPerson } from 'react-icons/rx';
import { TextField, Button } from "@mui/material";
import axios from 'axios';
import socket from '../socket';

function Gameplay() {
  const navigate = useNavigate();
  const { roomId} = useParams();
  const [players, setPlayers] = useState([]);
  const [turnTime, setTurnTime] = useState(10);
  const [numberInput, setNumberInput] = useState('');
  const [allPlayerNumbers, setAllPlayerNumbers] = useState([]);
  const [turnStarted, setTurnStarted] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rooms/${roomId}/names`);
        setPlayers(response.data);
        console.log(players);
        console.log('Socket ID:', socket.id);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchPlayers();
  }, [roomId]);


  useEffect(() => {
    if (turnTime === 10) {
      // When turnTime reaches 10 seconds, fetch the numbers
      const fetchNumbers = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/rooms/${roomId}/numbers`);
          const playerNumbers = response.data;
          // Update the state to display all player numbers
          setAllPlayerNumbers(playerNumbers);
          console.log('Player numbers:', playerNumbers);
        } catch (error) {
          console.log('Error fetching numbers:', error);
        }
      };
  
      fetchNumbers();
    }
  }, [roomId, turnTime]);

  useEffect(() => {
    socket.on('navigateToGameplay', () => {
      navigate(`/gameplay/${roomId}`);
    });

    socket.on('updateTurnTimer', ({ turnTime }) => {
      setTurnTime(turnTime); // Update the turn time when receiving updates from the server
    });

    socket.on('showAllNumbers', ({ playerNumbers }) => {
      // Update the state to display all player numbers
      setAllPlayerNumbers(playerNumbers);
      console.log('Player numbers:', playerNumbers);
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate, roomId]);

  

  const handleSubmitNumber = () => {
    if (!turnStarted) {
      // Send the player's input to the server
      socket.emit('submitNumber', { roomId, socketId: socket.id, numberInput });
      // Clear the input field
      setNumberInput('');

    }
    
  };

  return (
    <div>
      <div className="table-container">
        {/* Display the list of players and their input */}
        <table>
          <thead>
            <tr>
              <th></th>
              <th>NAME</th>
              <th>Number Input</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player}>
                <td>
                  <RxPerson size={30} />
                </td>
                <td>{player}</td>
                <td>
                  {/* Display the player's input if available */}
                  {allPlayerNumbers.map((item, index) => (
                    <span key={index}>
                      {item.playerName === player ? item.numberInput : ''}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {turnTime > 0 && (
        <div>
          <p>Time: {turnTime} seconds</p>
        </div>
      )}
  
      {turnTime > 0 && (
        <div>
          <TextField
            variant="filled"
            hiddenLabel
            style={{ margin: "5%" }}
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            disabled={turnStarted} // Disable input when turn hasn't started
          />
          <Button onClick={handleSubmitNumber} disabled={turnStarted}>
            GO
          </Button>
          <Button onClick={handleSubmitNumber} disabled={!turnStarted}>
            restart
          </Button>
        </div>
      )}
    </div>
  );
  
}

export default Gameplay;
