import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React from 'react';
import SketchField from '../components/react-sketch/components/SketchField';
import Tools from '../components/react-sketch/tools';
import DropZone from 'react-dropzone';
import axios from 'axios';
import main from './../presentation/main'
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import Draggable from 'react-draggable'; // The default

import './Tab1.css';
import {uuid4} from "../components/react-sketch/utils";

declare const navigator: any;
declare const PresentationRequest: any;

const fileVideo = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4'
const urlFile = 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf';
const fileDoc = 'https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc'
const fileXls = 'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_10.xls'
const filePPT = 'https://file-examples-com.github.io/uploads/2017/08/file_example_PPT_250kB.ppt'

class SketchFieldDemo extends React.Component<any, any> {
    private _sketch: any;
    private _sketch2: any;

    constructor(props: any) {
        super(props);
        this.state = {
            tool: Tools.Pencil,
            lineWidth: 5,
            lineColor: 'black',
            fillColor: '#68CCCA',
            backgroundColor: 'transparent',
            shadowWidth: 0,
            shadowOffset: 0,
            enableRemoveSelected: false,
            fillWithColor: false,
            fillWithBackgroundColor: false,
            drawings: [],
            canUndo: false,
            canRedo: false,
            controlledSize: false,
            sketchWidth: 600,
            sketchHeight: 600,
            stretched: true,
            stretchedX: false,
            stretchedY: false,
            originX: 'left',
            originY: 'top',
            imageUrl: 'https://files.gamebanana.com/img/ico/sprays/4ea2f4dad8d6f.png',
            expandTools: false,
            expandControls: false,
            expandColors: false,
            expandBack: false,
            expandImages: false,
            expandControlled: false,
            text: 'text',
            enableCopyPaste: false,
            fontSizeText: 20,
            fontStyleText: 'inherit',
            fontWeightText: '100',
            textUnderline: false,
            imageProtractor: 'https://i.ibb.co/WPwJmjx/kisspng-equilateral-triangle-drawing-protractor-protractor-5a70771fd4e5d8-6174176115173199678721.png',
            imageTriangle: 'https://i.ibb.co/mJ7dRcd/pngegg.png',
            rememberText: 'transparent',
            backgroundColorText: '',
            fontFamilyType: '',
            isTextDirection: false,
            isErase: false,
            menuPositionX: 0,
            menuPositionY: 0,
            menuFontSize: 0,
            menuFontColor: '',
            displayMenuSelected: 'none',
            tablePosition: {
                X: 0,
                Y: 0,
                drag: false
            },
            tableColumn: 0,
            tableRow: 0,
            listDataGrid: [],
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
            videoURL:'http://media.w3.org/2010/05/sintel/trailer.mp4',
            audioURL:'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3'
        }
    }

    componentDidMount = () => {
        this._sketch.enableTouchScroll();
        this._sketch.getDatabase();

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
                const blob = new Blob([data], {type: 'text/json'});
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
    };

    updateData = (response: any) => {
        this._sketch._fc._objects = JSON.parse(response.data.data_board);
        // console.log(response.data.data_board)
    }

    _undo = () => {
        this._sketch.undo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
    };

    _redo = () => {
        this._sketch.redo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
    };

    _clear = () => {
        this._sketch.clear();
        this._sketch.setBackgroundFromDataUrl('');
        this.setState({
            controlledValue: null,
            backgroundColor: 'transparent',
            fillWithBackgroundColor: false,
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo(),
        });
    };

    _save = () => {
        const drawings = this.state.drawings;
        const Link = document.createElement('a');
        Link.setAttribute('href', this._sketch.toDataURL());
        Link.setAttribute('download', 'abc.png');
        Link.click()
        drawings.push(this._sketch.toDataURL());
        this.setState({drawings: drawings});
    };

    _onBackgroundImageDrop = (accepted: any /*, rejected */) => {
        if (accepted && accepted.length > 0) {
            const sketch = this._sketch;
            const reader = new FileReader();
            const {stretched, stretchedX, stretchedY, originX, originY} = this.state;
            reader.addEventListener(
                'load',
                () =>
                    sketch.setBackgroundFromDataUrl(reader.result, {
                        stretched: stretched,
                        stretchedX: stretchedX,
                        stretchedY: stretchedY,
                        originX: originX,
                        originY: originY,
                    }),
                false,
            );
            reader.readAsDataURL(accepted[0]);
        }
    };

