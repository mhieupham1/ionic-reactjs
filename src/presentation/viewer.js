let data = ''

const _presentation = {
  connection: null,
  loading: true
};

const _ui = {
  viewer: null,
  current: null,
  previous: null
};

const imageLoaded = () => {
  _ui.current.removeEventListener('animationend', imageLoaded);
  if (_ui.previous) {
    _ui.viewer.removeChild(_ui.previous);
  }
  _presentation.loading = false;
  _presentation.connection.send('loaded');
};

const changeImage = evt => {
  console.log(evt.data);
  data = evt.data;
  return evt.data;
  if (!_presentation.loading && evt.data === 'change') {
    _presentation.loading = true;
    // loadImage();
  }
};

const connectionFound = connection => {
  console.log('connectionFound');
  _presentation.connection = connection;
  _presentation.connection.addEventListener('message', changeImage);
  // loadImage();
};

console.log('a');

const getConnect = () => {
  console.log('getConnect');
  console.log(navigator.presentation);

  if (navigator.presentation && navigator.presentation.receiver) {
    const list = navigator.presentation.receiver.connectionList;
    if (list.connections.length > 0) {
      connectionFound(list.connections[0]);
      return list.connections[0];
    } else {
      list.addEventListener('connectionavailable', evt => {
        if (!_presentation.connection) {
          connectionFound(evt.connection);
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // _ui.viewer = document.getElementById('viewer');
  console.log('DOMContentLoaded')
  if (navigator.presentation && navigator.presentation.receiver) {
    const list = await navigator.presentation.receiver.connectionList;
    console.log(list);
    if (list.connections.length > 0) {
      connectionFound(list.connections[0]);
    } else {
      list.addEventListener('connectionavailable', evt => {
        if (!_presentation.connection) {
          connectionFound(evt.connection);
        }
      });
    }
  }
});

export default {
  _presentation,
  _ui,
  imageLoaded,
  changeImage,
  connectionFound,
  navigator,
  getConnect
}
