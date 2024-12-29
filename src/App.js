import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(false);


  const generateQRButton = () => {
    setLoading(true);
    if (!name || !email || !size ) {
       alert("Please enter the values")
        setLoading(false);
        return;
      }
    const data = `Name: ${name}, Email: ${email}`;
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    data
    )}`;
    setImg(url);

    setLoading(false);
    }

  const downloadQRCode = () => {
    if (img) {
      const link = document.createElement("a");
      link.href = img;
      link.download = "QRCode.png";
      link.click();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <h1 className="text-center mb-4">QR CODE GENERATOR</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="nameinput" className="form-label">
              Name
            </label>
            <input
              id="nameinput"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailinput" className="form-label">
              Email
            </label>
            <input
              id="emailinput"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sizeinput" className="form-label">
              Enter image size (e.g., 150 for 150x150)
            </label>
            <input
              id="sizeinput"
              type="text"
              placeholder="Enter image size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary me-2"
              onClick={generateQRButton}
            >
              Generate QR code
            </button>
            {img && (
              <button
                type="button"
                className="btn btn-success"
                onClick={downloadQRCode}
              >
                Download QR code
              </button>
            )}
          </div>
        </form>
        {loading && (
          <div className="text-center mt-3">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {img && <img src={img} alt="Generated QR Code" className="img-fluid mt-4 mx-auto d-block" style={{ maxWidth: "300px" }} />}
      </div>
    </div>
  );
}

export default App;
