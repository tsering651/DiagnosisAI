import os
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import traceback

from werkzeug.utils import secure_filename

from brain_tumor import process_brain_tumor_diagnosis
from pneumonia import predict_pneumonia
from lung_cancer import predict_lung_cancer
from skin_cancer import skin_cancer_classification

from utils.gradcam import make_gradcam_heatmap
from utils.overlay import overlay_heatmap

#app = Flask(__name__)
app = Flask(__name__, static_url_path='/static', static_folder='static')

CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/home')
def start():
    return "code is working"

@app.route('/diagnose', methods=['POST'])
def diagnose():
    if 'image' not in request.files or 'type' not in request.form:
        return jsonify({'error': 'Missing image or type data'}), 400

    image = request.files['image']
    diagnosis_type = request.form['type']

    if image.filename == '' or not image.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return jsonify({'error': 'Invalid image file'}), 400

    filename = secure_filename(image.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    image.save(filepath)

    result = None
    gradcam_url = None

    try:
        if diagnosis_type == 'type1':  # Brain Tumor
            result, gradcam_path = process_brain_tumor_diagnosis(np.array(Image.open(filepath)), save_path=filepath)
            return jsonify({
                'result': float(result),
                'heatmap_url': f"/{gradcam_path}"
            }), 200

        elif diagnosis_type == 'type2':  # Lung Cancer
            result = predict_lung_cancer(np.array(Image.open(filepath)))

        elif diagnosis_type == 'type3':  # Pneumonia
            result = predict_pneumonia(Image.open(filepath))

        elif diagnosis_type == 'type4':  # Skin Cancer
            result = skin_cancer_classification(np.array(Image.open(filepath)))

        else:
            return jsonify({'error': 'Invalid diagnosis type'}), 400

        return jsonify({
            'result': result.tolist() if hasattr(result, 'tolist') else result,
            'heatmap_url': gradcam_url
        }), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
