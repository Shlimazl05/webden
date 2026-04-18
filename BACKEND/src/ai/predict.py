

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import sys
import json
import os

# Đảm bảo thứ tự này khớp hoàn toàn với kết quả print(class_names) trên Colab
CLASS_NAMES = ['DenBan', 'DenChieuTuong', 'DenChumCD', 'DenChumHD', 'DenTha', 'DenTuong', 'OpTranLED', 'OpTranPL']

def get_model(model_path):
    # Khởi tạo resnet50 không cần load weights mặc định vì ta sẽ load file pth của ta
    model = models.resnet50()
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, len(CLASS_NAMES)) 
    
    # Load trọng số từ file đã train
    checkpoint = torch.load(model_path, map_location=torch.device('cpu'))
    model.load_state_dict(checkpoint)
    model.eval()
    return model

def process():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Missing image path"}))
        return

    img_path = sys.argv[1]
    # Đường dẫn mặc định đến model
    model_path = r"D:\webden\BACKEND\src\ai\models\resnet50_best.pth"

    transform = transforms.Compose([
        # Bước 1: Resize cạnh dài nhất về 224, giữ nguyên tỉ lệ
        transforms.Resize(224), 
        # Bước 2: Pad thêm khoảng trắng để thành hình vuông 224x224
        transforms.Pad(padding=0, fill=0, padding_mode='constant'),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    try:
        model = get_model(model_path)
        img = Image.open(img_path).convert('RGB')
        img_tensor = transform(img).unsqueeze(0)

        with torch.no_grad():
            # 1. Dự đoán nhãn
            logits = model(img_tensor)
            _, predicted_idx = torch.max(logits, 1)
            label = CLASS_NAMES[predicted_idx.item()]

            x = model.conv1(img_tensor)
            x = model.bn1(x)
            x = model.relu(x)
            x = model.maxpool(x)
            x = model.layer1(x)
            x = model.layer2(x)
            x = model.layer3(x)
            x = model.layer4(x)
            x = model.avgpool(x) # Lớp này cho ra vector 2048
            # vector_list = torch.flatten(x, 1).flatten().tolist()

            x = torch.flatten(x, 1) # Kết quả là [1, 2048]
            
            # --- THÊM DÒNG NÀY ĐỂ CHUẨN HÓA ---
            x = torch.nn.functional.normalize(x, p=2, dim=1) 
            # ----------------------------------

            vector_list = x.flatten().tolist()
            
            print(json.dumps({
                "category_label": label,
                "vector_length": len(vector_list), # Thêm để debug
                "vector": vector_list
            }))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    process()