import psutil
from http.server import BaseHTTPRequestHandler, HTTPServer
import requests

hostName = "192.168.0.21"
serverPort = 4568

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        if (self.path == "/status"):
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()

            cpu = str(psutil.cpu_percent(1))
            ram = str(psutil.virtual_memory()[2])

            response = requests.get('http://192.168.0.21:4567/teszt/vajdasimon.ddns.net')
            adatok = response.json()

            self.wfile.write(bytes(cpu + "," + ram + "," + str(adatok["players"]), "utf-8"))

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