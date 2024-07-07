from flask import Flask #,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import LoginManager

app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend

app.config.from_object('config.Config')#agrego yo


# configuro la base de datos, con el nombre el usuario y la clave
#app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:root@localhost/productos_adm'
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:1234@localhost/USUARIO'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none


db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow

login_manager = LoginManager()#agrego yo estos 3
login_manager.init_app(app)
login_manager.login_view = 'registro_login'

from Controladores.producto_controlador import *
from Controladores.usuario_controlador import *


#from controladores.tipoProducto_controlador import *


# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)    # ejecuta el servidor Flask en el puerto 5000
