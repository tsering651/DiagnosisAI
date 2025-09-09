import React, { useState } from 'react';

const DiagnosisForm = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [gradcamImage, setGradcamImage] = useState(null);

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
    const imageURL = URL.createObjectURL(image);
    setImagePreview(imageURL);
  };

  const handleTypeSelect = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage || !selectedType) {
      console.log('Please select an image and diagnosis type');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('type', selectedType);

      const response = await fetch('http://localhost:5000/diagnose', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to send data to backend');

      const responseData = await response.json();
      const { result, heatmap_url } = responseData;

      if (selectedType === 'type1') {
        let accuracyPercentage = (result * 100).toFixed(2);
        if (result <= 0.5) accuracyPercentage = 100 - accuracyPercentage;
        setDiagnosisResult(result > 0.5 ? '🧠 Brain tumor detected' : '🧠 Brain tumor not detected');
        setAccuracy(accuracyPercentage);
        setGradcamImage(`http://localhost:5000${heatmap_url}`);
      } else if (selectedType === 'type2') {
        const labels = ['adenocarcinoma', 'large_cell_carcinoma', 'normal', 'squamous_cell_carcinoma'];
        setDiagnosisResult(`🫁 ${labels[result]}`);
        setAccuracy(null);
        setGradcamImage(null);
      } else if (selectedType === 'type4') {
        const classLabels = {
          0: 'Actinic keratoses and intraepithelial carcinomae',
          1: 'Basal cell carcinoma',
          2: 'Benign keratosis-like lesions',
          3: 'Dermatofibroma',
          4: 'Melanocytic nevi',
          5: 'Pyogenic granulomas and hemorrhage',
          6: 'Melanoma',
        };
        setDiagnosisResult(`🩺 ${classLabels[result]}`);
        setAccuracy(null);
        setGradcamImage(null);
      } else if (selectedType === 'type3') {
        let accuracyPercentage = (result * 100).toFixed(2);
        if (result <= 0.5) accuracyPercentage = 100 - accuracyPercentage;
        setDiagnosisResult(result > 0.5 ? '🫁 Pneumonia detected' : '🫁 Pneumonia not detected');
        setAccuracy(accuracyPercentage);
        setGradcamImage(null);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden shadow-lg">
        {/* Left side with image */}
        <div className="w-1/2 hidden md:flex flex-col justify-center items-center bg-black p-4">
          <img
            src="./public/friendly-male-doctor.webp"
            alt="Diagnosis visual"
            className="rounded-lg shadow-lg max-h-[400px] object-cover"
          />
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 bg-black/70 text-white p-10 space-y-6">
          <h2 className="text-3xl font-bold text-white text-center">Diagnosis Info</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 text-sm bg-black border border-gray-600 rounded-lg"
              />
            </div>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="mt-2 w-full max-h-40 object-contain rounded-lg border border-gray-600"
              />
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Select Diagnosis Type</label>
              <select
                value={selectedType}
                onChange={handleTypeSelect}
                className="w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-lg"
              >
                <option value="">Select Diagnosis Type</option>
                <option value="type1">Brain Tumor Detection</option>
                <option value="type2">Lung Cancer Classification</option>
                <option value="type3">Pneumonia Detection</option>
                <option value="type4">Skin Cancer Classification</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition"
            >
              Submit
            </button>
          </form>

          {/* Diagnosis Result */}
          {diagnosisResult && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="font-semibold text-white">Diagnosis Result:</p>
              <p className="text-indigo-400">{diagnosisResult}</p>
              {accuracy !== null && (
                <>
                  <p className="mt-2 font-semibold text-white">Accuracy:</p>
                  <p className="text-green-400">{accuracy}%</p>
                </>
              )}
            </div>
          )}

          {/* Grad-CAM Visualization */}
          {gradcamImage && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Model Explanation (Grad-CAM):</h3>
              <img
                src={gradcamImage}
                alt="Grad-CAM Explanation"
                className="rounded-lg shadow-lg w-full max-h-[300px] object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisForm;
