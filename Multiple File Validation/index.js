const file = document.querySelector("#file");

// For Image Preview
const ImagePreview = document.getElementById("imagePreview");

// For File Size
const FileSize = document.querySelector("#fileSize");

// valid extensions which can be uploaded.
let validExtensions = ["png", "gif", "jpg"];

// list of the selected files.
let fileList = [];

// list of extensions of the selected files.
let fileExtensions = [];

// checking if the extensions are valid
let validFiles = [];

const listOfFiles = () => {
  // pushing the name of each file to the "fileList" array
  for (let i = 0; i <= file.files.length - 1; i++) {
    fileList.push(file.files[i].name);
  }

  // pushing file extensions to the "fileExtensions" array
  for (const elem of fileList) {
    let extension = elem.split(".").pop();
    fileExtensions.push(extension);
  }
};

file.addEventListener("change", listOfFiles);

/**********************************************************************************/

// To return a boolean array for valid and invalid files.
const fileTypeVerification = () => {
  // Accquiring the each element of the "fileExtensions" array
  for (let i = 0; i < fileExtensions.length; i++) {
    const element = fileExtensions[i];
    let result;

    // Accquiring each element of the "validExtensions" array
    // and verifying if each extension of the "fileExtensions" array
    // matches with atleast one element of the "validExtensions" array
    for (const currElem of validExtensions) {
      if (element == currElem) {
        result = true;
      }
    }

    // Assinging "false"/"true" value in the "validFiles" array,
    // respectively to each element in the "fileExtensions" array
    if (result != true) {
      // This code is executed if the value of "result" is not "true";
      result = false;
      validFiles.push(result);
    } else {
      // This code is executed if the value of "result" is "true";
      result = true;
      validFiles.push(result);
    }
  }
};

file.addEventListener("change", fileTypeVerification);

/**********************************************************************************/

// To verify if the selected files are valid
const file_validity = () => {
  // To check if the "validFiles" array inclues any false value
  let result = validFiles.includes(false);

  // To reset the Image Preview every time new files are selected
  if (ImagePreview.hasChildNodes() == true) {
    const image = document.getElementsByClassName("image");
    for (const element of image) {
      element.remove();
    }
    image[0].remove();

    var lineBreak = document.getElementsByTagName("br");
    for (const element of lineBreak) {
      element.remove();
    }
    lineBreak[0].remove();
  }

  if (result != true) {
    // This is displayed if the "validFiles" array has only "true" value

    // Image Preview
    for (let i = 0; i < validFiles.length; i++) {
      let reader = new FileReader();

      reader.onload = function () {
        const img = new Image();
        const Result = (img.src = reader.result);

        document.getElementById("imagePreview").innerHTML = `${
          document.getElementById("imagePreview").innerHTML
        }${`<img src= '${Result}' class='image'/>`}<br/>`;
      };
      reader.readAsDataURL(file.files[i]);
    }
  } else {
    // This is displayed if the "validFiles" array has any 'false' value
    // Invalid file output
    let validFileExtensions = validExtensions.toString();
    alert(`You can only upload "${validFileExtensions}" type of files`);
    file.value = "";
  }
};

file.addEventListener("change", file_validity);

/**********************************************************************************/

const fileSize = () => {
  // To reset the FileSize Preview every time new files are selected
  // and when no files are selected.
  if (FileSize.hasChildNodes() == true) {
    FileSize.childNodes[0].remove();
  }

  // This piece of code is executed when one or more files are selected;
  if (file.files.length > 0) {
    let totalSize = 0;

    // Looping through each file catching the size of each file
    for (let i = 0; i < file.files.length; i++) {
      // Assigning the size value of each file into "totalSize",
      // thereby increasing the value of "totalSize",
      // which represents the total size of all the files
      totalSize += file.files[i].size;
    }

    // In the browser all sizes are represented in the form of bytes.
    // So, we convert it into kb, mb, or gb
    let convertedSize = (totalSize / (1024 * 1024)).toFixed(2);

    // Verifying if the total fileSize is less than 10mb
    if (convertedSize < 10) {
      FileSize.innerHTML = `Total Size: ${convertedSize} MB`;
    } else {
      alert("You can only select files upto the size of 10 mb");
      file.value = "";
    }
  }
};

file.addEventListener("change", fileSize);
