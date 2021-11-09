/**
 * MarkerBrush class
 * @class fabric.MarkerBrush
 * @extends fabric.BaseBrush
 */
(function(fabric) {

    fabric.MarkerBrush = fabric.util.createClass(fabric.BaseBrush, {

        color: "#000000",
        opacity: 1,
        width: 30,

        _baseWidth: 10,
        _lastPoint: null,
        _lineWidth: 3,
        // _point: null,
        _size: 0,

        initialize: function(canvas, opt) {
            // opt = opt || {};
            //
            // this.canvas = canvas;
            // this.width = opt.width || canvas.freeDrawingBrush.width;
            // this.color = opt.color || canvas.freeDrawingBrush.color;
            // this.opacity = opt.opacity || canvas.contextTop.globalAlpha;
            // this._points = [];
            // this._point = new fabric.Point();
            this.canvas = canvas;
            this._points = [];
            this.canvas.contextTop.lineJoin = 'round';
            this.canvas.contextTop.lineCap = 'round';

        },

        changeColor: function(color) {
            this.color = color;
        },

        changeOpacity: function(value) {
            this.opacity = value;
        },

        _render: function(pointer) {

            // var ctx, lineWidthDiff, i;
            //
            // ctx = this.canvas.contextTop;
            //
            // ctx.beginPath();
            //
            // for(i = 0, len = (this._size / this._lineWidth) / 2; i < len; i++) {
            //     lineWidthDiff = (this._lineWidth - 1) * i;
            //
            //     ctx.globalAlpha = 0.8 * this.opacity;
            //     ctx.moveTo(this._lastPoint.x + lineWidthDiff, this._lastPoint.y + lineWidthDiff);
            //     ctx.lineTo(pointer?.x + lineWidthDiff, pointer?.y + lineWidthDiff);
            //     ctx.stroke();
            // }
            //
            // this._lastPoint = new fabric.Point(pointer?.x, pointer?.y);


            var ctx = this.canvas.contextTop, i, len,
                p1 = this._points[0],
                p2 = this._points[1];
            //
            // this._saveAndTransform(ctx);
            ctx.beginPath();
            // //if we only have 2 points in the path and they are the same
            // //it means that the user only clicked the canvas without moving the mouse
            // //then we should be drawing a dot. A path isn't drawn between two identical dots
            // //that's why we sstartet them apart a bit
            // if (this._points.length === 2 && p1.x === p2.x && p1.y === p2.y) {
            //     var width = this.width / 1000;
            //     p1 = new fabric.Point(p1.x, p1.y);
            //     p2 = new fabric.Point(p2.x, p2.y);
            //     p1.x -= width;
            //     p2.x += width;
            // }
            ctx.moveTo(p1.x, p1.y);
            //
            // for (i = 1, len = this._points.length; i < len; i++) {
            //     // we pick the point between pi + 1 & pi + 2 as the
            //     // end point and p1 as our control point.
            //     this._drawSegment(ctx, p1, p2);
            //     p1 = this._points[i];
            //     p2 = this._points[i + 1];
            // }
            // // Draw last line as a straight line while
            // // we wait for the next point to be able to calculate
            // // the bezier control point
            ctx.lineTo(p1.x, p1.y);
            ctx.lineCap = 'square'
            ctx.stroke();
            ctx.restore();
        },

        onMouseDown: function(pointer,options) {
            // this._lastPoint = pointer;
            this.canvas.contextTop.strokeStyle = this.color;
            this.canvas.contextTop.lineWidth = this.width;
            // this._size = this.width + this._baseWidth;

            if (!this.canvas._isMainEvent(options.e)) {
                return;
            }
            this._prepareForDrawing(pointer);
            // // // capture coordinates immediately
            // // // this allows to draw dots (when movement never occurs)
            this._captureDrawingPath(pointer);

            this._render(pointer);
            // this._render();
            // return ;
            console.log('onMouseDown');
        },

        onMouseMove: function(pointer,options) {
            console.log('onMouseMove');
            // if (this.canvas._isCurrentlyDrawing) {
            //     this._render(pointer);
            // }

            if (!this.canvas._isMainEvent(options.e)) {
                return;
            }
            if (this.limitedToCanvasSize === true && this._isOutSideCanvas(pointer)) {
                return;
            }

            if (this._captureDrawingPath(pointer) && this._points.length > 1) {
                if (this.needsFullRender()) {
                    // redraw curve
                    // clear top canvas
                    this.canvas.clearContext(this.canvas.contextTop);
                    this._render();
                } else {

                    // var ctx, lineWidthDiff, i;
                    //
                    // ctx = this.canvas.contextTop;
                    //
                    // ctx.beginPath();
                    //
                    // for(i = 0, len = (this._size / this.width) / 2; i < len; i++) {
                    //     lineWidthDiff = (this.width - 1) * i;
                    //
                    //     ctx.globalAlpha = 0.8 * this.opacity;
                    //     ctx.moveTo(this._lastPoint.x + lineWidthDiff, this._lastPoint.y + lineWidthDiff);
                    //     ctx.lineTo(pointer?.x + lineWidthDiff, pointer?.y + lineWidthDiff);
                    //     ctx.stroke();
                    // }
                    //
                    // this._lastPoint = new fabric.Point(pointer?.x, pointer?.y);


                    var points = this._points, length = points.length, ctx = this.canvas.contextTop;
                    // draw the curve update
                    // this._saveAndTransform(ctx);

                    if (this.oldEnd) {
                        ctx.beginPath();
                        ctx.moveTo(this.oldEnd.x, this.oldEnd.y);
                    }
                    this.oldEnd = this._drawSegment(ctx, points[length - 2], points[length - 1], true);
                    ctx.lineCap = 'square'
                    ctx.stroke();
                    ctx.restore();
                }
            }
        },

        onMouseUp: function(options) {
            // this.canvas.contextTop.globalAlpha = this.opacity;
            // this._finalizeAndAddPath();
            console.log('onMouseUp')
            if (!this.canvas._isMainEvent(options.e)) {
                return true;
            }
            this.oldEnd = undefined;
            this._finalizeAndAddPath();
            return false;

        },

        convertPointsToSVGPath: function (points) {
            var path = [], i, width = this.width / 1000,
                p1 = new fabric.Point(points[0].x, points[0].y),
                p2 = new fabric.Point(points[1].x, points[1].y),
                len = points.length, multSignX = 1, multSignY = 0, manyPoints = len > 2;

            // return ;
            if (manyPoints) {
                multSignX = points[2].x < p2.x ? -1 : points[2].x === p2.x ? 0 : 1;
                multSignY = points[2].y < p2.y ? -1 : points[2].y === p2.y ? 0 : 1;
            }
            path.push('M ', p1.x - multSignX * width, ' ', p1.y - multSignY * width, ' ');
            for (i = 1; i < len; i++) {
                if (!p1.eq(p2)) {
                    var midPoint = p1.midPointFrom(p2);
                    // p1 is our bezier control point
                    // midpoint is our endpoint
                    // start point is p(i-1) value.
                    path.push('Q ', p1.x, ' ', p1.y, ' ', midPoint.x, ' ', midPoint.y, ' ');
                }
                p1 = points[i];
                if ((i + 1) < points.length) {
                    p2 = points[i + 1];
                }
            }
            if (manyPoints) {
                multSignX = p1.x > points[i - 2].x ? 1 : p1.x === points[i - 2].x ? 0 : -1;
                multSignY = p1.y > points[i - 2].y ? 1 : p1.y === points[i - 2].y ? 0 : -1;
            }
            path.push('L ', p1.x + multSignX * width, ' ', p1.y + multSignY * width);
            return path;
        },

        _finalizeAndAddPath: function () {
            console.log('_finalizeAndAddPath')
            var ctx = this.canvas.contextTop;
            ctx.closePath();


            if (this.decimate) {
                this._points = this.decimatePoints(this._points, this.decimate);
            }

            var pathData = this.convertPointsToSVGPath(this._points).join('');

            if (pathData === 'M 0 0 Q 0 0 0 0 L 0 0') {
                // do not create 0 width/height paths, as they are
                // rendered inconsistently across browsers
                // Firefox 4, for example, renders a dot,
                // whereas Chrome 10 renders nothing
                this.canvas.requestRenderAll();
                return;
            }

            var path = this.createPath(pathData);
            this.canvas.clearContext(this.canvas.contextTop);
            this.canvas.fire('before:path:created', {path: path});
            this.canvas.add(path);
            this.canvas.requestRenderAll();
            path.setCoords();
            this._resetShadow();


            // fire event 'path' created
            this.canvas.fire('path:created', {path: path});
        },

        createPath: function (pathData) {
            console.log(pathData);
            var path = new fabric.Path(pathData, {
                fill: null,
                stroke: this.color,
                strokeWidth: this.width,
                strokeLineCap: 'square',
                strokeMiterLimit: this.strokeMiterLimit,
                strokeLineJoin: this.strokeLineJoin,
                strokeDashArray: this.strokeDashArray,
            });
            if (this.shadow) {
                this.shadow.affectStroke = true;
                path.shadow = new fabric.Shadow(this.shadow);
            }

            return path;
        },

        _captureDrawingPath: function (pointer) {
            var pointerPoint = new fabric.Point(pointer.x, pointer.y);
            return this._addPoint(pointerPoint);
        },

        _addPoint: function (point) {
            if (this._points.length > 1 && point.eq(this._points[this._points.length - 1])) {
                return false;
            }
            this._points.push(point);
            return true;
        },

        _drawSegment: function (ctx, p1, p2) {
            var midPoint = p1.midPointFrom(p2);
            ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
            return midPoint;
        },

        _prepareForDrawing: function (pointer) {

            var p = new fabric.Point(pointer.x, pointer.y);

            // this._reset();
            this._points = [];

            // this._setBrushStyles();
            // this._setShadow();
            this._addPoint(p);
            this.canvas.contextTop.moveTo(p.x, p.y);
        },

        _reset: function () {
            this._points = [];
            this._setBrushStyles();
            this._setShadow();
        },

    });

})(fabric);