    handleChangeTool = (tool: any) => {
        switch (tool) {
            case 'Pencil':
                tool = Tools.Pencil
                break;
            case 'Erase':
                tool = Tools.Erase;
                break;
            case 'Line':
                tool = Tools.Line
                break;
            case 'Rectangle':
                tool = Tools.Rectangle
                break;
            case 'Triangle':
                tool = Tools.Triangle
                break;
            case 'Circle':
                tool = Tools.Circle
                break;
            case 'Select':
                tool = Tools.Select
                break;
            case 'Pan':
                tool = Tools.Pan
                break;
            case 'Highlighter':
                tool = Tools.Highlighter
                break;
            default:
                tool = Tools.Pencil
        }
        this.setState({tool: tool})
    }

    handleChangeColor = (color: any) => {
        this.setState({lineColor: color})
    }

    _removeSelected = () => {
        this._sketch.removeSelected();
    };

    _addText = () => {
        const backgroundColor = this.state.rememberText !== 'transparent' ? this.state.rememberText : this.state.backgroundColorText
        let textContent = this.state.text;
        if (this.state.isTextDirection) {
            const textArr = this.state.text.toString().split('');
            textContent = textArr.join('\n');
        }

        const text = this._sketch.addText(textContent, {
            fill: this.state.lineColor,
            editable: true,
            fontSize: this.state.fontSizeText,
            fontWeight: this.state.fontWeightText,
            underline: this.state.textUnderline,
            backgroundColor: backgroundColor,
            fontFamily: this.state.fontFamilyType
        });
    };

    showMenu = (e: any) => {
        this.setState({
            menuPositionX: e.e.offsetX,
            menuPositionY: e.e.offsetY,
            displayMenuSelected: 'block',
            menuFontSize: e.selected[0].fontSize,
            menuFontColor: e.selected[0].fill === 'black' ? '#000000' : e.selected[0].fill
        });
    }

    hideMenu = (e: any) => {
        this.setState({
            displayMenuSelected: 'none'
        })
    }

    initialiseDrag = (e: any) => {

        let dataVal = this.state.listDataGrid.map((data: any) => (data.isDrag === true) ? {
            ...data,
            positionX: e.e.offsetX,
            positionY: e.e.offsetY - 20
        } : data)
        this.setState((prevState: any) => ({
            listDataGrid: dataVal
        }));
        // this.setState((prevState: any) => ({
        //     tablePosition: {
        //         ...prevState.tablePosition,
        //         X: e.e.offsetX,
        //         Y: e.e.offsetY - 20,
        //     }
        // }));
    }

    onMouseDownTableExcel = (id: any) => {
        let dataVal = this.state.listDataGrid.map((data: any) => (data.id === id) ? {
            ...data,
            isDrag: !data.isDrag
        } : data)
        this.setState((prevState: any) => ({
            listDataGrid: dataVal
        }));
    }

    onMouseUpTableExcel = () => {
        this.setState((prevState: any) => ({
            tablePosition: {
                ...prevState.tablePosition,
                drag: false
            }
        }));
    }

    createTableGrid = () => {
        let column = this.state.tableColumn ?? 1;
        let row = this.state.tableRow ?? 1;

        let arrayValueData = [];
        for (let i = 0; i < column; i++) {
            let arrayChild = []
            for (let i = 0; i < row; i++) {
                arrayChild.push({value: ''})
            }
            arrayValueData.push(arrayChild);
        }
        let arrayValueInfo = [
            {
                "id": uuid4(),
                "positionX": 0,
                "positionY": 0,
                "isDrag": false,
                "data": arrayValueData
            }
        ];

        this.setState({
            listDataGrid: [...this.state.listDataGrid, ...arrayValueInfo]
        })
    }

    updateTableGrid = (id: any, dataUpdate: any) => {

        let dataVal = this.state.listDataGrid.map((data: any) => (data.id === id) ? {...data, data: dataUpdate} : data)
        this.setState((prevState: any) => ({
            listDataGrid: dataVal
        }));
    }

