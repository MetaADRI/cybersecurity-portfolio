import unittest
from src.log_analyzer import extract_ip, extract_timestamp

class TestLogAnalyzer(unittest.TestCase):
    def test_extract_ip(self):
        log = "2025-09-27 Failed password from 192.168.1.5"
        self.assertEqual(extract_ip(log), "192.168.1.5")

    def test_extract_timestamp(self):
        log = "2025-09-27 22:15:12 Failed login attempt"
        self.assertEqual(extract_timestamp(log), "2025-09-27 22:15:12")

if __name__ == "__main__":
    unittest.main()
