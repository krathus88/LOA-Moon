import sqlite3
import gzip
import io
import base64
import json
from django.db import transaction


def parse_db_file(db_file_path):
    # Connect to the SQLite database
    conn = sqlite3.connect(db_file_path)
    cursor = conn.cursor()

    # Fetch all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    for (table_name,) in tables:
        # Fetch all data from the table
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()

        # Fetch the column names
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = [info[1] for info in cursor.fetchall()]

        # Process the rows
        for row in rows:
            data = dict(zip(columns, row))

            # Process specific table data
            if (
                table_name == "entity"
                and data["encounter_id"] == 680
                and data["npc_id"] == 0
            ):
                print(data["dps"])

            # Now you can process `data` and insert it into your PostgreSQL DB
            """ process_data_and_insert_into_postgresql(table_name, data) """

    # Close the connection
    conn.close()


def decompress_and_decode(data):
    """Attempt to decompress and decode the data."""
    try:
        # Attempt to decompress the data
        with gzip.GzipFile(fileobj=io.BytesIO(data), mode="rb") as f:
            decompressed_data = f.read()
    except (OSError, EOFError):
        try:
            decompressed_data = base64.b64decode(data, validate=True)
        except (base64.binascii.Error, TypeError) as e:
            print(f"Base64 decoding failed: {e}")
            return None
    except Exception as e:
        print(f"Unexpected error during decompression: {e}")
        return None

    try:
        return decompressed_data.decode("utf-8")
    except UnicodeDecodeError:
        try:
            return decompressed_data.decode("latin-1")
        except UnicodeDecodeError:
            return base64.b64encode(decompressed_data).decode("ascii")


""" def process_data_and_insert_into_postgresql(table_name, data):
    with transaction.atomic():
        if table_name == "your_specific_table":
            instance = YourDjangoModel.objects.create(
                field1=data["column1"],
                field2=data["column2"],
                # map more fields...
            )
            instance.save() """