    handleDrag = (e: any, ui: any) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    };

    onStart = () => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.setState({activeDrags: this.state.activeDrags + 1});
        console.log(this.state.activeDrags)
    };

    onStop = () => {
        this.setState({activeDrags: this.state.activeDrags - 1});
        console.log(this.state.activeDrags)
    };

    render() {
        const {
            tool,
            lineColor,
            lineWidth,
            backgroundColor,
            text,
            fontSizeText,
            fontWeightText,
            textUnderline,
            canUndo,
            canRedo,
            imageUrl,
            imagerProtractor,
            isErase,
            menuPositionX,
            menuPositionY,
            menuFontSize,
            menuFontColor,
            displayMenuSelected,
            tablePosition,
            listDataGrid,
            gridData,videoURL,audioURL
        } = this.state
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};

        const listDataGridDiv = listDataGrid.map((data: any, id: any) => (
            <Draggable key={data.id} cancel="strong" {...dragHandlers}>

                <div style={{
                    position: 'absolute',
                    top: data.positionY,
                    left: data.positionX,
                    display: 'block',
                    zIndex: 2,
                    height: 400
                }} className={"sheet-container"}>
                    <strong className="no-cursor">
                        <iframe style={{width: '100%', height: '100%', backgroundColor: 'grey'}}
                                src={`http://docs.google.com/gview?url=${urlFile}&embedded=true`}></iframe>


                    </strong>
                </div>
            </Draggable>

        ))
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <>
                        <div className='w-100'>
                            <div className='border d-flex position-relative'>

                                {listDataGridDiv}

                                <div style={{
                                    zIndex: 1
                                }
                                }>
                                    <SketchField width={1000}
                                                 height={768}
                                                 tool={tool}
                                                 lineColor={lineColor}
                                                 lineWidth={lineWidth}
                                                 ref={(c: any) => {
                                                     this._sketch = c;
                                                 }}
                                                 showMenu={this.showMenu.bind(this)}
                                                 hideMenu={this.hideMenu.bind(this)}
                                                 onChange={(c: any) => {
                                                     // const data = this._sketch._fc._objects;
                                                     // this._sketch2._fc._objects = this._sketch._fc._objects
                                                     this._sketch.saveDatabase();
                                                     // main._presentation.connection.send('change')
                                                     main.changeImage(JSON.stringify(this._sketch._fc));
                                                 }}
                                    />
                                </div>
    <div>
        <label htmlFor="">URL video</label>
        <input type="text" className="form-control" value={videoURL}
               onChange={(e: any) => {
                   if (!(e.target.value === '' && e.target.value === 0)) {
                       this.setState({
                           videoURL: e.target.value
                       });
                   }
               }
               }/>
        <button className={'btn btn-primary'} onClick={()=>{
            this._sketch.addVideoWithTimeBar(videoURL);
        }}>Add video</button>
    </div>

                                <div>
                                    <label htmlFor="">URL audio</label>
                                    <input type="text" className="form-control" value={audioURL}
                                           onChange={(e: any) => {
                                               if (!(e.target.value === '' && e.target.value === 0)) {
                                                   this.setState({
                                                       audioURL: e.target.value
                                                   });
                                               }
                                           }
                                           }/>
                                    <button className={'btn btn-primary'} onClick={()=>{
                                        this._sketch.addAudio(audioURL);
                                    }}>Add audio</button>
                                </div>

                                <div className="border" style={{
                                    position: 'absolute',
                                    top: menuPositionY + 10,
                                    left: menuPositionX,
                                    display: displayMenuSelected
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="">Font-size</label>
                                        <input type="number" className="form-control" value={menuFontSize}
                                               onChange={(e: any) => {
                                                   if (!(e.target.value === '' && e.target.value === 0)) {
                                                       this.setState({
                                                           menuFontSize: e.target.value
                                                       });
                                                       this._sketch.updateText({
                                                           fontSize: e.target.value
                                                       })
                                                   }
                                               }
                                               }/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Color</label>
                                        <input type="color" className="form-control" value={menuFontColor}
                                               onChange={(e: any) => {
                                                   this.setState({
                                                       menuFontColor: e.target.value
                                                   });
                                                   this._sketch.updateText({
                                                       fill: e.target.value
                                                   })
                                               }
                                               }/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="border-bottom">
                                    <div className="form-group">
                                        <input className='form-control' type="text"
                                               onChange={(e: any) => this.setState({tableColumn: e.target.value})}/> x <input
                                        type="text" className='form-control'
                                        onChange={(e: any) => this.setState({tableRow: e.target.value})}/>
                                        <a href="#" onClick={(e: any) => {
                                            e.preventDefault();
                                            this.createTableGrid()
                                        }} className="btn btn-primary">Add</a>
                                    </div>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        this._sketch.handleObjectToFront()
                                    }
                                    }>To front</a>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        main.connectDisplay();
                                    }
                                    }
                                       className="btn btn-primary"
                                    >Show slide</a>

                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        main.changeImage();
                                    }
                                    } className="btn btn-primary">Change Image</a>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        main.disconnectDisplay();
                                    }
                                    } className="btn btn-primary">Disconnect</a>

                                    <div className='form-group'>
                                        <label htmlFor="">Tool</label>
                                        <select
                                            className='form-control'
                                            onChange={(e) => this.handleChangeTool(e.target.value)}
                                        >
                                            <option value="Pencil">Pencil</option>
                                            <option value="Erase">Erase</option>
                                            <option value="Line">Line</option>
                                            <option value="Rectangle">Rectangle</option>
                                            <option value="Highlighter">Highlighter</option>
                                            <option value="Triangle">Triangle</option>
                                            <option value="Circle">Circle</option>
                                            <option value="Select">Select</option>
                                            <option value="Pan">Pan</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Line Width</label>
                                        <select
                                            className='form-control'
                                            onChange={(e) => {
                                                this.setState({lineWidth: parseInt(e.target.value)})
                                            }}
                                        >
                                            <option value="5">Default</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Zoom</label>
                                        <div>
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                this._sketch.zoom(1.25)
                                            }}
                                               className="btn btn-primary mr-2"><i
                                                className="fas fa-search-plus"></i></a>
                                            <a href="!" onClick={(e) => {
                                                e.preventDefault();
                                                this._sketch.zoom(0.8)
                                                console.log(this._sketch)
                                            }} className="btn btn-primary"><i
                                                className="fas fa-search-minus"></i></a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Text</label>
                                        <div className="d-flex ">
                                            <input placeholder="Input text" className="form-control mr-2" value={text}
                                                   onChange={(e) => this.setState({text: e.target.value})} type="text"/>
                                            <input placeholder="Font size" className="form-control mr-2"
                                                   value={fontSizeText}
                                                   onChange={(e) => this.setState({fontSizeText: e.target.value})}
                                                   type="text"/>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Font Style</label>
                                            <select name="" id="" className="form-control"
                                                    onChange={(e) => this.setState({fontFamilyType: e.target.value})}>
                                                <option value="">Default</option>
                                                <option value="arial">Arial</option>
                                                <option value="auto">Auto</option>
                                                <option value="cursive">Cursive</option>
                                                <option value="sans-serif">Sans-serif</option>
                                                <option value="monospace">Monospace</option>
                                            </select>
                                        </div>
                                        <div>
                                            <div className="form-check">
                                                <input onChange={(e) => {
                                                    if (e.target.checked) {
                                                        this.setState({fontWeightText: 'bold'})
                                                    } else {
                                                        this.setState({fontWeightText: '100'})
                                                    }
                                                }} className="form-check-input" type="checkbox" value=""
                                                       id="fontStyle1">
                                                </input>
                                                <label className="form-check-label" htmlFor="fontStyle1">
                                                    Blod
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input onChange={(e) => {
                                                    if (e.target.checked) {
                                                        this.setState({textUnderline: true})
                                                    } else {
                                                        this.setState({textUnderline: false})
                                                    }
                                                }} className="form-check-input" type="checkbox" value=""
                                                       id="underLine">
                                                </input>
                                                <label className="form-check-label" htmlFor="underLine">
                                                    Underline
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input onChange={(e) => {
                                                    if (e.target.checked) {
                                                        this.setState({rememberText: '#85ff00'})
                                                    } else {
                                                        this.setState({rememberText: 'transparent'})
                                                    }
                                                }} className="form-check-input" type="checkbox" value=""
                                                       id="RememberText">
                                                </input>
                                                <label className="form-check-label" htmlFor="RememberText">
                                                    Remember Text
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input onChange={(e) => {
                                                    if (e.target.checked) {
                                                        this.setState({isTextDirection: true})
                                                    } else {
                                                        this.setState({isTextDirection: false})
                                                    }
                                                }} className="form-check-input" type="checkbox" value=""
                                                       id="TextDirection">
                                                </input>
                                                <label className="form-check-label" htmlFor="TextDirection">
                                                    Text Direction
                                                </label>
                                            </div>
                                        </div>

                                        <a href="#" onClick={(e) => {
                                            e.preventDefault();
                                            this._addText()
                                        }} className="btn btn-primary">+</a>
                                    </div>
                                </div>

                                <div className="border-bottom mt-3">
                                    <label htmlFor="">Color Text & Line</label>
                                    <input type="color" id="favcolor"
                                           className="form-control"
                                           onChange={(e) => this.setState({lineColor: e.target.value})}
                                    >
                                    </input>
                                    <label htmlFor="">Background Color Text</label>
                                    <input type="color" id="favColorBackground"
                                           className="form-control"
                                           onChange={(e) => this.setState({backgroundColorText: e.target.value})}
                                    />

                                </div>

                                <div className='d-flex mt-3'>
                                    <a href="#" className="btn btn-default btn-outline-dark d-block mr-3"
                                       onClick={(e) => {
                                           e.preventDefault();
                                           this._undo();
                                       }}><i className="fas fa-undo"></i></a>

                                    <a href="#" className="btn btn-default btn-outline-dark d-block mr-3"
                                       onClick={(e) => {
                                           e.preventDefault();
                                           this._redo();
                                       }}><i className="fas fa-redo"></i></a>

                                    <a href="#" className="btn btn-default btn-outline-dark d-block mr-3"
                                       onClick={(e) => {
                                           e.preventDefault();
                                           this._sketch.copy();
                                       }}><i className="fas fa-copy"></i></a>

                                    <a href="#" className="btn btn-default btn-outline-dark d-block mr-3"
                                       onClick={(e) => {
                                           e.preventDefault();
                                           this._sketch.paste();
                                       }}><i className="fas fa-paste"></i></a>

                                    <a href="#" className="btn btn-default btn-outline-dark d-block mr-3"
                                       onClick={(e) => {
                                           e.preventDefault();
                                           this._removeSelected();
                                       }}>Delete</a>

                                    <a href="#" className="btn btn-default btn-outline-dark d-block mr-3"
                                       onClick={(e) => {
                                           e.preventDefault();
                                           this._clear();
                                       }}>Clear</a>

                                    <a href="#" className="btn btn-default btn-outline-dark d-block mr-3"
                                       onClick={(e) => {
                                           e.preventDefault();
                                           this._save();
                                       }}>Save</a>

                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" placeholder="Enter Url"
                                           onChange={(e) => this.setState({imageUrl: e.target.value})}
                                           value={imageUrl}/>
                                    <a href="#" className="btn btn-primary mt-2"
                                       onClick={(e) => {
                                           e.preventDefault();
                                           this._sketch.addImg(this.state.imageUrl)
                                       }}>Load Image from URL</a>
                                </div>
                                <div className="border-top">
                                    <label htmlFor="">Tool digital</label>
                                    <div>
                                        <a href="#" className="btn btn-primary mt-2"
                                           onClick={(e) => {
                                               e.preventDefault();
                                               this._sketch.addImg(this.state.imageProtractor)
                                           }}>Get
                                            Protractor</a>
                                        <a href="#" className="btn btn-primary mt-2"
                                           onClick={(e) => {
                                               e.preventDefault();
                                               this._sketch.addImg(this.state.imageTriangle)
                                           }}>Get
                                            Triangle</a>
                                    </div>
                                </div>
                                <div>
                                    <DropZone
                                        accept='image/*'
                                        multiple={false}
                                        onDrop={this._onBackgroundImageDrop}>
                                        Try dropping an image here,<br/>
                                        or click<br/>
                                        to select image as background.
                                    </DropZone>
                                </div>
                                {/*<a href="#" onClick={(e) => {*/}
                                {/*    e.preventDefault();*/}
                                {/*    this._sketch.addVideo();*/}
                                {/*}}>Add video</a>*/}
                            </div>
                        </div>
                    </>
                </IonContent>
            </IonPage>
        )
    }
}

function Tab1() {
    return <SketchFieldDemo></SketchFieldDemo>;
}

export default Tab1;
