import psutil
from http.server import BaseHTTPRequestHandler, HTTPServer
import requests
import re
import json

hostName = "localhost"
serverPort = 4000

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        if (self.path == "/status"):
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()

            cpu = str(psutil.cpu_percent(1))
            ram = str(psutil.virtual_memory()[2])

            response = requests.get('http://192.168.0.21:4567/api/v1?key=db3e1891ff67ebf0feaa56a60bf03d39')
            adatok = str(response.json())
            adatok = re.sub(r", 'uuid(.{28})'", '', adatok )

            #players = adatok["hub"]["playerCount"] + adatok["attack"]["playerCount"] + adatok["survival"]["playerCount"] + adatok["pvp"]["playerCount"]

            self.wfile.write(bytes("{'cpu': '" + cpu + "', 'ram':'" + ram + "'," + adatok[1:], "utf-8"))

        else:
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")