from fastapi import FastAPI
import api.train_classification as train_classification
import api.train_regression as train_regression

app = FastAPI()

app.include_router(train_classification.router)
app.include_router(train_regression.router)

@app.get('/')
def root_api():
    return {"message": "Welcome to AI Training"}