import React from "react";

const CustomFileUpload = ({onChange}) => (
  <div className="custom-file mb-3">
    <input type="file" onChange={onChange} className="custom-file-input" id="customFile2" />
    <label className="custom-file-label" htmlFor="customFile2">
      Choose file...
    </label>
  </div>
);

export default CustomFileUpload;
