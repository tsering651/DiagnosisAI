import cv2
import numpy as np
from tensorflow.keras.models import load_model

model = load_model("./Models/lung_cancer_model.h5")

def predict_lung_cancer(image):
    print("Lung cancer image shape ", image.shape)
    
    # Check if the image has 4 channels
    if image.shape[2] == 4:
        # Convert RGBA image to RGB
        image = cv2.cvtColor(image, cv2.COLOR_RGBA2RGB)

    # Resize the image to (64, 64) and normalize pixel values
    image = cv2.resize(image, (64, 64)) / 255.0
    
    # Expand dimensions to match model input shape
    image = np.expand_dims(image, axis=0)
    
    # Make predictions
    class_probabilities = model.predict(image)
    
    # Get the predicted class index
    predicted_class_index = np.argmax(class_probabilities)
    
    return predicted_class_index

