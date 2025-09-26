patterns = {
    "Failed Login Attempt": r"failed password|authentication failure",
    "Suspicious File Access": r"/etc/passwd|\.php",
    "SQL Injection Attempt": r"(\%27)|(\')|(\-\-)|(\%23)|(#)|(\bOR\b.*\=)|(\b1=1\b)",
}
