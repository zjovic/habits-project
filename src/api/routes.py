# This module takes care of starting the API Server, Loading the DB and Adding the endpoints
import json
from flask import Flask, request, jsonify, url_for, Blueprint
import werkzeug
from api.models import db, User, Todo, Habit, Setting, Statistic
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime

api = Blueprint('api', __name__)

# add validations to routes

# REGISTER USER
@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    if not data['email']:
        return jsonify({"msg":'Email is required data', 'status': '1'}), 400
    if not data['name']:
        return jsonify({"msg":'Name is required data'}), 400
    if not data['password']:
        return jsonify({"msg":'Password is required data'}), 400
    if len(data['password']) < 5:
        return jsonify({"msg":'Password is to short', 'status': '4'}), 400
    
        
    hashed_password = generate_password_hash(data['password'], method = 'sha256')

    new_user = User(email = data['email'], name = data['name'], password = hashed_password, admin = 0)

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
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    settings = Setting.query.filter_by(user_id = user.id).first()

    user_data = {}
    user_data['id'] = user.id
    user_data['email'] = user.email
    user_data['name'] = user.name
    user_data['admin'] = user.admin
    user_data['mode'] = settings.mode
    user_data['lang'] = settings.lang
    user_data['day_start'] = settings.day_start.strftime("%H:%M:%S")
    user_data['day_end'] = settings.day_end.strftime("%H:%M:%S")

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
        user_data['name'] = user.name
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
    
    return jsonify(new_todo.serialize()), 200

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
    todo_data['state'] = todo.state

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
        todo_data['state'] = todo.state
        output.append(todo_data)

    return jsonify({'todos': output})

# DELETE TODO
@api.route('/todo/<todo_id>', methods=['DELETE'])
@jwt_required()
def delete_todo(todo_id):
        todo = Todo.query.filter_by(id=todo_id).first()
        
        if not todo:
            return jsonify({'message': 'This todo does not exist'})
  
        db.session.delete(todo)
        db.session.commit()

        return jsonify(todo.serialize()),200

