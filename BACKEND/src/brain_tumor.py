import tensorflow as tf
from tensorflow.keras.layers import Conv2D, Input, ZeroPadding2D, BatchNormalization, Activation, MaxPooling2D, Flatten, Dense
from tensorflow.keras.models import load_model
from utils.gradcam import make_gradcam_heatmap
from utils.overlay import overlay_heatmap
from tensorflow.keras.callbacks import TensorBoard, ModelCheckpoint
import cv2
import imutils
import numpy as np
from os import listdir
import os

def crop_brain_contour(image):
    if len(image.shape) == 2:
        gray = image
    elif image.shape[2] == 1:
        gray = image[:, :, 0]
    else:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.threshold(gray, 45, 255, cv2.THRESH_BINARY)[1]
    thresh = cv2.erode(thresh, None, iterations=2)
    thresh = cv2.dilate(thresh, None, iterations=2)
    cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)

    if not cnts:
        print("[ERROR] No contours found!")
        return image

    c = max(cnts, key=cv2.contourArea)
    extLeft = tuple(c[c[:, :, 0].argmin()][0])
    extRight = tuple(c[c[:, :, 0].argmax()][0])
    extTop = tuple(c[c[:, :, 1].argmin()][0])
    extBot = tuple(c[c[:, :, 1].argmax()][0])
    new_image = image[extTop[1]:extBot[1], extLeft[0]:extRight[0]]
    return new_image

model = load_model('./Models/brain_tumor_detection_model.keras')

# def process_brain_tumor_diagnosis(image):
#     image=crop_brain_contour(image)
#     image = cv2.resize(image, dsize=(240,240), interpolation=cv2.INTER_CUBIC)
#     image = image / 255.
#     print("image shape is ",image.shape)
#     image = np.expand_dims(image, axis=0)
#     result = best_model.predict(image)
#     print(result)
#     if result > 0.5 :
#         return result
#     else :
#         return result

conv_layers = [layer.name for layer in model.layers if 'max_pool' in layer.name]
for layer in model.layers:
    print(layer.name, layer.output.shape)

print("Last conv layer:", conv_layers[-1])
last_conv_layer_name = conv_layers[-1]


def process_brain_tumor_diagnosis(image, save_path="uploads/temp_image.jpg"):
    image = crop_brain_contour(image)
    resized_img = cv2.resize(image, dsize=(240, 240), interpolation=cv2.INTER_CUBIC)
    norm_img = resized_img / 255.0
    img_input = np.expand_dims(norm_img, axis=0)

    result = model.predict(img_input)[0][0]

    cv2.imwrite(save_path, resized_img)

    heatmap = make_gradcam_heatmap(img_input, model, last_conv_layer_name)
    gradcam_path = overlay_heatmap(save_path, heatmap)

    web_path = os.path.relpath(gradcam_path, start=".").replace("\\", "/")

    return result, web_path