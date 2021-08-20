import FabricCanvasTool from "../fabrictool";
import '../eraser_brush';

const fabric = require('fabric').fabric;


class Pencil extends FabricCanvasTool {
    configureCanvas(props) {
        this._canvas.isDrawingMode = true;
        this._canvas.freeDrawingBrush = new fabric.PencilBrush(this._canvas);
        this._canvas.freeDrawingBrush.width = props.lineWidth;
        this._canvas.freeDrawingBrush.color = props.lineColor;
    }
}

export default Pencil;
