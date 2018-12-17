import os
import logging
import click
from contextlib import suppress

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from gevent.pywsgi import WSGIServer


from .app import app


console = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
console.setFormatter(formatter)
LOG = logging.getLogger("Server")
LOG.addHandler(console)
LOG.setLevel(logging.INFO)

CURRENT_DIR = os.path.abspath(os.getcwd())
MODULE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_PATH = os.path.join(MODULE_DIR, 'static')
TEMPLATES_PATH = os.path.join(MODULE_DIR, 'templates')

@click.command()
@click.option('-d', '--debug',
              help='Enable Flask debugger', required=False)
@click.option('-l', '--listen', default='127.0.0.1',
              help='Listen to this address for HTTP', required=False)
@click.option('-p', '--port', default=8000,
              help='Listen this port for HTTP', required=False)
def main(debug, listen, port):
    app.template_folder = TEMPLATES_PATH
    app.static_folder = STATIC_PATH

    LOG.info("Starting service on http://%s:%d/", listen, port)

    if debug:
        LOG.warning("Running on debug mode not for production.")
        app.run(host=listen, port=port, debug=True)
    else:
        http_server = WSGIServer((listen, port), app)

        with suppress(KeyboardInterrupt):
            http_server.serve_forever()
