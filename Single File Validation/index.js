// Validating file in a file upload.

let file = document.getElementById("file");

/* FileType Validation */
const FileTypeValidation = () => {
  // Valid file extensions
  let validExtensions = ["jpeg", "jpg", "png", "gif"];

  // Extension of the chosen file
  let fileExtension = file.value.split(".").pop();

  // Checking if the chosen is valid
  const validFile = () => {
    for (const elem of validExtensions) {
      if (elem == fileExtension) {
        return true;
      }
    }
  };
  let extension = validFile();

  // Creating a preview of the selected image
  const imagePreview = () => {
    let reader = new FileReader();
    reader.onload = function (e) {
      let path = document.getElementById("imagePreview");
      path.innerHTML = `
          <img src= '${e.target.result}'/>
          `;
    };
    reader.readAsDataURL(file.files[0]);
  };

  if (extension == true) {
    // Image Preview
    imagePreview();
  } else {
    // Error for invalid file types
    const result = validExtensions.toString();
    alert(`you can only enter ${result} type of files`);
    file.value = "";
  }
};

file.addEventListener("change", FileTypeValidation);

/* FileSize Validation */
const FileSize = () => {
  let fileSize = (file.files[0].size / (1024 * 1024)).toFixed(2);
  document.getElementById("fileSize").innerHTML = fileSize + " mb";
};

file.addEventListener("change", FileSize);
