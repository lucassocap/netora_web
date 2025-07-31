
# Minimal Flask app for Vercel Python API compatibility

import os
import json
import psycopg2
import requests
from flask import Flask, request, jsonify

def get_env_var(*names, default=None):
    for name in names:
        value = os.environ.get(name)
        if value:
            return value
    return default

app = Flask(__name__)

@app.route('/api/request-autopart', methods=['POST'])
def request_autopart():
    try:
        data = request.get_json()
        # Connect to PostgreSQL using environment variables
        dbname = get_env_var("PGDATABASE", "POSTGRES_DATABASE")
        user = get_env_var("PGUSER", "POSTGRES_USER")
        password = get_env_var("PGPASSWORD", "POSTGRES_PASSWORD")
        host = get_env_var("PGHOST", "POSTGRES_HOST", "POSTGRES_URL_NON_POOLING", "POSTGRES_PRISMA_URL")
        port = int(get_env_var("PGPORT", default=5432))
        print(f"[DEBUG] Connecting to DB host={host} dbname={dbname} user={user} port={port}")
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

        # --- HubSpot Integration ---
        HUBSPOT_TOKEN = os.environ.get("HUBSPOT_TOKEN")
        if not HUBSPOT_TOKEN:
            return jsonify({"error": "HubSpot token not set in environment variables."}), 500
        headers = {
            "Authorization": f"Bearer {HUBSPOT_TOKEN}",
            "Content-Type": "application/json"
        }
        # Map form fields to HubSpot contact properties
        contact_payload = {
            "properties": {
                "email": data.get("correo"),
                "firstname": data.get("nombre_apellido"),
                "phone": data.get("telefono"),
                "vehicle_brand": data.get("marca"),
                "vehicle_model": data.get("modelo"),
                "vehicle_year": data.get("anio"),
                "license_plate": data.get("placa"),
                "vin": data.get("vin"),
                "part_number": data.get("numero_parte"),
                "part_image": data.get("imagen_url")
            }
        }
        # Create contact
        contact_resp = requests.post(
            "https://api.hubapi.com/crm/v3/objects/contacts",
            headers=headers,
            data=json.dumps(contact_payload)
        )
        contact_id = None
        if contact_resp.ok:
            contact_id = contact_resp.json().get("id")

        # Map form fields to HubSpot deal properties
        deal_payload = {
            "properties": {
                "dealname": f"Autopart Request - {data.get('nombre_apellido', '')}",
                "email": data.get("correo"),
                "vehicle_brand": data.get("marca"),
                "vehicle_model": data.get("modelo"),
                "vehicle_year": data.get("anio"),
                "license_plate": data.get("placa"),
                "vin": data.get("vin"),
                "part_number": data.get("numero_parte"),
                "part_image": data.get("imagen_url")
            }
        }
        # Create deal
        deal_resp = requests.post(
            "https://api.hubapi.com/crm/v3/objects/deals",
            headers=headers,
            data=json.dumps(deal_payload)
        )
        deal_id = None
        if deal_resp.ok:
            deal_id = deal_resp.json().get("id")

        # Optionally associate contact and deal
        if contact_id and deal_id:
            requests.put(
                f"https://api.hubapi.com/crm/v3/objects/deals/{deal_id}/associations/contacts/{contact_id}/deal_to_contact",
                headers=headers
            )

        # --- End HubSpot Integration ---

        lang = data.get('lang', 'es')
        if lang == 'en':
            message = "Thank you. Your request has been received. We will get back to you soon."
        else:
            message = "Gracias. Tu solicitud ha sido recibida. Te responderemos en breve."
        return jsonify({"message": message}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
