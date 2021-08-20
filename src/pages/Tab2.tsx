import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

class PdfDemo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 2,
      file: './get_start.pdf'
    }
  }

    onFileChange = (event:any) => {
      this.setState({ file: event.target.files[0] });
    }

    render() {
      const { numPages, pageNumber, file } = this.state
      return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <div className="Example">
                        <header>
                            <h1>react-pdf sample page</h1>
                        </header>
                        <div className="Example__container">
                            <div className="Example__container__load">
                                <label htmlFor="file">Load from file:</label>
                                {' '}
                                <input
                                    onChange={(e) => this.onFileChange(e)}
                                    type="file"
                                />
                            </div>
                            <div className="Example__container__document">
                                <Document
                                    file={file}
                                    onLoadSuccess={(e) => {
                                      this.setState({ numPages: e._pdfInfo.numPages });
                                    }}
                                    options={options}
                                >
                                    <Page pageNumber={pageNumber} />
                                </Document>
                                <p>Page {pageNumber} of {numPages}</p>
                                <a href="#" onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({ pageNumber: pageNumber - 1 })
                                }}>Prev Page</a>
                                <a href="#" onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({ pageNumber: pageNumber + 1 })
                                }}>Next Page</a>
                            </div>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
      )
    }
}

function Tab2() {
  return <PdfDemo></PdfDemo>;
}

export default Tab2;
