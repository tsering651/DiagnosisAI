from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import numpy as np

model_path = './Models/chest_xray_model.h5'
model = load_model(model_path)

def predict_pneumonia(img):
    img = img.resize((150, 150))
    img_array = image.img_to_array(img)
    if img_array.ndim == 3 and img_array.shape[-1] == 3:
        img_array = np.dot(img_array[..., :3], [0.2989, 0.5870, 0.1140])

    img_array = np.expand_dims(img_array, axis=0) / 255.0


    prediction = model.predict(img_array)
    return prediction
