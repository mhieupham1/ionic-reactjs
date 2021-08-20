import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React from 'react';
import SketchField from '../components/react-sketch/components/SketchField';
import Tools from '../components/react-sketch/tools';
import DropZone from 'react-dropzone';
import axios from 'axios';

import './Tab1.css';

// declare global {
//   interface fabric {
//     interface Canvas {
//       _onTouchStart(options?: any, callback?: Function): any;
//     }
//   }
// }

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
        displayMenuSelected: 'none'
      }
    }

    componentDidMount = () => {
      this._sketch.enableTouchScroll();
      this._sketch.getDatabase();
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
      console.log(this._sketch.toDataURL());
      Link.setAttribute('href', this._sketch.toDataURL());
      Link.setAttribute('download', 'abc.png');
      Link.click()
      drawings.push(this._sketch.toDataURL());
      this.setState({ drawings: drawings });
    };

    _onBackgroundImageDrop = (accepted: any /*, rejected */) => {
      if (accepted && accepted.length > 0) {
        const sketch = this._sketch;
        const reader = new FileReader();
        const { stretched, stretchedX, stretchedY, originX, originY } = this.state;
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
        default:
          tool = Tools.Pencil
      }
      this.setState({ tool: tool })
    }

    handleChangeColor = (color: any) => {
      this.setState({ lineColor: color })
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

    showMenu = (e:any) => {
      this.setState({
        menuPositionX: e.e.offsetX,
        menuPositionY: e.e.offsetY,
        displayMenuSelected: 'block',
        menuFontSize: e.selected[0].fontSize,
        menuFontColor: e.selected[0].fill === 'black' ? '#000000' : e.selected[0].fill
      });
    }

    hideMenu = (e:any) => {
      this.setState({
        displayMenuSelected: 'none'
      })
    }

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
        displayMenuSelected
      } = this.state
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
                                    // onChange={(c: any) => {
                                    //   const data = this._sketch._fc._objects;
                                    //   this._sketch2._fc._objects = this._sketch._fc._objects
                                    //   this._sketch.saveDatabase();
                                    // }}

                                />
                                <div className="border" style={{ position: 'absolute', top: menuPositionY + 10, left: menuPositionX, display: displayMenuSelected }}>
                                    <div className="form-group">
                                        <label htmlFor="">Font-size</label>
                                        <input type="number" className="form-control" value={menuFontSize} onChange={(e:any) => {
                                          if (!(e.target.value === '' && e.target.value === 0)) {
                                            this.setState({
                                              menuFontSize: e.target.value
                                            });
                                            this._sketch.updateText({
                                              fontSize: e.target.value
                                            })
                                          }
                                        }
                                        } />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Color</label>
                                        <input type="color" className="form-control" value={menuFontColor} onChange={(e:any) => {
                                          this.setState({
                                            menuFontColor: e.target.value
                                          });
                                          this._sketch.updateText({
                                            fill: e.target.value
                                          })
                                        }
                                        } />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="border-bottom">
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
                                              this.setState({ lineWidth: parseInt(e.target.value) })
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
                                            }} className="btn btn-primary"><i
                                                className="fas fa-search-minus"></i></a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Text</label>
                                        <div className="d-flex ">
                                            <input placeholder="Input text" className="form-control mr-2" value={text}
                                                   onChange={(e) => this.setState({ text: e.target.value })} type="text"/>
                                            <input placeholder="Font size" className="form-control mr-2"
                                                   value={fontSizeText}
                                                   onChange={(e) => this.setState({ fontSizeText: e.target.value })}
                                                   type="text"/>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Font Style</label>
                                            <select name="" id="" className="form-control"
                                                    onChange={(e) => this.setState({ fontFamilyType: e.target.value })}>
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
                                                    this.setState({ fontWeightText: 'bold' })
                                                  } else {
                                                    this.setState({ fontWeightText: '100' })
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
                                                    this.setState({ textUnderline: true })
                                                  } else {
                                                    this.setState({ textUnderline: false })
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
                                                    this.setState({ rememberText: '#85ff00' })
                                                  } else {
                                                    this.setState({ rememberText: 'transparent' })
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
                                                    this.setState({ isTextDirection: true })
                                                  } else {
                                                    this.setState({ isTextDirection: false })
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
                                           onChange={(e) => this.setState({ lineColor: e.target.value })}
                                    >
                                    </input>
                                    <label htmlFor="">Background Color Text</label>
                                    <input type="color" id="favColorBackground"
                                           className="form-control"
                                           onChange={(e) => this.setState({ backgroundColorText: e.target.value })}
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
                                           onChange={(e) => this.setState({ imageUrl: e.target.value })}
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
                                <a href="#" onClick={(e) => {
                                  e.preventDefault();
                                  this._sketch.addVideo();
                                }}>Add video</a>
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