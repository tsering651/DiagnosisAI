import os
import cv2
import numpy as np
import time

def overlay_heatmap(image_path, heatmap, alpha=0.4, output_dir="static"):
    os.makedirs(output_dir, exist_ok=True)

    filename = f"gradcam_{int(time.time())}.jpg"
    output_path = os.path.join(output_dir, filename)

    img = cv2.imread(image_path)
    heatmap = cv2.resize(heatmap, (img.shape[1], img.shape[0]))
    heatmap = np.uint8(255 * heatmap)
    heatmap_color = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    superimposed_img = heatmap_color * alpha + img

    cv2.imwrite(output_path, superimposed_img)
    return output_path
