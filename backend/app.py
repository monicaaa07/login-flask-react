from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load Iris dataset
df = pd.read_csv('data/iris.csv')


@app.route('/data', methods=['GET'])
def get_data():
    return df.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True)
