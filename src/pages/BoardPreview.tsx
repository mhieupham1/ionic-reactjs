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
