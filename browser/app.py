import numpy as np
import cv2
from mss import mss
from PIL import Image
from selenium.webdriver import Chrome
import time

bounding_box = {'left': 0, 'top': 0, 'width': 7680, 'height': 2160, 'scale': 2}

sct = mss()

# local do arquivo html
address = ""

count = 0

while True:
    sct_img = sct.grab(bounding_box)
    cv2.imshow('screen', np.array(sct_img))

    if count == 0:
      driver = Chrome(executable_path='./chromedriver.exe')
      driver.get(address)

      time.sleep(1)

      driver.find_element_by_id("button-fullscreen").click()

      count += 1

    if (cv2.waitKey(1) & 0xFF) == ord('q'):
        cv2.destroyAllWindows()
        break
