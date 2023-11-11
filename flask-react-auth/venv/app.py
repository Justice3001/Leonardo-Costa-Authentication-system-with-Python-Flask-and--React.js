from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
app = Flask(__name__)
CORS(app, supports_credentials=True, origin='http://localhost:3000', allow_headers=['Content-Type'])

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

@app.route('/')
def hello():
    return jsonify(message='Hello, Flask is up and running!')

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']

    hashed_password = generate_password_hash(password, method='sha256')

    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful'})

# Protected route example
@app.route('/protected')
def protected():
    if 'user_id' in session:
        return jsonify(message='This is a protected route!')
    else:
        return jsonify(message='Unauthorized'), 401

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
