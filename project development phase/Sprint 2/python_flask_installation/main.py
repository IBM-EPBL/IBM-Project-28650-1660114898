import pickle

import requests
from flask import (Blueprint, Flask, flash, g, redirect, render_template,
                   request, session, url_for)

# NOTE: you must manually set API_KEY below using information retrieved from your IBM Cloud account.
API_KEY = "o4ir4eefqV_mQ8L-vjU6M3MopOjFUB0de_5e4BPDRp1A"
token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey":
API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
mltoken = token_response.json()["access_token"]

header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}

    
app=Flask(__name__)


file=open("model.pkl","rb")
random_Forest=pickle.load(file)
file.close()

@app.route("/login",methods=["GET", "POST"])
def login():
    if request.method == "POST":
        
            return redirect(url_for("index"))
    return render_template("login.html")
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        return redirect(url_for("login"))
    return render_template("register.html")
@app.route("/")
def hme():
    return render_template('Home.html')

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/feedback")
def fbd():
    return render_template('feedback.html')

@app.route("/index", methods=["GET","POST"])
def home():
    if request.method=="POST":
        myDict = request.form
        Month = int(myDict["Month"])
        Year = int(myDict["Year"])
        pred = [Year,Month]
        res=random_Forest.predict([pred])[0]
        res=round(res,2)
        X = [[Month,Year]]
        payload_scoring = {"input_data": [{"fields": ['Month','Year'], "values": X}]}

        response_scoring = requests.post('https://us-south.ml.cloud.ibm.com/ml/v4/deployments/a8b06557-1fd5-4d3e-a286-4c00e8c4f80d/predictions?version=2022-11-13', json=payload_scoring,
        headers={'Authorization': 'Bearer ' + mltoken})
        print("Scoring response")
        print(response_scoring.json())
        return render_template('result.html',Month=Month,Year=Year,res=res)
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)