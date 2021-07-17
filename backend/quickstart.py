from __future__ import print_function
from classroom_snippets import ClassroomSnippets
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import requests

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly',
          'https://www.googleapis.com/auth/classroom.coursework.students']


def main():
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
    classroomSnippets.list_courses()
    course = classroomSnippets.get_course(371083279479)
    courseId = course["id"]
    submissions = []
    page_token = None
    coursewk = service.courses().courseWork().list(courseId=courseId).execute()
    print(coursewk["courseWork"][1])
    print(coursewk["courseWork"][1]["materials"][0]["form"]["responseUrl"])

    response = requests.get(
        "https://docs.google.com/spreadsheets/d/1yFF_oEqFngncAxFFAbmcYr4a3VcgffdGVOmkB-fu6aY/gviz/tq?tqx= out:csv&sheet=a")
    print(response.json())

    # service = build('sheets', 'v4', http=creds.authorize(httplib2.Http()))

    # result = service.spreadsheets().get(spreadsheetId = SPREADSHEET_ID).execute()
    # urlParts = urllib.parse.urlparse(result['spreadsheetUrl'])
    # path = re.sub("\/edit$", '/export', urlParts.path)
    # urlParts = urlParts._replace(path=path)
    # headers = {
    # 'Authorization': 'Bearer ' + creds.access_token,
    # }
    # for sheet in result['sheets']:
    # params = {
    #     'id': SPREADSHEET_ID,
    #     'format': 'csv',
    #     'gid': sheet['properties']['sheetId'],
    # }
    # queryParams = urllib.parse.urlencode(params)
    # urlParts = urlParts._replace(query=queryParams)
    # url = urllib.parse.urlunparse(urlParts)
    # response = requests.get(url, headers = headers)
    # filePath = '/tmp/foo-%s.csv' % (+ params['gid'])
    # with open(filePath, 'wb') as csvFile:
    #     csvFile.write(response.content)
    # courseWorkId = coursewk["courseWork"][1]["id"]
    # coursework = service.courses().courseWork()
    # response = coursework.studentSubmissions().list(
    #     pageToken=page_token,
    #     courseId=courseId,
    #     courseWorkId=courseWorkId,
    #     pageSize=10).execute()
    # submissions.extend(response.get('studentSubmissions', []))
    # print(coursework)
    # for submission in submissions:
    #     for key in submission:
    #         print(f"{key}:{submission[key]}\n")

    # Call the Classroom API
    # results = service.courses().list(pageSize=10).execute()
    # courses = results.get('courses', [])

    # if not courses:
    #     print('No courses found.')
    # else:
    #     print('Courses:')
    #     for course in courses:
    #         print(course['name'])
    #         for key in course:
    #             print(f"{key}:{course[key]}\n")


if __name__ == '__main__':
    main()
