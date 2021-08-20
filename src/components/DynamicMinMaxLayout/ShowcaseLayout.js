import React from "react";
import PropTypes from "prop-types";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class ShowcaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBreakpoint: "lg",
      compactType: "vertical",
      mounted: false,
      layouts: { lg: props.initialLayout }
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM() {
    const urlFile = `https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf`;
    const fileDoc = `https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc`
    const fileXls = `https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_10.xls`
    const filePPT = `https://file-examples-com.github.io/uploads/2017/08/file_example_PPT_250kB.ppt`
    const fileVideo = `https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4`
    const fileImage = `https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_100kB.jpg`
    return _.map(this.state.layouts.lg, function (l, i) {
      if (i == 0) {
        return <div key={i} style={{ padding: '10px' }}>
          <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            src={`http://docs.google.com/gview?url=${fileDoc}&embedded=true`}></iframe>
        </div>
      } else if (i == 1) {
        return <div key={i} style={{ padding: '10px' }}>
          <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            src={`http://docs.google.com/gview?url=${urlFile}&embedded=true`}></iframe>
        </div>
      } else if (i == 2) {
        return <div key={i} style={{ padding: '10px' }}>
          <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            src={`http://docs.google.com/gview?url=${fileXls}&embedded=true`}></iframe>
        </div>
      } else if (i == 3) {
        return <div key={i} style={{ padding: '10px' }}>
          <iframe style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            src={`http://docs.google.com/gview?url=${filePPT}&embedded=true`}></iframe>
        </div>
      } else if (i == 4) {
        return <div key={i} style={{ padding: '10px' }}>
          <video style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            controls
            src={fileVideo}></video>
        </div>
      } else {
        return <div key={i} style={{ padding: '10px' }}>
          <img style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}
            src={fileImage}></img>
        </div>
      }
    });

  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onCompactTypeChange() {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
          ? null
          : "horizontal";
    this.setState({ compactType });
  }

  onLayoutChange(layout, layouts) {
    this.props.onLayoutChange(layout, layouts);
  }

  onNewLayout() {
    this.setState({
      layouts: { lg: generateLayout() }
    });
  }

  render() {
    return (
      <div>
        <div>
          Current Breakpoint: {this.state.currentBreakpoint} ({
            this.props.cols[this.state.currentBreakpoint]
          }{" "}
          columns)
        </div>
        <div>
          Compaction type:{" "}
          {_.capitalize(this.state.compactType) || "No Compaction"}
        </div>
        <button onClick={this.onNewLayout}>Generate New Layout</button>
        <button onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button>
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

ShowcaseLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired
};

ShowcaseLayout.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function () { },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  initialLayout: generateLayout()
};

function generateLayout() {
  return _.map(_.range(0, 25), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}
