import csv
import os

CURRENT_DIR = os.path.abspath(os.getcwd())
MODULE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_PATH = os.path.join(MODULE_DIR, '../../static')
TEMPLATES_PATH = os.path.join(MODULE_DIR, '../../templates')

DARK_PROTEOME_PATH = '/data/dark_proteome/dark_proteome.csv'

def parse_dark_proteome():
    with open(STATIC_PATH + DARK_PROTEOME_PATH) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            print(row)
