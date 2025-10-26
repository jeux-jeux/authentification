from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)


ALLOWED_TO_WEBSOCKET = os.environ.get('ALLOWED_TO_WEBSOCKET')
ALLOWED_TO_WEBSOCKET_LEVEL = os.environ.get('ALLOWED_TO_WEBSOCKET_LEVEL')
ALLOWED_TO_PRINCIPAL = os.environ.get('ALLOWED_TO_PRINCIPAL')
ALLOWED_TO_PRINCIPAL_LEVEL = os.environ.get('ALLOWED_TO_PRINCIPAL_LEVEL')
ALLOWED_TO_STOCKAGE = os.environ.get('ALLOWED_TO_STOCKAGE')
ALLOWED_TO_STOCKAGE_LEVEL = os.environ.get('ALLOWED_TO_STOCKAGE_LEVEL')
ALLOWED_TO_MESSAGE_LEVEL = os.environ.get('ALLOWED_TO_MESSAGE_LEVEL')
ALLOWED_TO_MESSAGE = os.environ.get('ALLOWED_TO_MESSAGE')
ALLOWED_TO_MANAGER_LEVEL = os.environ.get('ALLOWED_TO_MANAGER_LEVEL')
CLE_ULTRA = os.environ.get('CLE_ULTRA')
CLE_ULTRA_LEVEL = os.environ.get('CLE_ULTRA_LEVEL')
CLE_MESSAGE = os.environ.get('CLE_MESSAGE')
CLE_WBS_MNG = os.environ.get('CLE_WBS_MNG')
CLE_WBS_SRV = os.environ.get('CLE_WBS_SRV')
CLE_WBS_SRV_CONNECT = os.environ.get('CLE_WBS_SRV_CONNECT')
CLE_WBS_SRV_CONNECT_LEVEL = os.environ.get('CLE_WBS_SRV_CONNECT_LEVEL')
CLE_INT_PROXY = os.environ.get('CLE_INT_PROXY')
CLE_INT_PROXY_LEVEL = os.environ.get('CLE_INT_PROXY_LEVEL')
CLE_IPHONE = os.environ.get('CLE_IPHONE')
CLE_IPHONE_LEVEL = os.environ.get('CLE_IPHONE_LEVEL')
FIREBASE_URL = os.environ.get('FIREBASE_URL')
CLOUDLINK_URL = os.environ.get('CLOUDLINK_URL')
MESSAGE_URL = os.environ.get('MESSAGE_URL')
PORT_WBS = os.environ.get('PORT_WBS')
PORT_MESSAGE = os.environ.get('PORT_MESSAGE')
GMAIL_PASS = os.environ.get('GMAIL_PASS')
GMAIL_USER = os.environ.get('GMAIL_USER')
NTFY_URL = os.environ.get('NTFY_URL')
EMAIL = os.environ.get('EMAIL')

# ✅ Route GET avec contrôle des origines
@app.route('/', methods=['GET'])
def root_get():
    origin = request.headers.get('Origin')
    allowedOrigins = ALLOWED_TO_PRINCIPAL
    # Si aucune origine n'est fournie, on refuse tout de suite
    if not origin:
        return jsonify({
            'message': 'Accès refusé'
        })

    if origin in allowedOrigins:
        return jsonify({
            'url_message': MESSAGE_URL,
            'url': FIREBASE_URL,
            'web_socket_server': CLOUDLINK_URL
        })

    return jsonify({
        'message': 'Accès refusé'
    })


