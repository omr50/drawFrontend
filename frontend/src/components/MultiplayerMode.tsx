import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AnyAction } from "redux";
import UserCanvas from "../Classes/UserClass";
import { io, Socket } from "socket.io-client";
import { pencilCursor, eraserCursor } from "../assets/cursors";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { AutoFixHigh, Clear, Dataset, Draw } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import Winner from "./winner";
import { fetchGamesThunk } from "../redux/games/games.actions";
import { ThunkDispatch } from "redux-thunk";
/*
There will be multiple canvases on this page. The
usersCanvas object holds uuid ids as keys and their
values as refs to html canvases. Through this object
we can easily access the canvas options, and pixel data.
*/
const MultiplayerMode = () => {
  const dispatch = useDispatch() as ThunkDispatch<RootState, null, AnyAction>; 
  // refs and state variables
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // user id that remains CONSTANT across re-renders
  const userId = useRef(uuidv4()).current;
  const [topic, setTopic] = useState<string>('')
  const [timer, setTimer] = useState(15);
  const timerRef = useRef(0);
  const timerIntervalRef = useRef<number | null>(null);
  const sendDataIntervalRef = useRef<number | null>(null);
  const [startButtonVisible, setStartButtonVisible] = useState(false);
  const { darkMode } = useTheme();
  const userRef = useRef(useSelector((state: RootState) => state.user.user)); // Adjust based on your store structure
  const [winners, setWinners] = useState(null)
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  console.log("GOT USER", userRef.current?.email)
  // array holding the canvasRef pairs.
  // Map over this array to place all canvases
  // on the board.
  const userCanvasesRef = useRef<Map<string, UserCanvas>>(new Map());
  const [userCanvases, setUserCanvases] = useState<Map<string, UserCanvas>>(
    new Map()
  );
  const [draw, setDraw] = useState(0);
  const drawRef = useRef(0);
  // const [userCanvases, setUserCanvases] = useState<UserCanvas[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(true);
  const socketRef = useRef<any | null>(null);
  const roomnameRef = useRef<string>("");
  const removeCanvasesFunctionRef = useRef<(() => void) | null>(null);

  // TRY LIGHT BLUE FILL
  // sets up initial drawing settings
  // (stroke color, line width, fill color)
  useEffect(() => {
    // get the canvas element from the ref
    const canvas: HTMLCanvasElement | null = canvasRef.current;

    // The users canvas will be the first in the map.
    const newUserCanvas = new UserCanvas(canvasRef, userId);
    // Create a new Map for immutability
    if (userCanvasesRef.current) {
      const updatedCanvases = new Map(userCanvasesRef.current);
      updatedCanvases.set(userId, newUserCanvas);
      console.log("USERS", userCanvasesRef.current);
      userCanvasesRef.current = updatedCanvases;
      newUserCanvas.initializeContext();
      setUserCanvases(updatedCanvases);
      setIsErasing(false)
    }

  }, []);

  // if erasing change font and color
  useEffect(() => {
    // get the canvas element from the ref
    const canvas: HTMLCanvasElement | null = canvasRef.current;

    if (canvas === null) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = isErasing ? 18 : 4; // Initial settings
    ctx.strokeStyle = isErasing ? "white" : "black";
    ctx.lineCap = "round"; // Round end caps for lines
  }, [isErasing]);

  useEffect(() => {
    if (!userCanvases.size) return;
    const userCanvas: UserCanvas | null | undefined = userCanvases.get(userId)
      ? userCanvases.get(userId)
      : null;
    if (userCanvas === null || userCanvas === undefined) return;

    const ctx = userCanvas.getCtx();
    if (!ctx) return;

    const canvas: HTMLCanvasElement | null = userCanvas.canvasRef.current;
    if (!canvas) return;
    const startDrawing = () => setIsDrawing(true);

    const stopDrawing = () => {
      setIsDrawing(false);
      ctx.beginPath();
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

    removeCanvasesFunctionRef.current = () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mousemove", draw);
    }
    return () => {
      removeCanvasesFunctionRef.current?.();
    };
  }, [userCanvases, isDrawing]);

  useEffect(() => {
    socketRef.current = io("https://146.190.114.212:8080");
    sendDataIntervalRef.current = window.setInterval(() => {
      if (!userCanvasesRef.current) return;
      const base64Img = userCanvasesRef.current!.get(userId)?.encodetoBase64();
      socketRef.current.emit("canvasData", {
        base64Img,
        userId,
        roomName: roomnameRef.current,
      });
      console.log("sent canvas data");
    }, 300);
    // Join the game

    if (userRef.current) {
      const data = {userId: userId, email: userRef.current.email}
      socketRef.current.emit("joinGame", data);
    }
    else {
      const data = {userId: userId}
      socketRef.current.emit("joinGame", data)
    }

    // Listen for other users joining or leaving.
    socketRef.current.on("users", (userIds: string[]) => {
      // create new user
      if (userCanvasesRef.current) {
        const updatedCanvases = new Map(userCanvasesRef.current);
        for (let id of userIds) {
          if (!updatedCanvases.get(id)) {
            const newUserCanvas = new UserCanvas(React.createRef(), id);
            // make sure all canvases have the same initial 
            // settings by initializing context.
            newUserCanvas.initializeContext();
            updatedCanvases.set(id, newUserCanvas);
          }      
        }
        // also for removing a user, remove the users whose ids don't
        // exist in the list.
        updatedCanvases.forEach((value, key) => {
          if (!userIds.includes(key)) {
            // Remove the key from the map if it's not in the array
            updatedCanvases.delete(key);
          }
        });

        userCanvasesRef.current = updatedCanvases;
        setUserCanvases(userCanvasesRef.current);
        console.log('new users should be receiveds');
        console.log('the users', updatedCanvases);
      }
    });

    socketRef.current.on("serverDraw", (data: any) => {
      // console.log('Received canvas blob data from server.', data.blob);

      // when you get back the blob then paint it onto the respective
      // users canvas.
      if (!userCanvasesRef.current) return;
      console.log("b");
      const UserObject = userCanvasesRef.current.get(data.userId);
      console.log("c");
      console.log("user object", UserObject);
      if (!UserObject) return;
      console.log("d");
      if (UserObject.canvasRef.current) {
        console.log("Updating canvas.");
        UserObject.updateCanvasFromData(data.base64Img, 80, 80);
        setDraw(drawRef.current + 1);
        console.log("Finished Updating");
      }
    });

    socketRef.current.on("assignedRoom", (data: any) => {
      console.log("got room name", data.roomName);
      roomnameRef.current = data.roomName;
      timerRef.current = data.timestamp;
      setTopic(data.topic);

      timerIntervalRef.current = window.setInterval(()=> {
        const timeLeft = 15 - Math.floor((Date.now() - timerRef.current) / 1000);
        // if time hits 0, notify backend through socket to make predictions.
        // clear the timerInterval, and also remove the ability to draw / erase.
        if (timeLeft <= 0) {
          window.clearInterval(timerIntervalRef.current!);
          setTimer(0);
          // disable canvas
          removeCanvasesFunctionRef.current?.();

        }
        else {
          console.log("Timer:", timeLeft)
          setTimer(timeLeft);    
        }

      }, 500)
      
    });

    // this will get all previous users if there are any and
    // add them to the list.

    socketRef.current.on("previousUsers", (userList: string[]) => {
      if (userCanvasesRef.current) {
        const updatedCanvases = new Map(userCanvasesRef.current);

        userList.forEach((userId) => {
          if (!updatedCanvases.get(userId)) {
            const newUser = new UserCanvas(React.createRef(), userId);
            updatedCanvases.set(userId, newUser);
          }
        });
        userCanvasesRef.current = updatedCanvases;
        setUserCanvases(userCanvasesRef.current);
      }
    });

    socketRef.current.on('winners', async (data: any) => {
      console.log("WINNERS", data)
      setWinners(data)
      // draw the winner / loser on to the canvas.

      const winner = "data:image/png;base64,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"
      const loser = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFdUlEQVR4nO2dd4hdRRTGZ+0dC1GxBHsHuxJRNqLi6ib75jvjiCWyRGWxBAQVLIGsgiWoEAsqwRKsWEBFQUSxINgLFhSNgg17L7vvzTw3I/My7+Zl1U1237333fvm/GD/2N23M+fec6fcb845KwTDMAzDMAzDMAzDMAzDMAzDMAyTCm727K3c8PAaZbudTogep/XWopuoK3WUIVpmiR7yFyhKhCG62RI5A5wqugUr5Qx/UeFrnigJRqkTG84gWlZXaqboJgxwS7i4mqlU9hMFZ7RS2d4APwebbxTdhhscXM8SvdMYJcBSNzCwsSgorrd3LQO8FEb0+07r9UU3UtN6L0M0Ei70NlFQDHBVGBkjNSn3FN2MJRpqrieG6BRRMKyUvQb4OyzkZ4oYsMD94YJ/q2q9oygITutplujr8MA8LGLBVSqbWqLPwih53Q0Nrd1xm4ToscDjwRlfOq03FzFhpTzEADY45cqO20N0frClbpU6TMSIJZofpq6xOtHRnbLDAAf47XgYHfNFrHgpxQDPhCfzOy+v5G7DnDkbWuCjYMMLTus1Rcx4J3hnhBvyZN7SigXuDn3/Mqr19Dz7Lix1KY8LWpezROd1QhqpSVnJq99SYIgWJdKKUvtn3V9Vyp0N8Hvo84as+ysdrq9vXUv0VpBWPslSWvHbbAO82vXSSLtUtd7FEP0RbtSdWfVjgOvC7u6vrpdG2sUoNZhIKxmcQdSJjm2uV4bojLTb70oscE9wyJ81KXdLq10HbGmAb6OTRtrFab2RJfo4OOUNp/U6qbzzED0drTTSLlbKAw1gwtSysO32iC6OXhpp+yYCFybSCnBMG+0c3HSuBS5t27BYcUL0GKInwpP9/VSiPxrTH7CUpZG0nKL1NEP0TRgpT01WWrHAfcEZP44MDGyTll1RU1dqZvMUzxJdsLp/57e1iTQCDGRrZWQYooVhlFir1KGr+nyNaNfmS6YBrs/HyohwPhKE6OUwSj51fX2bTCjDAG+zNJIxVaKd/Dl82C098H+fM8BNLI3khAF0S9TKaeN/Xyc6PpFGlDo9L7uixgJ3JNKK1rs3fz6i9bZ+N8XSSCeOXYk+DDf+TS+tBGnk2UQa6e/fLG+7osYA+xhgNExd11qiBSyNdBhLNK/5ntHynnJJp+2KFueD24gea1nkOWqEHcL8e8oCxpIpi9XcAizqwDWWaJgX9QJse004UeRtbwexwO3/deY+AmxniH7iF8McqQEnTBSVUgf6WTrJiVGtp/sY3LB4L1llginHXeUkv2PiyMaVEkw5MjEbDHD1ZGJ/jVJ7NxNM+YAqw0RMO4noeCvlWXyEm2EipplC/og/yOIghwwSMc0UM6waCabA56x1pZmICYz5AjZTbkfKw1kNTjER0wBXpNDeZYm0IuWMdtuLCrdyIuZraeSxhwTT58K2+Qs+UZwEluiu4Ixfq5XKDiIlWFppIxHTLp+qThIpUwOQtM9RKaufiGmBxSIjDNGtibRCtEdW/ZSaRiIm0SvBGR+4WbM2yKwvL60A74aR8p7/Pqu+SktLImbVAPtm3p+XVlZErSzKur9S0ZqIaYnOzqtfC5zD0srEiZiP5OWMFqc8GkbmD9Hnj4xLxPzKSblF3g7x7yMsrax4Oi9qKc90ZMfsUOqI6KUVq9RBSSIm0QLRYQxwebTSyrg89BeLUKPKLZdWno9SWrFE9xaxRtWIj1oJxZN9WXQRAwaYW+QaVTUpqUW6mStiqfZT5PLdFljc9dJKmRIxXQzSiq/aVqZYKdPN0koj8b+ENaoscG5zvVud3PjSYJQ6OesqcRkGWTwY/n/IlM/0C0knavKm9X5SVtsZhmEYhmEYhmEYhmEYhmEYhmFEAfkH+e3g5/B4AuAAAAAASUVORK5CYII="
      // each user will draw winner / loser on their screen and it will be broadcast to all others.
      const status = data[userId]['place']
      if (status) {
        userCanvasesRef.current.get(userId)?.drawImageToCanvas(winner, 210, 0, 70, 70);
      } else {
        userCanvasesRef.current.get(userId)?.drawImageToCanvas(loser, 65, 65, 150, 150);
      }
      try {
      if (isLoggedIn) {
        await dispatch(fetchGamesThunk());
      } 
    } catch (error) {
      console.error("Error:", error);
    }
      // after it sends then disable the communication.
      setTimeout(()=> {
        window.clearInterval(sendDataIntervalRef.current!);
      }, 1000)

    });

    // socketRef.current.on('winner', (winner: any) => {

    //   // if the winner (uuid) is the same as the userId(uuid)
    //   // then we will remove the interval so it no longer sends data
    //   // and the other users can appear in the array. Also make sure
    //   // that value isn't already in the array just to make sure.
    //   if (!winnerRef.current.includes(winner)) {
    //     winnerRef.current.push(winner)
    //     // console.log("We got a winner")
    //     // console.log("WINNER REF", winnerRef.current)
    //     clearInterval(intervalId.current)
    //   }
    // })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        // don't remove the canvas or their ability to draw
        // they can keep going, but if they already won, just
        // remove the socket connection so they don't keep sending.
        // Maybe even save the image as base64 string to db so they
        // have later access the the image they drew.
      }
    };
  }, []);
