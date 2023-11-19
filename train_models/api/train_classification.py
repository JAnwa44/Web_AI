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

@router.get("/create_model_classification")
def create_model():
    Credit_df = pd.read_sql("SELECT * FROM customer_data    ", con = mydb)

    # concrete_df.astype({'hasYard': 'category','hasPool': 'category','isNewBuilt': 'category','hasStormProtector': 'category','hasStorageRoom': 'category'}).dtypes
   
    print(Credit_df.columns)
    
    # ohe = pd.get_dummies(data=concrete_df, columns=['hasYard','hasPool','isNewBuilt','hasStormProtector','hasStorageRoom'])
    ohe = Credit_df

    ohe.head(2).to_csv('Credit_deploy.csv')

    X = ohe.drop(columns = ['id', 'label'])
    y = ohe['label']

    X = np.array(X)
    y = np.array(y)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state=42)
    
    model = xgb.XGBRegressor(objective ='reg:squarederror', learning_rate = 0.1, max_depth = 30, n_estimators = 100)
    model.fit(X_train, y_train)

    y_predict = model.predict(X_test)

    with open('model_Credit', 'wb') as files:
        pickle.dump(model, files)

    deploy_df = pd.read_csv("Credit_deploy.csv")
    deploy_df = deploy_df.drop(columns = ['Unnamed: 0', 'id', 'label'])

    deploy_X = np.array(deploy_df)
    deploy_Y = model.predict(deploy_X)

    print(deploy_Y.reshape(-1,1))

    return {"message": True, "label": deploy_Y.tolist()}


class Item(BaseModel):
    fea_1: int
    fea_2: int
    fea_3: int
    int_data: int
    fea_5: int
    fea_6: int
    fea_7: int
    fea_8: int
    fea_9: int
    fea_10: int
    fea_11: int
    

@router.post("/predict_classification")
async def predict(item: Item):
    # insurance_df = pd.read_sql("SELECT * FROM parishousing limit 10", con = mydb)
    # df = await df_in.json()
    test_df = pd.DataFrame(data = {
        "fea_1": [item.fea_1],
        "fea_2": [item.fea_2],
        "fea_3": [item.fea_3],
        "int_data": [item.int_data],
        "fea_5": [item.fea_5],
        "fea_6": [item.fea_6],
        "fea_7": [item.fea_7],
        "fea_8": [item.fea_8],
        "fea_9": [item.fea_9],
        "fea_10": [item.fea_10],
        "fea_11": [item.fea_11]
    })

    deploy_df = pd.read_csv("Credit_deploy.csv")

    # test_df.astype({'hasYard': 'category','hasPool': 'category','isNewBuilt': 'category','hasStormProtector': 'category','hasStorageRoom': 'category'}).dtypes
    print(test_df.columns)
    
    
    # ohe = pd.get_dummies(data=test_df, columns=['hasYard','hasPool','isNewBuilt','hasStormProtector','hasStorageRoom'])
    # transformed = transformer.fit_transform(test_df)
    # transformed_df = pd.DataFrame(
    #     transformed, 
    #     columns=transformer.get_feature_names()
    # )

    deploy_df = deploy_df.append(test_df)
    deploy_df = deploy_df.drop(columns = ['Unnamed: 0', 'id', 'label'])

    deploy_X = np.array(deploy_df)
    
    with open('model_Credit' , 'rb') as f:
        lr = pickle.load(f)
    deploy_Y = lr.predict(deploy_X)

    print(deploy_Y.reshape(-1,1))

    data_list = deploy_Y.tolist()

    # data_list[-1] = round(data_list[-1])

    # return {"message": True, "label": round(data_list[-1])}

    return {"message": True, "label": round(data_list[-1])}