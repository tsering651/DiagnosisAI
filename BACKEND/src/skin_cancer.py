import cv2

import os

import tensorflow as tf
import numpy as np

model = tf.keras.models.load_model('./Models/skin_cencer_model.keras')

def skin_cancer_classification(img):
    img_resized = cv2.resize(img, (28, 28))
    result = model.predict(img_resized.reshape(1, 28, 28, 3))
    class_ind = np.argmax(result)
    return class_ind
