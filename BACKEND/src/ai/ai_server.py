

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os

app = FastAPI()

# Cấu hình Model (Giữ nguyên như predict.py của bạn)
CLASS_NAMES = ['DenBan', 'DenChieuTuong', 'DenChumCD', 'DenChumHD', 'DenTha', 'DenTuong', 'OpTranLED', 'OpTranPL']
model_path = os.path.join(os.path.dirname(__file__), "models", "resnet50_best.pth")

# Load model LÊN RAM NGAY KHI CHẠY SERVER
device = torch.device("cpu")
model = models.resnet50()
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, len(CLASS_NAMES))
model.load_state_dict(torch.load(model_path, map_location=device))
model.eval()

transform = transforms.Compose([
    transforms.Resize(224),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

class ImagePath(BaseModel):
    path: str

@app.post("/predict")
async def predict(data: ImagePath):
    try:
        img = Image.open(data.path).convert('RGB')
        img_tensor = transform(img).unsqueeze(0)

        with torch.no_grad():
            # luồng 1 lấy nhãn phân loại ở tầng FC- đi qua toàn bộ lớp 
            logits = model(img_tensor)
            _, predicted_idx = torch.max(logits, 1)
            label = CLASS_NAMES[predicted_idx.item()]

            # Trích xuất vector - luồng 2
            x = model.conv1(img_tensor)
            x = model.bn1(x)
            x = model.relu(x)
            x = model.maxpool(x)
            # 4 cụm khối dư chính
            x = model.layer1(x)
            x = model.layer2(x)
            x = model.layer3(x)
            x = model.layer4(x)
            x = model.avgpool(x)
            x = torch.flatten(x, 1)
            x = torch.nn.functional.normalize(x, p=2, dim=1) # tính L2
            
            vector_list = x.flatten().tolist()

            return {
                "category_label": label,
                "vector": vector_list
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000) # 0.0.0.0