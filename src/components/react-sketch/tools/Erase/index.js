import FabricCanvasTool from "../fabrictool";
import '../eraser_brush';
const fabric = require('fabric').fabric;

class Erase extends FabricCanvasTool {
    configureCanvas(props) {
        this._canvas.isDrawingMode = true;
        this._canvas.freeDrawingBrush = new fabric.EraserBrush(this._canvas);
        this._canvas.freeDrawingBrush.width = props.lineWidth;
    }
}

export default Erase;
