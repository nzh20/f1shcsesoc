from __future__ import print_function
from flask import Flask, request
from classroom_snippets import ClassroomSnippets
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from json import dumps
import requests

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly',
          'https://www.googleapis.com/auth/classroom.coursework.students']

app = Flask(__name__)
"""Shows basic usage of the Classroom API.
Prints the names of the first 10 courses the user has access to.
"""
creds = None
# The file token.json stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
if os.path.exists('token.json'):
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            'credentials2.json', SCOPES)
        creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open('token.json', 'w') as token:
        token.write(creds.to_json())

service = build('classroom', 'v1', credentials=creds)
classroomSnippets = ClassroomSnippets(service)


@app.route("/")
def hello():
    return "Hello World!"

# Auth Wrappers


@app.route("/classes", methods=["GET"])
def fn_get_classes():
    return dumps(classroomSnippets.list_courses())


@app.route("/class", methods=["GET"])
def fn_get_class():
    class_id = request.args.get('id')
    return dumps(classroomSnippets.get_course(class_id))


@app.route("/coursework", methods=["GET"])
def fn_get_coursework():
    class_id = request.args.get('class_id')
    return dumps(classroomSnippets.get_coursework(class_id))


if __name__ == "__main__":
    app.run()
