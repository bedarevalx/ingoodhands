import React from 'react';
import axios from 'axios';

function DragField() {
  const [drag, setDrag] = React.useState(false);
  const [pictureState, setPictureState] = React.useState('');
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }
  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }
  async function onClickDownload(e) {
    const response = await axios.get(
      'https://polar-eyrie-91847.herokuapp.com/picture.jpeg',
    );
    console.log(response);
    setPictureState(response.data);
  }
  function onDropHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    let files = [...e.dataTransfer.files];
    formData.append('file', files[0]);
    toBase64(files[0])
      .then((result) => {
        console.log(result);
        axios
          .post('https://polar-eyrie-91847.herokuapp.com/api/load_image', {
            image: result.slice(23),
          })
          .then((response) => console.log(response));
      })
      .catch((error) => console.log(error));
    setDrag(false);
  }
  return (
    <>
      {drag ? (
        <div
          className='dnd-field'
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}>
          Отпустите файлы чтобы загрузить
        </div>
      ) : (
        <div
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}>
          Перетащите файлы сюда
        </div>
      )}
      <button onClick={(e) => onClickDownload(e)}>Загрузить картинку</button>
      <img
        source={{ uri: `data:image/png;base64,${pictureState}` }}
        style={{ height: 50, width: 50 }}
      />
    </>
  );
}

export default DragField;
