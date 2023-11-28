
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import csv
from fastapi.responses import JSONResponse
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/rows')

def get_data():
    data = []
    with open('c:/Projects/PythonDev/aicreations/project_1/sample.csv', 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the first row
        for row in reader:
            if len(row) == 4:
                name, address, phone_number, age = row
                data.append({
                    'name': name,
                    'address': address,
                    'phone_number': phone_number,
                    'age': age
                })
    return data



@app.get('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
