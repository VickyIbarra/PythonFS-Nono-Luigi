from flask import  jsonify,request  #,Flask# del modulo flask importar la clase Flask y los métodos jsonify,request
from app import app, db,ma

from Modelos.usuario_modelo import*


class UsuarioSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','email','contraseña','rol')


usuario_schema=UsuarioSchema()  # El objeto producto_schema es para traer un producto
usuarios_schema=UsuarioSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto




# crea los endpoint o rutas (json)
@app.route('/usuarios_info',methods=['GET'])
def get_Usuarios():
    all_usuarios=Usuario.query.all() # el metodo query.all() lo hereda de db.Model
    result=usuarios_schema.dump(all_usuarios)  #el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)     # retorna un JSON de todos los registros de la tabla




@app.route('/usuarios_info/<id>',methods=['GET'])
def get_usuario(id):
    usuario=Usuario.query.get(id)
    return usuario_schema.jsonify(usuario)   # retorna el JSON de un producto recibido como parametro


@app.route('/usuarios_info/<id>',methods=['DELETE'])
def delete_usuario(id):
    usuario=Usuario.query.get(id)
    db.session.delete(usuario)
    db.session.commit()                     # confirma el delete
    return usuario_schema.jsonify(usuario) # me devuelve un json con el registro eliminado


@app.route('/usuarios_info', methods=['POST']) # crea ruta o endpoint
def create_usuario():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    email=request.json['email']
    contraseña=request.json['contraseña']
    rol=request.json['rol']
    new_usuario=Usuario(nombre,email,contraseña,rol)
    db.session.add(new_usuario)
    db.session.commit() # confirma el alta
    return usuario_schema.jsonify(new_usuario)


@app.route('/usuarios_info/<id>' ,methods=['PUT'])
def update_usuario(id):
    usuario=Usuario.query.get(id)
    usuario.nombre=request.json['nombre']
    usuario.email=request.json['email']
    usuario.contraseña=request.json['contraseña']
    usuario.rol=request.json['rol']

    db.session.commit()    # confirma el cambio
    return usuario_schema.jsonify(usuario)    # y retorna un json con el producto
 