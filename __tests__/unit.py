import unittest
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

PATH = 'C:\Program Files (x86)\chromedriver.exe'

class LoginPageTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(PATH)

    def test_connection(self):
        driver = self.driver
        driver.get('https://clever-ramanujan-0633a7.netlify.app/')

        time.sleep(5)
        
        assert "Navbar"  in driver.page_source

    def testExplore(self):
        driver = self.driver
        driver.get('https://clever-ramanujan-0633a7.netlify.app/')

        time.sleep(5)
        
        assert ""  in driver.page_source
   

    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()