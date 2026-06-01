#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

PORT="${PORT:-8080}"
URL="http://localhost:${PORT}/"

echo "Starting Vue3 CDN App..."
echo "URL: ${URL}"
echo "Press Ctrl+C to stop the server."
echo

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL" >/dev/null 2>&1 &
elif command -v open >/dev/null 2>&1; then
  open "$URL" >/dev/null 2>&1 &
fi

if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  python -m http.server "$PORT"
elif command -v php >/dev/null 2>&1; then
  php -S "127.0.0.1:${PORT}"
elif command -v ruby >/dev/null 2>&1; then
  ruby -run -e httpd . -p "$PORT"
elif command -v busybox >/dev/null 2>&1; then
  busybox httpd -f -p "127.0.0.1:${PORT}" -h .
else
  echo "No built-in HTTP server command was found."
  echo "Please install Python, PHP, Ruby, or BusyBox, then run this script again."
  exit 1
fi
