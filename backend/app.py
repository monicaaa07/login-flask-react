from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a secure key

# Apply CORS to the entire app
CORS(app, supports_credentials=True)

# Load your data
df = pd.read_csv('data/iris.csv')

# User database
users = {
    'setosa_user@example.com': 'Iris-setosa',
    'virginica_user@example.com': 'Iris-virginica'
}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    if email in users:
        # Create a token
        token = jwt.encode({
            'email': email,
            'variety': users[email],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({'message': 'Login successful', 'variety': users[email], 'token': token})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    # For JWT, logout is usually done on the client side by deleting the token
    return jsonify({'message': 'Logout successful, token invalidation handled client-side'})

@app.route('/data', methods=['GET'])
def get_data():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Unauthorized'}), 401

    try:
        # Split "Bearer " from the token
        token = token.split(" ")[1]
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        variety = decoded['variety']
        
        # Filter the data based on the user's variety
        filtered_data = df[df['variety'] == variety]
        return filtered_data.to_json(orient='records')
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

if __name__ == '__main__':
    app.run(debug=True)
