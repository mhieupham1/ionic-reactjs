import FabricCanvasTool from "../fabrictool";
import { hexToRgbA, colorNameToHex } from "../../utils";
// import '../sprayBrush1'
// import '../sprayBrush'

import '../highlightBrush'

// import '../penCustom'
class Highlighter extends FabricCanvasTool {
  configureCanvas(props) {
    this._canvas.isDrawingMode = true;
    this._canvas.freeDrawingBrush = new fabric.highlightBrush(this._canvas);
    this._canvas.freeDrawingBrush.width = props.lineWidth;
    // this._canvas.freeDrawingBrush.color =
    //   props.lineColor.indexOf("#") > -1
    //     ? hexToRgbA(props.lineColor)
    //     : hexToRgbA(colorNameToHex(props.lineColor));
  }

  doMouseUp (e) {
    console.log(this._canvas);
  }
}

export default Highlighter;
