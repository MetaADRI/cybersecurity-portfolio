import re
import argparse
import pandas as pd
from patterns import patterns

def analyze_logs(input_file, output_file):
    results = []

    with open(input_file, "r") as f:
        for line in f:
            for event, regex in patterns.items():
                if re.search(regex, line, re.IGNORECASE):
                    results.append({
                        "timestamp": extract_timestamp(line),
                        "ip": extract_ip(line),
                        "event_type": event,
                        "raw_log": line.strip()
                    })

    df = pd.DataFrame(results)
    df.to_csv(output_file, index=False)
    print(f"[+] Analysis complete. Report saved to {output_file}")

def extract_timestamp(line):
    match = re.search(r"\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}", line)
    return match.group(0) if match else "N/A"

def extract_ip(line):
    match = re.search(r"\b\d{1,3}(\.\d{1,3}){3}\b", line)
    return match.group(0) if match else "N/A"

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Log File Analyzer")
    parser.add_argument("--input", required=True, help="Path to log file")
    parser.add_argument("--output", required=True, help="Path to output CSV")
    args = parser.parse_args()

    analyze_logs(args.input, args.output)
