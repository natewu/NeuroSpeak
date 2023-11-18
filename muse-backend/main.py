import firebase_admin
from flask import Flask, request, jsonify
from firebase_admin import auth, credentials, db

import os

import base64
import json
import re
#from museLSL import returnDirection

# cred = credentials.Certificate("secret.json")
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'secret'
# })

app = Flask(__name__)

@app.route('/')
def home():
    return "Back-end operational!"

@app.route('/getDirection', methods = ["get"])
def getDirection():
    #directionToReturn = returnDirection()
    #if directionToReturn:
         #return directionToReturn
    #else:
    #   return "nil"
    return "nil"

@app.route('/chatLog/<chatID>', methods = ['get'])
def chatLog(chatID):
    # ref = db.reference('data/chatLog/' + chatID)
    # if ref.get():
    #     return jsonify(ref.get())
    # else:
    #     return "nil"
    return "nil"