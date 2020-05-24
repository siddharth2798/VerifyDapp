function upload() {
  //let storage = window.localStorage;

  const reader = new FileReader();

  reader.onloadend = function () {
    const ipfs = window.IpfsApi("localhost", 5001); // Connect to IPFS
    const buf = buffer.Buffer(reader.result); // Convert data into buffer
    ipfs.files.add(buf, (err, result) => {
      // Upload buffer to IPFS
      if (err) {
        console.error(err);
        return;
      }

      hash = result[0].hash;
     
      
      
      var caseno = document.getElementById('caseno').value;
      var location = document.getElementById('location').value;
      
      detailHash = sha256(caseno+location+hash);
      
      if (detailHash != '')
      	document.getElementById("ipfsHash").innerHTML = 'Hash Generated';
    });
  }
  const photo = document.getElementById("photo");
  reader.readAsArrayBuffer(photo.files[0]); //Read Provided File
}
