
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import sys
import json

def get_model(model_path):
    model = models.resnet50()
    # Phải khớp với 8 loại đèn của bạn lúc train
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, 8) 
    
    # Load trọng số
    checkpoint = torch.load(model_path, map_location='cpu')
    model.load_state_dict(checkpoint)
    
    # Chuyển sang Identity để lấy 2048 vector
    model.fc = nn.Identity()
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
        vector = model(img_tensor).flatten().tolist()
        print(json.dumps(vector))

if __name__ == "__main__":
    process()