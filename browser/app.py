import numpy as np
import cv2
from mss import mss
from PIL import Image
from selenium.webdriver import Chrome

bounding_box = {'top': 100, 'left': 0, 'width': 1000, 'height': 800}

sct = mss()

# local do arquivo html
address = ""

driver = Chrome(executable_path='./chromedriver.exe')
driver.get(address)

while True:
    sct_img = sct.grab(bounding_box)
    cv2.imshow('screen', np.array(sct_img))
    if (cv2.waitKey(1) & 0xFF) == ord('q'):
        cv2.destroyAllWindows()
        break
