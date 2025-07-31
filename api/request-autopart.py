
# Minimal Flask app for Vercel Python API compatibility

import os
import json
import psycopg2
import requests
import time
from flask import Flask, request, jsonify
from urllib.parse import urlparse, parse_qs

def get_env_var(*names, default=None):
    for name in names:
        value = os.environ.get(name)
        if value:
            return value
    return default

def parse_postgres_url(url):
    # Example: postgres://user:pass@host:port/dbname?sslmode=require
    result = urlparse(url)
    user = result.username
    password = result.password
    host = result.hostname
    port = result.port or 5432
    dbname = result.path.lstrip('/')
    return {
        'user': user,
        'password': password,
        'host': host,
        'port': port,
        'dbname': dbname
    }

app = Flask(__name__)


def log_debug(*args):
    print("[DEBUG]", *args, flush=True)

def log_error(*args):
    print("[ERROR]", *args, flush=True)

def hubspot_request(method, url, headers, payload=None, max_retries=3, retry_delay=1):
    for attempt in range(1, max_retries + 1):
        try:
            log_debug(f"HubSpot {method.upper()} {url} (attempt {attempt}) payload:", json.dumps(payload) if payload else None)
            resp = requests.request(method, url, headers=headers, data=json.dumps(payload) if payload else None, timeout=10)
            log_debug(f"HubSpot response {resp.status_code}: {resp.text}")
            if resp.ok:
                return resp
            else:
                log_error(f"HubSpot API error {resp.status_code}: {resp.text}")
        except Exception as e:
            log_error(f"HubSpot request exception: {e}")
        time.sleep(retry_delay)
    return None

@app.route('/api/request-autopart', methods=['POST'])
def request_autopart():
    try:
        data = request.get_json()
        # Connect to PostgreSQL using environment variables
        # Prefer connection string if available
        conn_url = get_env_var("POSTGRES_PRISMA_URL", "POSTGRES_URL_NON_POOLING")
        try:
            if conn_url:
                pg = parse_postgres_url(conn_url)
                log_debug(f"Connecting to DB (URL) host={pg['host']} dbname={pg['dbname']} user={pg['user']} port={pg['port']}")
                conn = psycopg2.connect(
                    dbname=pg['dbname'],
                    user=pg['user'],
                    password=pg['password'],
                    host=pg['host'],
                    port=pg['port']
                )
            else:
                dbname = get_env_var("PGDATABASE", "POSTGRES_DATABASE")
                user = get_env_var("PGUSER", "POSTGRES_USER")
                password = get_env_var("PGPASSWORD", "POSTGRES_PASSWORD")
                host = get_env_var("PGHOST", "POSTGRES_HOST")
                port = int(get_env_var("PGPORT", default=5432))
                log_debug(f"Connecting to DB (ENV) host={host} dbname={dbname} user={user} port={port}")
                conn = psycopg2.connect(
                    dbname=dbname,
                    user=user,
                    password=password,
                    host=host,
                    port=port
                )
            cur = conn.cursor()
            cur.execute('''
                INSERT INTO autopart_requests (
                    nombre_apellido, telefono, numero_parte, marca, modelo, anio, placa, vin, imagen_url, correo
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ''', (
                data.get('nombre_apellido'),
                data.get('telefono'),
                data.get('numero_parte'),
                data.get('marca'),
                data.get('modelo'),
                data.get('anio'),
                data.get('placa'),
                data.get('vin'),
                data.get('imagen_url'),
                data.get('correo')
            ))
            conn.commit()
            cur.close()
            conn.close()
        except Exception as db_exc:
            log_error(f"Database error: {db_exc}")
            return jsonify({"error": f"Database error: {db_exc}"}), 500

        # --- HubSpot Integration ---
        HUBSPOT_TOKEN = os.environ.get("HUBSPOT_TOKEN")
        if not HUBSPOT_TOKEN:
            log_error("HubSpot token not set in environment variables.")
            return jsonify({"error": "HubSpot token not set in environment variables."}), 500
        headers = {
            "Authorization": f"Bearer {HUBSPOT_TOKEN}",
            "Content-Type": "application/json"
        }
        # Map form fields to HubSpot contact standard properties only
        contact_payload = {
            "properties": {
                "email": data.get("correo"),
                "firstname": data.get("nombre_apellido"),
                "phone": data.get("telefono")
            }
        }
        contact_resp = hubspot_request("post", "https://api.hubapi.com/crm/v3/objects/contacts", headers, contact_payload)
        contact_id = None
        if contact_resp and contact_resp.ok:
            try:
                contact_id = contact_resp.json().get("id")
            except Exception as e:
                log_error(f"Failed to parse contact response JSON: {e}")

        # Map form fields to HubSpot deal standard properties only
        deal_payload = {
            "properties": {
                "dealname": f"Autopart Request - {data.get('nombre_apellido', '')}"
            }
        }
        deal_resp = hubspot_request("post", "https://api.hubapi.com/crm/v3/objects/deals", headers, deal_payload)
        deal_id = None
        if deal_resp and deal_resp.ok:
            try:
                deal_id = deal_resp.json().get("id")
            except Exception as e:
                log_error(f"Failed to parse deal response JSON: {e}")

        # Optionally associate contact and deal
        if contact_id and deal_id:
            assoc_url = f"https://api.hubapi.com/crm/v3/objects/deals/{deal_id}/associations/contacts/{contact_id}/deal_to_contact"
            assoc_resp = hubspot_request("put", assoc_url, headers)

        # --- End HubSpot Integration ---

        lang = data.get('lang', 'es')
        if lang == 'en':
            message = "Thank you. Your request has been received. We will get back to you soon."
        else:
            message = "Gracias. Tu solicitud ha sido recibida. Te responderemos en breve."
        return jsonify({"message": message}), 200
    except Exception as e:
        log_error(f"Unhandled error: {e}")
        return jsonify({"error": str(e)}), 500
