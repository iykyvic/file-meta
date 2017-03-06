const display = (fileSizes) => {
  for (let file in fileSizes) {
    table.innerHTML += `
      <tr>
        <th>${file}</th>
        <th>${fileSizes[file].size}</th>
      </tr>`;
  }
};

const upload = () => {
  const files = document.getElementById('files');
  const error = document.getElementById('error');
  const table = document.getElementById('table');
  if(files.value.length === 0) {
    table.style.visibility = "hidden";
    error.innerHTML = '<span style="color: red">please upload a file</span>';
  } else {
    error.innerHTML = '';
    const allFiles = {};
    for (let file of files.files) {
      allFiles[file.name] =  { size: file.size };
    }

    const request = new XMLHttpRequest();
    request.open("POST", '/upload', true);
    request.setRequestHeader("content-type", "application/json");

    request.onerror = function (e) {
      error.innerHTML = request.statusText;
    };

    request.onreadystatechange = () => {
      if(request.readyState == 4 && request.status == 200) {
        const fileSizes = JSON.parse(request.responseText).data;
        display(fileSizes);
        table.style.visibility = "visible";
        files.value = '';
      }
    };

    request.send(JSON.stringify(allFiles));
  }
};

window.onload = () => {
  table.style.visibility = "hidden";
};