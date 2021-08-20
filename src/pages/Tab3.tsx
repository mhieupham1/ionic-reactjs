import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import DynamicMinMaxLayout from '../components/DynamicMinMaxLayout/DynamicMinMaxLayout';
import ShowcaseLayout from '../components/DynamicMinMaxLayout/ShowcaseLayout';

// https://docs.google.com/document/d/1kfD4giJ96PdhEvD39JS7U-X1uce_zfSb4deLUFk7KTU/edit?usp=sharing
const urlFile = 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf';
const fileDoc = 'https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc'
const fileXls = 'https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_10.xls'
const filePPT = 'https://file-examples-com.github.io/uploads/2017/08/file_example_PPT_250kB.ppt'
const fileVideo = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4'
const fileImage = 'https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_100kB.jpg'
const MobileFile: React.FC = () => {
  const [layout, setlayout] = useState<any>()

  const onLayoutChange = (layout:any) => {
    setlayout({ layout: layout });
  }

  const stringifyLayout = () => {
    layout.map(function(l:any) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      );
    });
  }
  return (
  // <IonPage>
  //   <IonHeader>
  //     <IonToolbar>
  //       <IonTitle>Tab 3</IonTitle>
  //     </IonToolbar>
  //   </IonHeader>
  //   <IonContent fullscreen>
  //   <div className="Example__container__load">
  //                             <label htmlFor="file">Load from file:</label>
  //                             {' '}
  //                             <input
  //                                 onChange={(e) => onFileChange()}
  //                                 type="file"
  //                             />
  //                         </div>
  //     <div>
  //     <div style={{width:'100%', height:'500px'}}>
  //       <video style={{width: '100%', height:'100%', backgroundColor:'grey'}}
  //       controls
  //       src={fileVideo}></video>
  //     </div>
  //     <div style={{width:'100%', height:'300px'}}>
  //       <img style={{width: '100%', height:'100%', backgroundColor:'grey'}}
  //         src={fileImage}></img>
  //     </div>
  //     <div style={{width:'100%', height:'300px'}}>
  //       <iframe style={{width: '100%', height:'100%', backgroundColor:'grey'}}
  //       src={`http://docs.google.com/gview?url=${urlFile}&embedded=true`}></iframe>
  //     </div>
  //     <div style={{width:'100%', height:'300px'}}>
  //       <iframe style={{width: '100%', height:'100%', backgroundColor:'grey'}}
  //       src={`http://docs.google.com/gview?url=${fileDoc}&embedded=true`}></iframe>
  //     </div>
  //     <div style={{width:'100%', height:'300px'}}>
  //       <iframe style={{width: '100%', height:'100%', backgroundColor:'grey'}}
  //       src={`http://docs.google.com/gview?url=${fileXls}&embedded=true`}></iframe>
  //     </div>
  //     <div style={{width:'100%', height:'300px'}}>
  //       <iframe style={{width: '100%', height:'100%', backgroundColor:'grey'}}
  //       src={`http://docs.google.com/gview?url=${filePPT}&embedded=true`}></iframe>
  //     </div>

  //     </div>

    //   </IonContent>
    // </IonPage>
    // <DynamicMinMaxLayout/>
    <IonPage>
       <IonHeader>
         <IonToolbar>
           <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
       </IonHeader>
      <IonContent fullscreen>
    <div className = "ScrollStyle" style={{ backgroundColor: 'white' }}>
    {/* <div className="layoutJSON">
      Displayed as <code>[x, y, w, h]</code>:
      <div className="columns">{stringifyLayout}</div>
    </div> */}
    {/* <ShowcaseLayout onLayoutChange={onLayoutChange} /> */}
    <DynamicMinMaxLayout items={[]} />
  </div>
     </IonContent>
   </IonPage>
  );
};
function Tab3() {
  return <MobileFile></MobileFile>;
}
export default Tab3;