# TOGGLE TODO
@api.route('/todo/<todo_id>', methods=['PUT'])
@jwt_required()
def edit_todo(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
        
    if not todo:
        return jsonify({'message': 'This todo does not exist'})

    new_state = 1 if todo.state == 0 else 0

    setattr(todo, 'state', new_state)

    db.session.commit()
    
    return jsonify(todo.serialize()),200

# ADD HABIT
@api.route('/habit', methods=['POST'])
@jwt_required()
def add_habit():
    data = request.get_json()

    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()

    new_habit = Habit(name = data['name'], type = data['type'], num_of_repetitions = data['num_of_repetitions'], user_id = user.id)

    db.session.add(new_habit)
    db.session.commit()

    return jsonify(new_habit.serialize()), 200

# GET HABITS
@api.route('/habits', methods=['GET'])
@jwt_required()
def get_habits():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()
    habits = Habit.query.filter_by(user_id = user.id)

    output = []

    for habit in habits:
        habit_data = {}
        habit_data['id'] = habit.id
        habit_data['name'] = habit.name
        habit_data['type'] = habit.type
        habit_data['num_of_repetitions'] = habit.num_of_repetitions
        habit_data['num_times_repeated'] = habit.num_times_repeated
        habit_data['editable'] = habit.editable
        output.append(habit_data)

    return jsonify({'habits': output})

# GET HABIT
@api.route('/habit/<habit_id>', methods=['GET'])
@jwt_required()
def get_habit(habit_id):
    habit = Habit.query.filter_by(id = habit_id).first()

    if not habit:
        return jsonify({'message': 'This habit does not exist'})

    habit_data = {}
    habit_data['id'] = habit.id
    habit_data['name'] = habit.name
    habit_data['type'] = habit.type
    habit_data['num_of_repetitions'] = habit.num_of_repetitions
    habit_data['num_times_repeated'] = habit.num_times_repeated
    habit_data['editable'] = habit.editable

    return jsonify({'habit': habit_data})

# EDIT HABIT
@api.route('/habit/<habit_id>', methods=['PUT'])
@jwt_required()
def edit_habit(habit_id):
    data = request.get_json()

    habit = Habit.query.filter_by(id = habit_id).first()

    if not habit:
        return jsonify({'message': 'This habit does not exist'}), 500
    
    setattr(habit, 'name', data['name'])
    setattr(habit, 'type', data['type'])
    setattr(habit, 'num_of_repetitions', data['num_of_repetitions'])
    setattr(habit, 'num_times_repeated', data['num_times_repeated'])
    
    db.session.commit()
    return jsonify(habit.serialize()), 200

# DELETE HABIT
@api.route('/habit/<habit_id>', methods=['DELETE'])
@jwt_required()
def delete_habit(habit_id):
        habit = Habit.query.filter_by(id=habit_id).first()
        
        if not habit:
            return jsonify({'message': 'This todo does not exist'})
  
        db.session.delete(habit)
        db.session.commit()

        return jsonify({'message': 'Habit deleted'}),200

# GET SETTINGS
@api.route('/settings', methods=['GET'])
@jwt_required()
def get_settings():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()

    data = Setting.query.filter_by(user_id = user.id).first()

    if not data:
        return jsonify({'message': 'This todo does not exist'})

    setting_data = {}
    setting_data['id'] = data.id
    setting_data['mode'] = data.mode
    setting_data['lang'] = data.lang
    setting_data['day_start'] = data.day_start.strftime("%H:%M:%S")
    setting_data['day_end'] = data.day_end.strftime("%H:%M:%S")

    return jsonify({'settings': setting_data})

# EDIT SETTINGS
@api.route('/settings', methods=['PUT'])
@jwt_required()
def edit_settings():
    data = request.get_json(force=True)
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()

    if not user:
        return jsonify({'message': 'This user does not exist'}), 500

    settings = Setting.query.filter_by(user_id = user.id).first()
    
    setattr(settings, 'mode', data['mode'])
    setattr(settings, 'lang', data['lang'])
    setattr(settings, 'day_start', data['day_start'])
    setattr(settings, 'day_end', data['day_end'])
    
    db.session.commit()

    return jsonify(settings.serialize()), 200

# CHANGE PASSWORD
@api.route('/password', methods=['PUT'])
@jwt_required()
def edit_password():
    data = request.get_json()
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()

    if not user:
        return jsonify({'message': 'This user does not exist'}), 500

    if not check_password_hash(user.password, data['current_password']):
        return jsonify({'message': 'Wrong password!'}), 500

    hashed_new_password = generate_password_hash(data['new_password'], method = 'sha256')

    setattr(user, 'password', hashed_new_password)
    
    db.session.commit()

    return jsonify({'message': 'Password changed'})

# CHANGE NAME
@api.route('/user/name', methods=['PUT'])
@jwt_required()
def edit_name():
    data = request.get_json()
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()

    if not user:
        return jsonify({'message': 'This user does not exist'}), 500
    
    setattr(user, 'name', data['name'])
    
    db.session.commit()

    return jsonify(user.serialize()), 200

# RESET HABITS FOR THE DAY
@api.route('/habits/reset', methods=['POST'])
@jwt_required()
def reset_habits():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()

    if not user:
        return jsonify({'message': 'This user does not exist'}), 500

    habits = Habit.query.filter_by(user_id = user.id)

    output = []
    
    for habit in habits:
        if (habit.editable == False):
            return jsonify({'message': 'Day already finished'}), 500

        recordStatistic = Statistic(habit_id = habit.id, reps = habit.num_times_repeated)
        setattr(habit, 'num_times_repeated', 0)
        setattr(habit, 'editable', False)

        db.session.add(recordStatistic)
        db.session.commit()

        habit_data = {}
        habit_data['id'] = habit.id
        habit_data['name'] = habit.name
        habit_data['type'] = habit.type
        habit_data['num_of_repetitions'] = habit.num_of_repetitions
        habit_data['num_times_repeated'] = habit.num_times_repeated
        habit_data['editable'] = habit.editable
        output.append(habit_data)

    return jsonify({'habits': output}), 200

# GET HABITS STATS
@api.route('/habits/stats', methods=['GET'])
@jwt_required()
def get_habits_stats():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()
    habits = Habit.query.filter_by(user_id = user.id)

    habitIds = []
    for habit in habits:
        habitIds.append(habit.id)

    stats = db.session.query(Statistic).join(Habit).filter(Habit.id.in_(habitIds)).all()

    output = []

    for stat in stats:
        stat_data = {}
        stat_data['id'] = stat.id
        stat_data['habit_id'] = stat.habit_id
        stat_data['reps'] = stat.reps
        stat_data['created_at'] = datetime.strftime(stat.created_at,"%Y-%m-%d")
        stat_data['type'] = stat.habit.type
        output.append(stat_data)

    return jsonify({'stats': output})