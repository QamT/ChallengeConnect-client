import React from 'react';
import { Icon } from 'semantic-ui-react';

export default ({ onSubmit, file, displayProof, error }) => {
  let fileInput = null;

  const onUploadSubmit = e => {
    e.preventDefault();
    if (fileInput.files.length) onSubmit(fileInput.files[0]);
    if (e.dataTransfer && e.dataTransfer.files.length) onSubmit(e.dataTransfer.files[0]);
  };

  const preventDefault = e => {
    e.preventDefault();
  };
  
  let fileType = '';
  if (file) fileType = file.charAt(file.length - 1) === '4' ? 'video' : 'image';

  return (
    <div className='proof__card-upload'>
      <h4>
        Upload Proof 
        <span 
          className='proof__card-close' 
          onClick={displayProof} 
          onKeyDown={displayProof} 
          tabIndex='0' 
          title='close proof'
        >
          X
        </span>
      </h4>
      {(file && !error) && <span className='proof__card-success'><Icon name={`file ${fileType}`} />{file}</span>}
      {error && <span className='proof__card-error'><Icon name='exclamation circle' />{error}</span>}
      <form onDragEnter={preventDefault} onDragLeave={preventDefault} onDragOver={preventDefault} onDrop={onUploadSubmit}>
        <input 
          onChange={onUploadSubmit} 
          type='file' 
          id='proof' 
          name='proof' 
          accept='.jpg, .png, .mp4' 
          ref = {input => fileInput = input}
        />
        <label htmlFor='proof'>Drag files here or <span>Browse</span></label>
      </form>
    </div>
  )
}


