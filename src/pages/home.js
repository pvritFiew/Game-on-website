import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
import { TextField, Button, Box } from "@mui/material";
import { ImSearch } from "react-icons/im";
//import Room from './room'

function Home(){

    const [drop, setDrop] = React.useState(false);
    const join_room_drop = () => {
        setDrop(!drop);
    };

    return(
        <div className="home-page">

            <div className="name-setting">
                <TextField id="name-setting" label="ENTER YOUR NAME" color="success" fullWidth />
            </div>

            <div className="home-button">
                <div className="home-button-single">
                    <Button variant="contained" color="success" fullWidth onClick={join_room_drop}>JOIN</Button>
                    {
                        drop ? 
                        <Box>
                        <TextField id="id-room-search"  variant="filled" hiddenLabel style={{margin:"5%"}}/>
                        <ImSearch style={{margin:" 8%",}} size={30}/>
                        </Box> 
                        :<div></div>
                    }
                    
                </div>
                <div className="home-button-single">
                    <Link to="/room">
                        <Button variant="outlined" color="success" fullWidth>CREATE</Button>
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