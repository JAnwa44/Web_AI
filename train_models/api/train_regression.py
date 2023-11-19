from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from database import mycursor, mydb
import pandas as pd

# from sklearn.preprocessing import OneHotEncoder
# from sklearn.compose import make_column_transformer
from seaborn import load_dataset
import numpy as np
from sklearn.model_selection import train_test_split
import xgboost as xgb
import pickle

from pydantic import BaseModel

router = APIRouter()


# transformer = make_column_transformer(
#     (OneHotEncoder(), ['hasYard','hasPool','isNewBuilt','hasStormProtector','hasStorageRoom']),
#     remainder='passthrough')

@router.get("/create_model_regression")
def create_model():
    concrete_df = pd.read_sql("SELECT * FROM concrete_data_yeh", con = mydb)

    # concrete_df.astype({'hasYard': 'category','hasPool': 'category','isNewBuilt': 'category','hasStormProtector': 'category','hasStorageRoom': 'category'}).dtypes
   
    print(concrete_df.columns)
    
    # ohe = pd.get_dummies(data=concrete_df, columns=['hasYard','hasPool','isNewBuilt','hasStormProtector','hasStorageRoom'])
    ohe = concrete_df

    ohe.head(2).to_csv('concrete_deploy.csv')

    X = ohe.drop(columns = ['ID', 'csMPa'])
    y = ohe['csMPa']

    X = np.array(X)
    y = np.array(y)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state=42)
    
    model = xgb.XGBRegressor(objective ='reg:squarederror', learning_rate = 0.1, max_depth = 30, n_estimators = 100)
    model.fit(X_train, y_train)

    y_predict = model.predict(X_test)

    with open('model_concrete', 'wb') as files:
        pickle.dump(model, files)

    deploy_df = pd.read_csv("concrete_deploy.csv")
    deploy_df = deploy_df.drop(columns = ['Unnamed: 0', 'ID', 'csMPa'])

    deploy_X = np.array(deploy_df)
    deploy_Y = model.predict(deploy_X)

    print(deploy_Y.reshape(-1,1))

    return {"message": True, "data": deploy_Y.tolist()}


class Item(BaseModel):
    cement: float
    slag: float
    flyash: float
    water: float
    superplasticizer: float
    coarseaggregate: float
    fineaggregate: float
    age: int
    

@router.post("/predict_regression")
async def predict(item: Item):
    # insurance_df = pd.read_sql("SELECT * FROM parishousing limit 10", con = mydb)
    # df = await df_in.json()
    test_df = pd.DataFrame(data = {
        "cement": [item.cement],
        "slag": [item.slag],
        "flyash": [item.flyash],
        "water": [item.water],
        "superplasticizer": [item.superplasticizer],
        "coarseaggregate": [item.coarseaggregate],
        "fineaggregate": [item.fineaggregate],
        "age": [item.age]
    })

    deploy_df = pd.read_csv("concrete_deploy.csv")

    # test_df.astype({'hasYard': 'category','hasPool': 'category','isNewBuilt': 'category','hasStormProtector': 'category','hasStorageRoom': 'category'}).dtypes
    print(test_df.columns)
    
    
    # ohe = pd.get_dummies(data=test_df, columns=['hasYard','hasPool','isNewBuilt','hasStormProtector','hasStorageRoom'])
    # transformed = transformer.fit_transform(test_df)
    # transformed_df = pd.DataFrame(
    #     transformed, 
    #     columns=transformer.get_feature_names()
    # )

    deploy_df = deploy_df.append(test_df)
    deploy_df = deploy_df.drop(columns = ['Unnamed: 0', 'ID', 'csMPa'])

    deploy_X = np.array(deploy_df)
    
    with open('model_concrete' , 'rb') as f:
        lr = pickle.load(f)
    deploy_Y = lr.predict(deploy_X)

    print(deploy_Y.reshape(-1,1))

    data_list = deploy_Y.tolist()

    return {"message": True, "csMPa": data_list[-1]}