#!/bin/bash
# segment: mail.tm inbox helpers
BASE="https://api.mail.tm"
ADDR="$1"          # full address
PASS="$2"
OP="$3"            # auth | wait | msg | links
MSGID="$4"

case "$OP" in
  auth)
    curl -s -X POST "$BASE/token" -H "Content-Type: application/json" -d "{\"address\":\"$ADDR\",\"password\":\"$PASS\"}"
    ;;
  wait)
    TOK=$(curl -s -X POST "$BASE/token" -H "Content-Type: application/json" -d "{\"address\":\"$ADDR\",\"password\":\"$PASS\"}" | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
    for i in $(seq 1 40); do
      sleep 3
      N=$(curl -s "$BASE/messages" -H "Authorization: Bearer $TOK" | python3 -c "import sys,json;print(json.load(sys.stdin)['hydra:totalItems'])")
      if [ "$N" != "0" ]; then
        curl -s "$BASE/messages" -H "Authorization: Bearer $TOK"
        exit 0
      fi
    done
    echo "TIMEOUT_NO_MAIL"
    ;;
  msg)
    TOK=$(curl -s -X POST "$BASE/token" -H "Content-Type: application/json" -d "{\"address\":\"$ADDR\",\"password\":\"$PASS\"}" | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
    curl -s "$BASE/messages/$MSGID" -H "Authorization: Bearer $TOK"
    ;;
  links)
    TOK=$(curl -s -X POST "$BASE/token" -H "Content-Type: application/json" -d "{\"address\":\"$ADDR\",\"password\":\"$PASS\"}" | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])" 2>/dev/null)
    for i in $(seq 1 40); do
      sleep 3
      M=$(curl -s "$BASE/messages" -H "Authorization: Bearer $TOK")
      ID=$(echo "$M" | python3 -c "import sys,json;d=json.load(sys.stdin)['hydra:member'];print(d[0]['id'] if d else '')" 2>/dev/null)
      if [ -n "$ID" ]; then
        curl -s "$BASE/messages/$ID" -H "Authorization: Bearer $TOK" \
          | python3 -c "
import sys, json, re
d = json.load(sys.stdin)
html = (d.get('html') or [''])[0] if isinstance(d.get('html'), list) else (d.get('html') or '')
links = re.findall(r'https?://[^\"\\s<>]+', html)
codes = re.findall(r'(?<!\d)(\d{6})(?!\d)', (d.get('text') or '') + html)
print('SUBJ:', d.get('subject'))
print('FROM:', d.get('from', {}).get('address'))
for l in list(dict.fromkeys(links))[:10]: print('LINK:', l)
if codes: print('CODE:', codes[0])
"
        exit 0
      fi
    done
    echo "TIMEOUT_NO_MAIL"
    ;;
esac
