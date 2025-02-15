import os
import cv2
import torch
import numpy as np
import pandas as pd
from pathlib import Path
from PIL import Image
from torchvision import transforms
from efficientnet_pytorch import EfficientNet
import torch.nn as nn
from ultralytics import YOLO

class ProductClassifier(nn.Module):
    def __init__(self, num_classes):
        super(ProductClassifier, self).__init__()
        self.base_model = EfficientNet.from_pretrained('efficientnet-b2')
        self.features = self.base_model.extract_features
        self.avgpool = nn.AdaptiveAvgPool2d(1)
        self.dropout = nn.Dropout(0.3)
        self.classifier = nn.Linear(1408, num_classes)

    def forward(self, x):
        x = self.features(x)
        x = self.avgpool(x).squeeze(-1).squeeze(-1)
        x = self.dropout(x)
        return self.classifier(x)

    def load_model(self, path):
        checkpoint = torch.load(path)
        self.load_state_dict(checkpoint['model_state_dict'])

class ProductDetector:
    def __init__(self, yolo_weights_path, classifier_weights_path, products_file):
        # Initialize YOLO model
        self.detection_model = YOLO(yolo_weights_path)
        
        # Initialize classification model
        self.products_df = pd.read_excel(products_file)
        unique_families = sorted(self.products_df['Famille'].unique())
        unique_families.append('Others')
        self.family_mapping = {family: idx for idx, family in enumerate(unique_families)}
        self.inv_family_mapping = {idx: family for family, idx in self.family_mapping.items()}
        
        # Initialize classifier
        self.classification_model = ProductClassifier(len(self.family_mapping))
        self.classification_model.load_model(classifier_weights_path)
        self.classification_model.eval()
        
        # Set device
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.classification_model.to(self.device)
        
        # Initialize transform
        self.transform = transforms.Compose([
            transforms.ToPILImage(),
            transforms.Resize((260, 260)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])

    def process_images(self, input_folder, output_folder):
        """Process all images in the input folder and save results to output folder"""
        print("Processing images...")
        results_list = []
        Path(output_folder).mkdir(exist_ok=True, parents=True)

        # Handle multiple image formats
        image_paths = []
        for ext in ['*.png', '*.jpg', '*.jpeg']:
            image_paths.extend(Path(input_folder).glob(ext))

        for img_path in image_paths:
            print(f"Processing {img_path.name}...")
            
            # Read image
            image = cv2.imread(str(img_path))
            if image is None:
                print(f"Warning: Could not read image {img_path}")
                continue

            # Get YOLO detections
            detections = self.detection_model(image)[0]

            # Process each detection
            for det in detections.boxes.data:
                x1, y1, x2, y2, conf, _ = det
                if conf > 0.1:  # Confidence threshold
                    # Extract region of interest
                    roi = image[int(y1):int(y2), int(x1):int(x2)]
                    if roi.size == 0:
                        continue

                    try:
                        # Classify the detected product
                        classification = self.classify_product(roi)
                        
                        # Store results
                        results_list.append({
                            'image': img_path.name,
                            'product': classification['product'],
                            'family': classification['family'],
                            'detection_confidence': float(conf),
                            'classification_confidence': classification['confidence'],
                            'x1': int(x1),
                            'y1': int(y1),
                            'x2': int(x2),
                            'y2': int(y2)
                        })

                        # Draw detection on image
                        color = (0, 255, 0) if classification['family'] != 'Others' else (0, 0, 255)
                        cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), color, 2)
                        label = f"{classification['family']} ({classification['confidence']:.2f})"
                        cv2.putText(image, label, (int(x1), int(y1)-10),
                                  cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

                    except Exception as e:
                        print(f"Error processing detection: {e}")
                        continue

            # Save annotated image
            output_path = os.path.join(output_folder, f"annotated_{img_path.name}")
            cv2.imwrite(output_path, image)

        # Create and save results DataFrame
        results_df = pd.DataFrame(results_list)
        results_path = os.path.join(output_folder, "detections.xlsx")
        results_df.to_excel(results_path, index=False)
        
        print(f"Processing complete. Results saved to {output_folder}")
        return results_df

    def classify_product(self, roi_image):
        """Classify a single product image"""
        roi_image = cv2.cvtColor(roi_image, cv2.COLOR_BGR2RGB)
        roi_tensor = self.transform(roi_image).unsqueeze(0).to(self.device)

        with torch.no_grad():
            outputs = self.classification_model(roi_tensor)
            probabilities = torch.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
            predicted_idx = predicted.item()
            confidence = confidence.item()

        family = self.inv_family_mapping.get(predicted_idx, 'Unknown')
        
        # Get a representative product from the family
        family_products = self.products_df[self.products_df['Famille'] == family]['Produit']
        product = family_products.iloc[0] if not family_products.empty else 'Unknown'

        return {
            'product': product,
            'family': family,
            'confidence': confidence
        }

def main():
    # Set up paths
    base_dir = 'path/to/your/project'  # Update this
    yolo_weights = os.path.join(base_dir, 'models/yolo/best.pt')
    classifier_weights = os.path.join(base_dir, 'models/classifier/best_model.pth')
    products_file = os.path.join(base_dir, 'data/Liste_Produit_Ramy1.xlsx')
    input_folder = os.path.join(base_dir, 'input')
    output_folder = os.path.join(base_dir, 'output')

    # Initialize detector
    detector = ProductDetector(yolo_weights, classifier_weights, products_file)
    
    # Process images
    results = detector.process_images(input_folder, output_folder)

if __name__ == "__main__":
    main()