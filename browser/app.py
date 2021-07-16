import time
import requests
import datetime
from bs4 import BeautifulSoup
from selenium.webdriver import Chrome

address = "http://localhost:4000/"

driver = Chrome(executable_path='./chromedriver.exe')
driver.get(address)

time.sleep(100)
