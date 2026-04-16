import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import sys
import json
import numpy as np

# Giả sử kiến trúc model của bạn (bạn cần chỉnh sửa đúng class model của mình)
# Ở đây tôi ví dụ dùng ResNet hoặc một kiến trúc tương đương trả về vector
def get_model(model_path):
    # Load model (Thay đổi kiến trúc phù hợp với file .pth của bạn)
    model = torch.load(model_path, map_location=torch.device('cpu'))
    model.eval()
    return model

def process_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    img = Image.open(image_path).convert('RGB')
    return transform(img).unsqueeze(0)

if __name__ == "__main__":
    img_path = sys.argv[1]
    model_path = sys.argv[2]
    
    model = get_model(model_path)
    input_tensor = process_image(img_path)
    
    with torch.no_grad():
        vector = model(input_tensor)
        # Chuyển vector thành list để in ra JSON
        vector_list = vector.numpy().flatten().tolist()
        print(json.dumps(vector_list))