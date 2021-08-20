/*eslint no-unused-vars: 0*/

import FabricCanvasTool from "../fabrictool";
const fabric = require('fabric').fabric;

class Select extends FabricCanvasTool {
    configureCanvas(props) {
        // console.log(props);
        let canvas = this._canvas;

        canvas.isDrawingMode = false;
        canvas.selection = true;
        canvas.forEachObject((o) => {
            o.selectable = o.evented = true;
        });

    }

    deleteObject = (eventData, transform) => {
        var target = transform.target;
        let canvas = this._canvas;
        canvas.remove(target);
        canvas.requestRenderAll();
    }

    cloneObject = (eventData, transform) => {
        var target = transform.target;
        let canvas = this._canvas;
        target.clone(function (cloned) {
            cloned.left += 10;
            cloned.top += 10;
            canvas.add(cloned);
        });
    }
}

export default Select;
