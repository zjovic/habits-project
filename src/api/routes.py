# This module takes care of starting the API Server, Loading the DB and Adding the endpoints
import json
from flask import Flask, request, jsonify, url_for, Blueprint
import werkzeug
from api.models import db, User, Todo, Habit, Setting, HabitNumberOfRepetitions
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# REGISTER USER
@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method = 'sha256')

    new_user = User(email = data['email'], password = hashed_password, admin = 0)

    db.session.add(new_user)
    db.session.commit()

    user = User.query.filter_by(email = data['email']).first()
    new_user_settings = Setting(mode = 1, lang = 'ENG', day_start = '09:00:00', day_end = '20:00:00', user_id = user.id)

    db.session.add(new_user_settings)
    db.session.commit()

    return jsonify({'message': 'New user created'})

# LOGIN USER
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({'Message': 'Email and password are required!'}), 401

    user = User.query.filter_by(email = email).first()

    if not user:
        return jsonify({'Message': 'No user found!'}), 404
    
    if check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    
    return jsonify({'Message': 'Could not verify!'}), 401

# GET USER
@api.route('/user/<user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    user = User.query.filter_by(id = user_id).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    user_data = {}
    user_data['id'] = user.id
    user_data['email'] = user.email
    user_data['password'] = user.password
    user_data['admin'] = user.admin

    return jsonify({'user': user_data})

# GET USERS
@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()

    output = []

    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['email'] = user.email
        user_data['password'] = user.password
        user_data['admin'] = user.admin
        output.append(user_data)

    return jsonify({'users': output})


# ADD TODO
@api.route('/todo', methods=['POST'])
@jwt_required()
def add_todo():
    data = request.get_json()

    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()

    new_todo = Todo(name = data['name'], user_id = user.id)

    db.session.add(new_todo)
    db.session.commit()

    return jsonify({'message': 'New todo created'})

# GET TODO
@api.route('/todo/<todo_id>', methods=['GET'])
@jwt_required()
def get_todo(todo_id):
    todo = Todo.query.filter_by(id = todo_id).first()

    if not todo:
        return jsonify({'message': 'This todo does not exist'})

    todo_data = {}
    todo_data['id'] = todo.id
    todo_data['name'] = todo.name
    todo_data['created_at'] = todo.created_at
    todo_data['finished_at'] = todo.finished_at

    return jsonify({'todo': todo_data})

# GET TODOS
@api.route('/todos', methods=['GET'])
@jwt_required()
def get_todos():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()
    todos = Todo.query.filter_by(user_id = user.id)

    output = []

    for todo in todos:
        todo_data = {}
        todo_data['id'] = todo.id
        todo_data['name'] = todo.name
        todo_data['created_at'] = todo.created_at
        todo_data['finished_at'] = todo.finished_at
        output.append(todo_data)

    return jsonify({'todos': output})

# EDIT TODO
@api.route('/todo/<todo_id>', methods=['PUT'])
@jwt_required()
def edit_todo(todo_id):
    return ''

# ADD HABIT
@api.route('/habit', methods=['POST'])
@jwt_required()
def add_habit():
    return ''

# GET HABIT

# GET HABITS

# EDIT HABIT