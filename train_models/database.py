import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="project_train"
)

mycursor = mydb.cursor()