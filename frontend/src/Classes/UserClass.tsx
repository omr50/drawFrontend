import { Socket } from "socket.io-client";

// this class will encapsulate user
// canvas data and allow us to easily
// encode, decode, and re-draw canvases
// that are sent over websockets.
class UserCanvas {
    public canvasRef: React.RefObject<HTMLCanvasElement>;
    public userId: string 
    constructor(canvasRef: React.RefObject<HTMLCanvasElement>, userId: string) {
        this.canvasRef = canvasRef; 
        this.userId = userId 
    }

    // methods:
    // get context to be able to draw on the canvas.
    public getCtx() {
        return this.canvasRef.current?.getContext('2d');
    }

    // encode canvas data
    public encodetoBase64() {
        // if the canvasRef exists, encode
        return this.canvasRef.current?.toDataURL();
    }
   
    // send canvas data
    public sendCanvasData(socket: Socket) {
        const base64Data = this.encodetoBase64();
        socket.emit('canvasData', { userId: this.userId, data: base64Data });
    }

    // update canvas from received base64 data
public updateCanvasFromData(base64Data: string, targetWidth: number, targetHeight: number) {
    const ctx = this.getCtx();
    // if context exists, draw the image onto the canvas
    if (ctx) {
        let img = new Image();
        img.onload = () => {
            // Clear the canvas in case there's something already drawn on it
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            // Draw the image at the desired size (100x100 in your case)
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        };
        img.src = base64Data;
    } 
  }

  public drawImageToCanvas(base64Data: string, startWidth: number, startHeight: number, targetWidth: number, targetHeight: number) {
    const ctx = this.getCtx();
    // if context exists, draw the image onto the canvas
    if (ctx) {
        let img = new Image();
        img.onload = () => {
            // Draw the image at the desired size (100x100 in your case)
            ctx.drawImage(img, startWidth, startHeight, targetWidth, targetHeight);
        };
        img.src = base64Data;
    } 
  }

    public initializeContext() {
        const ctx = this.getCtx();
        if (ctx) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.lineCap = "round";
        ctx.fillStyle = "white";
        // ... any other initial properties
        }
  }
}

export default UserCanvas;

