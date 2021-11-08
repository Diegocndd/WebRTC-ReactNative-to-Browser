import cv2
import subprocess

rtspurl = 'rtmp://localhost/live/apptalk'

cap = cv2.VideoCapture(rtspurl)
ret, img = cap.read()

while True:
    cap.grab()
    ret, img = cap.retrieve()
    if ret:
        cv2.imshow('video output', img)
    if cv2.waitKey(1) == ord('q'):
        raise StopIteration