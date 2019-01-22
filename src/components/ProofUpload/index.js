import React from 'react';
import { string, func } from 'prop-types';
import { Icon } from 'semantic-ui-react';

const ProofUpload = ({ onSubmit, displayProof, file = null, error = null }) => {
  let fileInput = null, fileType = '';
  if (file) fileType = file.charAt(file.length - 1) === '4' ? 'video' : 'image';

  const onUploadSubmit = e => {
    e.preventDefault();
    if (fileInput.files.length > 0) onSubmit(fileInput.files[0]);
    if (e.dataTransfer && e.dataTransfer.files.length > 0) onSubmit(e.dataTransfer.files[0]);
  };

  const preventDefault = e => {
    e.preventDefault();
  };

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
          aria-label='close proof'
        >
          X
        </span>
      </h4>
      {(file && !error) && <span className='proof__card-success'><Icon name={`file ${fileType}`} />{file}</span>}
      <span className='screenreader-only'>{file}</span>
      {error && <span className='proof__card-error'><Icon name='exclamation circle' />{error}</span>}
      <span className='screenreader-only'>{error}</span>
      <form onDragEnter={preventDefault} onDragLeave={preventDefault} onDragOver={preventDefault} onDrop={onUploadSubmit}>
        <input 
          onChange={onUploadSubmit} 
          type='file' 
          id='proof' 
          name='proof' 
          accept='.jpg, .png, .mp4' 
          ref={input => fileInput = input}
        />
        <label htmlFor='proof'>Drag files here or <span>Browse</span></label>
      </form>
    </div>
  )
}

ProofUpload.propTypes = {
  onSubmit: func.isRequired,
  displayProof: func.isRequired,
  file: string,
  error: string
}

export default ProofUpload;



