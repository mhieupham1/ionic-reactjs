import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { SketchField } from '../react-sketch';
import tools from '../react-sketch/tools';
const ReactGridLayout = WidthProvider(RGL);

export default class DynamicMinMaxLayout extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    // items: 8,
    // rowHeight: 50,
    onLayoutChange: function () { },
    // cols: 5
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout, isLock: false };
  }

  generateDOM() {
    const urlFile = 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf';
    const fileDoc = 'https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc'
    const fileXls = 'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_10.xls'
    const filePPT = 'https://file-examples-com.github.io/uploads/2017/08/file_example_PPT_250kB.ppt'
    const fileVideo = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4'
    const fileImage = 'https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_100kB.jpg'
    // return _.map(_.range(this.props.items), function (i) {
    //   if (i === 0) {
    //     return <div key={i} style={{ padding: '10px' }}>
    //       <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
    //         src={`http://docs.google.com/gview?url=${fileDoc}&embedded=true`}></iframe>
    //     </div>
    //   } else if (i === 1) {
    //     return <div key={i} style={{ padding: '10px' }}>
    //       <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
    //         src={`http://docs.google.com/gview?url=${urlFile}&embedded=true`}></iframe>
    //     </div>
    //   } else if (i === 2) {
    //     return <div key={i} style={{ padding: '10px' }}>
    //       <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
    //         src={`http://docs.google.com/gview?url=${fileXls}&embedded=true`}></iframe>
    //     </div>
    //   } else if (i === 3) {
    //     return <div key={i} style={{ padding: '10px' }}>
    //       <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
    //         src={`http://docs.google.com/gview?url=${filePPT}&embedded=true`}></iframe>
    //     </div>
    //   } else if (i === 4) {
    //     return <div key={i} style={{ padding: '10px' }}>
    //       <video style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
    //         controls
    //         src={fileVideo}></video>
    //     </div>
    //   } else if (i === 5) {
    //     return <div key={i} style={{ padding: '10px' }}>
    //       <SketchField width={350}
    //         height={350}
    //         tool={tools.Pencil}
    //         lineColor={'black'}
    //         lineWidth={10}
    //         isErase={false}
    //       />
    //     </div>
    //   } else {
    //     return <div key={i} style={{ padding: '10px' }}>
    //       <img style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
    //         src={fileImage}></img>
    //     </div>
    //   }
    // });
  }

  generateLayout() {
    const p = this.props;
    // return _.map(new Array(p.items), function (item, i) {
    //   const y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
    //   return {
    //     x: (i * 2) % 12,
    //     y: Math.floor(i / 6) * y,
    //     w: 2,
    //     h: y,
    //     i: i.toString()
    //   };
    // });
  }

  onLayoutChange(layout) {
    // this.props.onLayoutChange(layout);
  }

  lockMe = () => {
    this.setState({ isLock: !this.state.isLock })
  }

  render() {
    const urlFile = 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf';
    const fileDoc = 'https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc'
    const fileXls = 'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_10.xls'
    const filePPT = 'https://file-examples-com.github.io/uploads/2017/08/file_example_PPT_250kB.ppt'
    const fileVideo = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4'
    const fileImage = 'https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_100kB.jpg'
    const { isLock } = this.state
    return (
      <ReactGridLayout
        // layout={this.state.layout}
        className="layout"
        onLayoutChange={this.onLayoutChange}
        rowHeight={30}
        {...this.props}
      >
         <div key={6} style={{ padding: '10px', overflow: 'hidden', backgroundColor: 'blue' }}
         data-grid={{ x: 0, y: 2, w: 2, h: 3, static: isLock }}>
           <button onClick={() => this.lockMe()}>{isLock ? 'Lock me' : 'unlock me'}</button>
          <SketchField width={'550px'}
            height={'550px'}
            tool={tools.Pencil}
            lineColor={'black'}
            lineWidth={10}
            isErase={false}
          />
        </div>
        <div key={1} style={{ padding: '10px' }} data-grid={{ x: 0, y: 0, w: 2, h: 3 }}>
          <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            src={`http://docs.google.com/gview?url=${fileDoc}&embedded=true`}></iframe>
        </div>
        <div key={2} style={{ padding: '10px' }} data-grid={{ x: 2, y: 0, w: 4, h: 3, static: true }}>
          <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            src={`http://docs.google.com/gview?url=${urlFile}&embedded=true`}></iframe>
        </div>
        <div key={3} style={{ padding: '10px' }} data-grid={{ x: 6, y: 0, w: 2, h: 3 }}>
          <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            src={`http://docs.google.com/gview?url=${fileXls}&embedded=true`}></iframe>
        </div>
        <div key={4} style={{ padding: '10px' }} data-grid={{
          x: 8,
          y: 0,
          w: 4,
          h: 3,
        }}>
          <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            src={`http://docs.google.com/gview?url=${filePPT}&embedded=true`}></iframe>
        </div>
        <div key={5} style={{ padding: '10px' }} data-grid={{ x: 6, y: 1, w: 2, h: 3 }}>
          <video style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            controls
            src={fileVideo}></video>
        </div>

        <div key={7} style={{ padding: '10px' }} data-grid={{ x: 0, y: 1, w: 2, h: 3 }}>
          <img style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            src={fileImage}></img>
        </div>
      </ReactGridLayout>
    );
  }
}
