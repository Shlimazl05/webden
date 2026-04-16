

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import sys
import json

# Danh sách 8 loại đèn bạn đã train (phải đúng thứ tự lúc train)
CLASS_NAMES = ['DenBan', 'DenChieuTuong', 'DenChumCD', 'DenChumHD', 'DenTha', 'DenTuong', 'OpTranLED', 'OpTranPL']

def get_model(model_path):
    model = models.resnet50()
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, 8) 
    checkpoint = torch.load(model_path, map_location='cpu')
    model.load_state_dict(checkpoint)
    model.eval()
    return model

def process():
    img_path = sys.argv[1]
    model_path = sys.argv[2]
    
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    model = get_model(model_path)
    img = Image.open(img_path).convert('RGB')
    img_tensor = transform(img).unsqueeze(0)

    with torch.no_grad():
        # Bước 1: Lấy kết quả phân loại (8 lớp)
        logits = model(img_tensor)
        _, predicted_idx = torch.max(logits, 1)
        label = CLASS_NAMES[predicted_idx.item()]

        # Bước 2: Lấy Vector đặc trưng (Trích xuất từ lớp trước FC)
        # Tạo một model phụ để lấy feature
        modules = list(model.children())[:-1] 
        feature_extractor = nn.Sequential(*modules)
        vector = feature_extractor(img_tensor)
        
        vector_list = vector.flatten().tolist()
        
        # Trả về cả 2 thông tin
        print(json.dumps({
            "vector": vector_list,
            "category_label": label
        }))

if __name__ == "__main__":
    process()