import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import the service file since we need it to send/get the data to/from the server
import service from "../../services/file-upload.service";
 
function AddMovie (){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
 
  const navigate = useNavigate();
  
  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };
 
  // ********  this method submits the form ********
  const handleSubmit = (e) => {
    e.preventDefault();
 
    service
      .createMovie({ title, description, imageUrl })
      .then(res => {
        // console.log("added new movie: ", res);
 
        // Reset the form
        setTitle("");
        setDescription("");
        setImageUrl("");
      
        // navigate to another page
        navigate("/");
      })
      .catch(err => console.log("Error while adding the new movie: ", err));
  };
 
  return (
    <div>
      <h2>New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type="text" 
          name="title" 
          value={title} 
          required
          onChange={(e) => setTitle(e.target.value)}
        />
 
        <label>Description</label>
        <textarea 
          type="text"
          name="description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)} 
        />
 
        <input type="file" onChange={(e) => handleFileUpload(e)} required />
    
        <button type="submit">Save new movie</button>
      </form>
    </div>
  );
}
 
export default AddMovie;