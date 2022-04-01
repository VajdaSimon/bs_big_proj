import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

hostName = "localhost"
serverPort = 4000

try:
    con = sqlite3.connect('hudustry.db')
    cur = con.cursor()
    cur.execute("create table players (uuid, gameMod, time)")
except:
  print("Már létre lett hozva az adatbázis")

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        if (self.path.find("/:le:/") != -1):
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()

            a = urlparse(str(self.path)[6:])
            b = a.path.split("&")

            cur.execute("select * from players where uuid = '" + str(str(b[0]).split("=")[1]) + "' and gameMod = '" + str(str(b[1]).split("=")[1]) + "'")

            c = cur.fetchall()[0]
            uuid = c[0]
            mod = c[1]
            time = c[2]

            jsonStr = "{ \"uuid\": \"" + str(uuid) +  "\", \"gameMod\": \"" + str(mod) +  "\", \"time\": \"" + str(time) +  "\"}"

            self.wfile.write(bytes(jsonStr, "utf-8"))

        elif (self.path.find("/:fel:/") != -1):
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            a = urlparse(str(self.path)[7:])
            b = a.path.split("&")

            cur.execute("select * from players where uuid = '" + str(str(b[0]).split("=")[1]) + "' and gameMod = '" + str(str(b[1]).split("=")[1]) + "'")
            if (len(cur.fetchall()) == 0):
                con.executescript("insert into players (uuid, gameMod, time) values ('" + str(str(b[0]).split("=")[1]) + "', '" + str(str(b[1]).split("=")[1]) + "', '" + str(str(b[2]).split("=")[1]) + "')")
            else:
                con.executescript("update players set time='" + str(str(b[2]).split("=")[1]) + "' where uuid = '" + str(str(b[0]).split("=")[1]) + "' and gameMod = '" + str(str(b[1]).split("=")[1]) + "'")

        elif (self.path == "/mind"):
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()

            cur.execute("select * from players")
            self.wfile.write(bytes(str(cur.fetchall()), "utf-8"))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    con.close()
    print("Server stopped.")