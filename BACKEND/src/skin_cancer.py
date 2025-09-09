import cv2

import os

import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model

#model = tf.keras.models.load_model('./Models/skin_cencer_model.keras')
import os


# Get the absolute path of the current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Construct the full path to the model
MODEL_PATH = os.path.join(BASE_DIR, "Models", "skin_cencer_model.keras")

# Load the model
model = load_model(MODEL_PATH)

def skin_cancer_classification(img):
    img_resized = cv2.resize(img, (28, 28))
    result = model.predict(img_resized.reshape(1, 28, 28, 3))
    class_ind = np.argmax(result)
    return class_ind