# ✅ Route POST avec clé secrète
@app.route('/', methods=['POST'])
def root_post():
    data = request.get_json() or {}

    if data.get('cle') == CLE_IPHONE and CLE_IPHONE_LEVEL == "code":
        return jsonify({
            'allowed_to_websocket': ALLOWED_TO_WEBSOCKET,
            'allowed_to_websocket_level': ALLOWED_TO_WEBSOCKET_LEVEL,
            'allowed_to_principal': ALLOWED_TO_PRINCIPAL,
            'allowed_to_principal_level': ALLOWED_TO_PRINCIPAL_LEVEL,
            'allowed_to_stockage': ALLOWED_TO_STOCKAGE,
            'allowed_to_stockage_level': ALLOWED_TO_STOCKAGE_LEVEL,
            'allowed_to_message_level': ALLOWED_TO_MESSAGE_LEVEL,
            'allowed_to_message': ALLOWED_TO_MESSAGE,
            'allowed_to_manager_level': ALLOWED_TO_MANAGER_LEVEL,
            'cle_ultra_level': CLE_ULTRA_LEVEL,
            'cle_message': CLE_MESSAGE,
            'cle_wbs_mng': CLE_WBS_MNG,
            'cle_wbs_srv': CLE_WBS_SRV,
            'cle_wbs_srv_connect': CLE_WBS_SRV_CONNECT,
            'cle_wbs_srv_connect_level': CLE_WBS_SRV_CONNECT_LEVEL,
            'cle_int_proxy': CLE_INT_PROXY,
            'cle_int_proxy_level': CLE_INT_PROXY_LEVEL,
            'cle_iphone': CLE_IPHONE,
            'cle_iphone_level': CLE_IPHONE_LEVEL,
            'firebase_url': FIREBASE_URL,
            'cloudlink_url': CLOUDLINK_URL,
            'firebase_url': FIREBASE_URL_REAL,
            'port_wbs': PORT_WBS,
            'port_message': PORT_MESSAGE,
            'gmail_pass' : GMAIL_PASS,
            'gmail_user' : GMAIL_USER,
            'ntfy_url': NTFY_URL,
            'email': EMAIL
        })
    elif data.get('cle') == CLE_ULTRA and CLE_ULTRA_LEVEL == "code":  # <-- placeholder 1 : modifie la condition/action ici
        return jsonify({
            'allowed_to_websocket': ALLOWED_TO_WEBSOCKET,
            'allowed_to_websocket_level': ALLOWED_TO_WEBSOCKET_LEVEL,
            'allowed_to_principal': ALLOWED_TO_PRINCIPAL,
            'allowed_to_principal_level': ALLOWED_TO_PRINCIPAL_LEVEL,
            'allowed_to_stockage': ALLOWED_TO_STOCKAGE,
            'allowed_to_stockage_level': ALLOWED_TO_STOCKAGE_LEVEL,
            'allowed_to_message_level': ALLOWED_TO_MESSAGE_LEVEL,
            'allowed_to_message': ALLOWED_TO_MESSAGE,
            'allowed_to_manager_level': ALLOWED_TO_MANAGER_LEVEL,
            'cle_ultra_level': CLE_ULTRA_LEVEL,
            'cle_ultra': CLE_ULTRA,
            'cle_message': CLE_MESSAGE,
            'cle_wbs_mng': CLE_WBS_MNG,
            'cle_wbs_srv': CLE_WBS_SRV,
            'cle_wbs_srv_connect': CLE_WBS_SRV_CONNECT,
            'cle_wbs_srv_connect_level': CLE_WBS_SRV_CONNECT_LEVEL,
            'cle_int_proxy': CLE_INT_PROXY,
            'cle_int_proxy_level': CLE_INT_PROXY_LEVEL,
            'cle_iphone': CLE_IPHONE,
            'cle_iphone_level': CLE_IPHONE_LEVEL,
            'firebase_url': FIREBASE_URL,
            'cloudlink_url': CLOUDLINK_URL,
            'firebase_url': FIREBASE_URL_REAL,
            'port_wbs': PORT_WBS,
            'port_message': PORT_MESSAGE,
            'gmail_pass' : GMAIL_PASS,
            'gmail_user' : GMAIL_USER,
            'ntfy_url': NTFY_URL,
            'email': EMAIL
        })
    elif data.get('cle') == CLE_WBS_SRV:  # <-- placeholder 1 : modifie la condition/action ici
        return jsonify({
            'allowed_origin': ALLOWED_TO_WEBSOCKET,
            'level': ALLOWED_TO_WEBSOCKET_LEVEL,
            'port': PORT_WBS
        })
    elif data.get('cle') == CLE_WBS_MNG:  # <-- placeholder 2 : modifie la condition/action ici
        return jsonify({
            'web_socket_server': CLOUDLINK_URL,
            'level': ALLOWED_TO_MANAGER_LEVEL,
            'cle_wbs': CLE_WBS_SRV_CONNECT
        })
    elif data.get('cle') == CLE_INT_PROXY:  # <-- placeholder 3 : modifie la condition/action ici
        return jsonify({
            'firebase_url': FIREBASE_URL_REAL,
            'origine_stockage': ALLOWED_TO_STOCKAGE,
            'level': ALLOWED_TO_STOCKAGE_LEVEL
        })
    elif data.get('cle') == CLE_MESSAGE:  # <-- placeholder 3 : modifie la condition/action ici
        return jsonify({
            'allowed': ALLOWED_TO_MESSAGE,
            'level': ALLOWED_TO_MESSAGE_LEVEL,
            'port_message': PORT_MESSAGE,
            'gmail_pass' : GMAIL_PASS,
            'gmail_user' : GMAIL_USER,
            'ntfy_url': NTFY_URL,
            'email': EMAIL
        })
    else:
        return jsonify({
            'message': 'Accès refusé'
        })


@app.route('/cle-ultra', methods=['POST'])
def cle_ultra():
    data = request.get_json() or {}
    if data.get('cle') == CLE_ULTRA and CLE_ULTRA_LEVEL == "code":
        return jsonify({
            'access': 'False'
        })
    else:
        return jsonify({
            'access': 'false'
        })


@app.route('/cle-iphone', methods=['POST'])
def cle_iphone():
    data = request.get_json() or {}
    if data.get('cle') == CLE_IPHONE and CLE_IPHONE_LEVEL == "code":
        return jsonify({
            'access': 'true'
        })
    else:
        return jsonify({
            'access': 'false'
        })


@app.route('/cle-wbs', methods=['POST'])
def cle_wbs():
    data = request.get_json() or {}
    if data.get('cle') == CLE_WBS_SRV_CONNECT and CLE_WBS_SRV_CONNECT_LEVEL == "code":
        return jsonify({
            'access': 'true'
        })
    else:
        return jsonify({
            'access': 'false'
        })


# ✅ Route par défaut pour toutes les routes inconnues
@app.errorhandler(404)
def not_found(e):
    return jsonify({'message': 'Accès refusé'})


# ✅ Render attribue le port via process.env.PORT
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 5000))
    print(f"⚡️ Proxy authentification actif sur le port {PORT}")
    app.run(host='0.0.0.0', port=PORT)
