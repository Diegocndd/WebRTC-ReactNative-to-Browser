import numpy as np
import cv2
from mss import mss
from PIL import Image
from selenium.webdriver import Chrome

bounding_box = {'top': 100, 'left': 0, 'width': 400, 'height': 600}

sct = mss()

address = "file:///C:/Users/diego.lima/Desktop/WebRTC-ReactNative-to-Browser/browser/index.html"

driver = Chrome(executable_path='./chromedriver.exe')
driver.get(address)

while True:
    sct_img = sct.grab(bounding_box)
    cv2.imshow('screen', np.array(sct_img))
    if (cv2.waitKey(1) & 0xFF) == ord('q'):
        cv2.destroyAllWindows()
        break
