import React from 'react';
import SketchField from '../components/react-sketch/components/SketchField';
import main from "../presentation/main";

declare const navigator: any;

class BoardPreview extends React.Component<any, any> {
    private _sketch: any;

    constructor(props:any) {
        super(props);
        this.state = {
            _presentation: {
                connection: null,
                loading: true
            },
            dataTranfer: {},
            _sketch: null
        }
    }

    componentDidMount = () => {
        // this._sketch.enableTouchScroll();
        // this._sketch.getDatabase();

        // request.getAvailability().then(function(availability) {
        //   // availability.value may be kept up-to-date by the controlling UA as long
        //   // as the availability object is alive. It is advised for the Web developers
        //   // to discard the object as soon as it's not needed.
        //   handleAvailabilityChange(availability.value);
        //   availability.onchange = function() { handleAvailabilityChange(this.value); };
        // }).catch(function() {
        //   // Availability monitoring is not supported by the platform, so discovery of
        //   // presentation displays will happen only after request.start() is called.
        //   // Pretend the devices are available for simplicity; or, one could implement
        //   // a third state for the button.
        //   handleAvailabilityChange(true);
        // });
        // this._sketch._loadingCanvas();
        // this._sketch2._loadingCanvas();

        // (function(){
        // let fabric = window.fabric
        // var defaultOnTouchStartHandler = fabric.Canvas2.prototype._onTouchStart;
        // fabric.util.object.extend(fabric.Canvas.prototype, {
        //   _onTouchStart: function(e) {
        //     var target = this.findTarget(e);
        //     // if allowTouchScrolling is enabled, no object was at the
        //     // the touch position and we're not in drawing mode, then
        //     // let the event skip the fabricjs canvas and do default
        //     // behavior
        //     if (this.allowTouchScrolling && !target && !this.isDrawingMode) {
        //       // returning here should allow the event to propagate and be handled
        //       // normally by the browser
        //       return;
        //     }

        //     // otherwise call the default behavior
        //     defaultOnTouchStartHandler.call(this, e);
        //   }
        // });
        // })();
        // console.log(this.state.tool);
        // this.handleChangeTool("Pencil");
        // this.setState({lineWidth: 5});
        (function (console: any) {
            console.save = function (data: any, filename: any) {
                if (!data) {
                    console.error('Console.save: No data');
                    return;
                }
                if (!filename) filename = 'console.json';
                if (typeof data === 'object') {
                    data = JSON.stringify(data, undefined, 4);
                }
                const blob = new Blob([data], { type: 'text/json' });
                const e = document.createEvent('MouseEvents');
                const a = document.createElement('a');
                a.download = filename;
                a.href = window.URL.createObjectURL(blob);
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                e.initMouseEvent(
                    'click',
                    true,
                    false,
                    window,
                    0,
                    0,
                    0,
                    0,
                    0,
                    false,
                    false,
                    false,
                    false,
                    0,
                    null
                );
                a.dispatchEvent(e);
            };
        })(console);
        this.getConnect();
    };


    _changeVal (evt:any) {
        if (this._sketch) {
            this._sketch.getCanvasValue(evt.data);
            this._sketch._loadingCanvas();
        }

        return evt.data;
    };

    connectionFound (connection:any) {
        this.setState((prevState:any) => ({
            _presentation:{
                ...prevState._presentation,
                connection:connection
            }
        }));
        connection.addEventListener('message', this._changeVal.bind(this));
    };

    async getConnect () {
        if (navigator.presentation && navigator.presentation.receiver) {
            const list = await navigator.presentation.receiver.connectionList;
            if (list.connections.length > 0) {
                this.connectionFound(list.connections[0]);
            } else {
                // list.addEventListener('connectionavailable', evt => {
                //     if (!_presentation.connection) {
                //         this.connectionFound(evt.connection);
                //     }
                // });
            }
        }
    }

    render() {

      return (
        <div>
            <a href="#" onClick={(e) => {
                e.preventDefault();
                console.log(this._sketch)
            }
            }
               className="btn btn-primary"
            >Show slide</a>
            <SketchField width={1000}
                         height={768}
                         ref={(c: any) => {
                           this._sketch = c;
                             console.log(this._sketch);
                             console.log('a');
                         }}
            />

        </div>
      );
    }
}

export default BoardPreview;
