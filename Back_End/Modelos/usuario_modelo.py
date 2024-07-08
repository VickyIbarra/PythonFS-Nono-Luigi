from app import app, db   #,ma
from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship

# defino las tablas
class Usuario(db.Model):   # la clase Usuario hereda de db.Model de SQLAlquemy   
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    email=db.Column(db.String(200))
    contraseña=db.Column(db.String(400))
    rol=db.Column(db.Integer)
    def __init__(self,nombre,email,contraseña,rol): #crea el  constructor de la clase
        self.nombre=nombre # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.email=email
        self.contraseña=contraseña
        self.rol=rol

    #  si hay que crear mas tablas , se hace aqui


with app.app_context():
    db.create_all()  # aqui crea todas las tablas si es que no estan creadas