return (


      <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: '0px !important',
        padding: '0px !important'

      }}
    >
        {!startButtonVisible && (
        <>
        <Box sx={{ transform: 'scale(0.7)', mt: 1, zIndex: 2, padding: '0px', position: 'relative'}}>
          <CircularProgressWithLabel value={(timer / 60) * 100} />
          {topic ? 
          <div style={{position: 'inherit', top: '-20px', left: '-10px'}}><span>Draw a <span style={{color: 'red', fontWeight: 'bold', fontSize: '20px', border: '2px solid green', borderRadius: '5px'}}>{topic}</span></span></div>
          :
          <div className="loading" style={{position: 'inherit', top: '-20px', left: '-10px'}}><span>Waiting for players...</span></div>
          }
        </Box>

          <Box
            sx={{
              position: 'relative',
              transform: 'scale(0.65)',
              top: '10',
              display: "flex",
              justifyContent: "center",
              gap: 3,
              zIndex: 2,
              mt: '-30px',
              padding: '0px'
            }}
          >
            <Button
              size="small"
              onClick={() => setIsErasing(true)}
              sx={{
                "&:hover": { backgroundColor: "transparent" },
              }}
              disableTouchRipple
            >
              <IconButton
                color={
                  isErasing ? (darkMode ? "secondary" : "primary") : "default"
                }
                size="large"
              >
                <AutoFixHigh sx={{ mb: 1.5 }} />
              </IconButton>
              <Typography
                variant="caption"
                sx={{
                  color: darkMode ? "white" : "black",
                }}
              >
                Eraser
              </Typography>
            </Button>

            <Button
              size="small"
              onClick={() => setIsErasing(false)}
              sx={{
                "&:hover": { backgroundColor: "transparent" },
              }}
              disableTouchRipple
            >
              <IconButton
                color={
                  isErasing ? "default" : darkMode ? "secondary" : "primary"
                }
                size="large"
              >
                <Draw sx={{ mb: 1 }} />
              </IconButton>
              <Typography
                variant="caption"
                sx={{
                  color: darkMode ? "white" : "black",
                }}
              >
                Pencil
              </Typography>
            </Button>

            <Button
              size="small"
              onClick={() => {
                if (canvasRef && canvasRef.current) {
                    canvasRef.current.getContext('2d')!.fillStyle = "white";
                    canvasRef.current.getContext('2d')!.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                }
              }}
              sx={{
                "&:hover": { backgroundColor: "transparent" },
              }}
              disableTouchRipple
            >
              <IconButton size="large">
                <Clear sx={{ mb: 0.5 }} />
              </IconButton>
              <Typography
                variant="caption"
                sx={{
                  color: darkMode ? "white" : "black",
                }}
              >
                Clear
              </Typography>
            </Button>
          </Box>
        </>
      )}
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', // Center the items horizontally
    alignItems: 'center', // Center the items vertically
  }}>
    {userCanvases.get(userId) ? 
    (<div>
        {/* <Winner/>  */}
        <canvas
          style={{
            border: "4px solid green",
            backgroundColor: 'white',
            cursor: isErasing
              ? `url('${eraserCursor}'), auto`
              : `url('${pencilCursor}'), auto`
          }}
          ref={userCanvases.get(userId)!.canvasRef}
          width={280}
          height={280}
        ></canvas>
    </div>) : ""}

    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'flex-start', // This will distribute space evenly between the canvases
      height: 280, // Match the height of the larger canvas
      marginLeft: '20px' // Give some space between the large canvas and the smaller ones
    }}> 
    {Array.from(userCanvases).map(([Id, currCanvas]) => (
      userId !== Id && 
      <canvas
        key={Id}
        style={{
          border: "1px solid red",
          backgroundColor: 'white',
          cursor: isErasing
            ? `url('${eraserCursor}'), auto`
            : `url('${pencilCursor}'), auto`,
          marginBottom: '5px' // Add a bottom margin if needed
        }}
        ref={currCanvas.canvasRef}
        width={80}
        height={80}
      ></canvas>
    ))}
    </div>

    {/* Uncomment the button if needed */}
    {/* <button
      onClick={() => {
        setIsErasing((erasing) => !erasing);
      }}
    >
      {isErasing ? "Draw" : "Erase"}
    </button> */}
  </div>
  </Container>
);

};

export default MultiplayerMode;
