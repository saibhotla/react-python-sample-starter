
from fastapi import Cookie, Depends, FastAPI, HTTPException, Request, Response
from fastapi import security
from fastapi.middleware.cors import CORSMiddleware
import csv
from fastapi.responses import FileResponse, JSONResponse
import json
from fastapi.staticfiles import StaticFiles
from starlette.status import HTTP_401_UNAUTHORIZED

from fastapi.security import HTTPBasic, HTTPBasicCredentials, OAuth2PasswordRequestForm
security = HTTPBasic()
app = FastAPI()
origins = [
    "http://localhost:3000",  # React app's origin
    # Add any other origins that need to access your API
]
# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/rows')

def get_data():
    data = []
    with open('./backend/sample.csv', 'r') as file:
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



# @app.get('/')
# def hello():
#     return 'Hello, World!'

# @app.post('/login')
# def login(request: Request, response: Response):
#     # Perform login logic here
#     # Set the session cookie
#     response.set_cookie(key="session", value="your_session_value", httponly=True)
#     return {"message": "Login successful"}


def get_current_user(session: str = Cookie(None)):
    # This is a placeholder implementation. In a real application, you would
    # use the session cookie to look up the user in your database.
    if session == 'your_session_value':
        return {'username': 't@gmail.com'}
    else:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

@app.get('/current_user')
def current_user(user = Depends(get_current_user)):
    return user

@app.post('/logout')
def logout(response: Response):
    # Clear the session cookie
    response.delete_cookie(key="session")
    return {"message": "Logout successful"}


@app.post('/login')
def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    # This is a placeholder implementation. In a real application, you would
    # verify the user's credentials against your database.
    if form_data.username == 't@gmail.com' and form_data.password == 'test':
        # Set the session cookie
        response.set_cookie(key="session", value="your_session_value", httponly=True)
        return {"message": "Login successful"}
    else:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Register the StaticFiles middleware
app.mount("/", StaticFiles(directory="./aicrxn/build/", html=True), name="ReactApp")

# Serve the React app bundle
@app.get("/")
async def index():
  return FileResponse("./aicrxn/build/index.html")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)

