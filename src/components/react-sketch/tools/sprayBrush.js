(function (fabric) {
    fabric.SprayBrush = fabric.util.createClass(fabric.BaseBrush, {

        opacity: 1,
        width: 30,
        _baseWidth: 1,
        _drips: [],
        _dripThreshold: 1,
        _inkAmount: 0,
        _interval: 1,
        _lastPoint: null,
        _point: null,
        _strokeId: 0,
        brush: null,
        brushCol: 'data:image/png;base64,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',

        initialize: function (canvas, opt) {
            var context = this;
            opt = opt || {};

            this.canvas = canvas;
            this.width = opt.width || canvas.freeDrawingBrush.width;
            this.opacity = opt.opacity || canvas.contextTop.globalAlpha;
            this.color = opt.color || canvas.freeDrawingBrush.color;

            this.canvas.contextTop.lineJoin = "round";
            this.canvas.contextTop.lineCap = "round";

            this._reset();

            fabric.Image.fromURL(this.brushCol, function (brush) {
                console.log(brush);
                context.brush = brush;
                context.brush.filters = [];
                context.changeColor(context.color || this.color);
            }, {crossOrigin: "anonymous"});
        },

        changeColor: function (color) {
            this.color = color;
            this.brush.filters[0] = new fabric.Image.filters.Tint({color: color});
            this.brush.applyFilters(this.canvas.renderAll.bind(this.canvas));
        },

        changeOpacity: function (value) {
            this.opacity = value;
            this.canvas.contextTop.globalAlpha = value;
        },

        onMouseDown: function (pointer) {
            this._point = new fabric.Point(pointer.x, pointer.y);
            this._lastPoint = this._point;

            this.size = this.width + this._baseWidth;
            this._strokeId = +new Date();
            this._inkAmount = 0;

            this.changeColor(this.color);
            this._render();
        },

        onMouseMove: function (pointer) {
            this._lastPoint = this._point;
            this._point = new fabric.Point(pointer.x, pointer.y);
        },

        onMouseUp: function (pointer) {
        },

        _render: function () {
            var context = this;

            setTimeout(draw, this._interval);

            function draw() {
                var point, distance, angle, amount, x, y;

                point = new fabric.Point(context._point.x || 0, context._point.y || 0);
                distance = point.distanceFrom(context._lastPoint);
                angle = point.angleBetween(context._lastPoint);
                amount = (100 / context.size) / (Math.pow(distance, 2) + 1);

                context._inkAmount += amount;
                context._inkAmount = Math.max(context._inkAmount - distance / 10, 0);
                if (context._inkAmount > context._dripThreshold) {
                    context._drips.push(new fabric.Drip(context.canvas.contextTop, point, context._inkAmount / 2, context.color, context._strokeId));
                    context._inkAmount = 0;
                }

                x = context._lastPoint.x + Math.sin(angle) - context.size / 2;
                y = context._lastPoint.y + Math.cos(angle) - context.size / 2;
                context.canvas.contextTop.drawImage(context.brush._element, x, y, context.size, context.size);

                if (context.canvas._isCurrentlyDrawing) {
                    setTimeout(draw, context._interval);
                } else {
                    context._reset();
                }
            }
        },

        _reset: function () {
            this._drips.length = 0;
            this._point = null;
            this._lastPoint = null;
        }
    });
})