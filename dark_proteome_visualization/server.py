import os
import logging
from argparse import ArgumentParser
from contextlib import suppress

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from gevent.pywsgi import WSGIServer


from .app import app


log = logging.getLogger()

CURRENT_DIR = os.path.abspath(os.getcwd())
MODULE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_PATH = os.path.join(MODULE_DIR, 'static')
TEMPLATES_PATH = os.path.join(MODULE_DIR, 'templates')

parser = ArgumentParser()
parser.add_argument("-d", "--debug", action='store_true', help="Enable Flask debugger")
parser.add_argument("-L", "--listen", default='127.0.0.1', help="Listen this address for HTTP")
parser.add_argument("-P", "--port", default=8000, help="Listen this port for HTTP", type=int)
parser.add_argument('--log-level', help='Set logging level', default='info',
                    choices=('critical', 'fatal', 'error', 'warning', 'warn', 'info', 'debug'))

def main():
    options = parser.parse_args()

    logging.basicConfig(
        level=getattr(logging, options.log_level.upper(), logging.INFO),
        format="[%(asctime)s] %(filename)s:%(lineno)d %(levelname)s %(message)s"
    )

    app.template_folder = TEMPLATES_PATH
    app.static_folder = STATIC_PATH

    log.info("Starting service on http://%s:%d/", options.listen, options.port)

    if options.debug:
        log.warning("Running on debug mode not for production.")
        app.run(host=options.listen, port=options.port, debug=True)
    else:
        http_server = WSGIServer((options.listen, options.port), app)

        with suppress(KeyboardInterrupt):
            http_server.serve_forever()
