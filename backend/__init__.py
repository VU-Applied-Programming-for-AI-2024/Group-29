from flask import Flask
app = Flask(__name__, template_folder='../frontend')

from backend import routes