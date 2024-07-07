from app import app, db          #,ma

from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship
from flask_login import UserMixin

# defino las tablas
class Usuario(db.Model, UserMixin):       
    id=db.Column(db.Integer, primary_key=True)   
    nombre=db.Column(db.String(100))
    email=db.Column(db.String(100), unique=True)
    contraseña=db.Column(db.String(100))
    rol= db.Column(db.String(10))
   
    def __init__(self,nombre,email,contraseña,rol):   #crea el  constructor de la clase
        self.nombre=nombre   # no hace fñaalta el id porque lo crea sola mysql por ser auto_incremento
        self.email=email
        self.contraseña=contraseña
        self.rol=rol


with app.app_context():
    db.create_all()  # aqui crea todas las tablas
