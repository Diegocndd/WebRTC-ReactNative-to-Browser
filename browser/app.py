import cv2
import time
import numpy as np
from mss import mss
import mediapipe as mp
mp_drawing = mp.solutions.drawing_utils
mp_holistic = mp.solutions.holistic
from selenium.webdriver import Chrome
import time

bounding_box = {'top': 100, 'left': 0, 'width': 1000, 'height': 800}

sct = mss()

# local do arquivo html
address = "C:/Users/diego.lima/Desktop/WebRTC-ReactNative-to-Browser/browser/index.html"

driver = Chrome(executable_path='./chromedriver.exe')
driver.get(address)
# Abre a webcam por 5 segundos, processa a entrada com o mediapipe holistic e salva o video sem background

# For webcam input:
cap = cv2.VideoCapture(0)
with mp_holistic.Holistic(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as holistic:


  while True:
    sct_img = sct.grab(bounding_box)
    image = np.array(sct_img)
    # Flip the image horizontally for a later selfie-view display, and convert
    # the BGR image to RGB.
    image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
    # To improve performance, optionally mark the image as not writeable to
    # pass by reference.
    image.flags.writeable = False
    results = holistic.process(image)

    # Draw landmark annotation on the image.
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    mp_drawing.draw_landmarks(
        image, results.face_landmarks, mp_holistic.FACE_CONNECTIONS)
    mp_drawing.draw_landmarks(
        image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
    mp_drawing.draw_landmarks(
        image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
    mp_drawing.draw_landmarks(
        image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)
    cv2.imshow('MediaPipe Holistic', image)

    if cv2.waitKey(5) & 0xFF == 27:
      break
cap.release()
