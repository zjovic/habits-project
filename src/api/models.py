from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    admin = db.Column(db.Boolean)

    setting = relationship('Setting', backref='user')
    todo = relationship('Todo', backref='user')
    habit = relationship('Habit', backref='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'admin': self.admin
        }

class Setting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    mode = db.Column(db.Integer, unique=False, nullable=False)
    lang = db.Column(db.String(3), unique=False, nullable=False)
    day_start = db.Column(db.Time, unique=False, nullable=False)
    day_end = db.Column(db.Time, unique=False, nullable=False)

    def __repr__(self):
        return f'<Setting {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'mode': self.mode,
            'lang': self.lang,
            'day_start': self.day_start.strftime("%H:%M:%S"),
            'day_end': self.day_end.strftime("%H:%M:%S"),
        }

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    name = db.Column(db.String(150), unique=False, nullable=False)
    state = db.Column(db.Integer, unique=False, default=1)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f'<Todo {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'state': self.state,
            'created_at': self.created_at
        }

class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    name = db.Column(db.String(150), unique=False, nullable=False)
    type = db.Column(db.Integer, unique=False, nullable=False, default=1)
    num_of_repetitions = db.Column(db.Integer, unique=False, nullable=False)
    num_times_repeated = db.Column(db.Integer, unique=False, nullable=False, default=0)
    editable = db.Column(db.Boolean, default=True)

    habit = relationship('Statistic', backref='habit')

    def __repr__(self):
        return f'<Habit {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'type': self.type,
            'num_of_repetitions': self.num_of_repetitions,
            'num_times_repeated': self.num_times_repeated,
            'editable': self.editable
        }

class Statistic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    habit_id = db.Column(db.Integer,db.ForeignKey('habit.id'))
    reps = db.Column(db.Integer, unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    def __repr__(self):
        return f'<Statistic {self.id}>'

    def serialize(self):
        return {
            'id': self.id,
            'habit_id': self.habit_id,
            'reps': self.reps,
            'created_at': self.created_at,
        }
