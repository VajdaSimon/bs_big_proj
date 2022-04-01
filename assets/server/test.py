from urllib.parse import urlparse
a = urlparse("http://localhost:4000/le#uuid=alma78sd5&gamemod=survival")
b = a.fragment.split("&")
for adat in b:
    print(adat.split("="))