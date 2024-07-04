from flask import  jsonify,request  #,Flask# del modulo flask importar la clase Flask y los métodos jsonify,request
from app import app, db,ma

from Modelos.producto_modelo import*


class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','precio','stock','codigo','imagen')


producto_schema=ProductoSchema()  # El objeto producto_schema es para traer un producto
productos_schema=ProductoSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto




# crea los endpoint o rutas (json)
@app.route('/productos_info',methods=['GET'])
def get_Productos():
    all_productos=Producto.query.all() # el metodo query.all() lo hereda de db.Model
    result=productos_schema.dump(all_productos)  #el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)     # retorna un JSON de todos los registros de la tabla




@app.route('/productos_info/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)
    return producto_schema.jsonify(producto)   # retorna el JSON de un producto recibido como parametro


@app.route('/productos_info/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()                     # confirma el delete
    return producto_schema.jsonify(producto) # me devuelve un json con el registro eliminado


@app.route('/productos_info', methods=['POST']) # crea ruta o endpoint
def create_producto():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    precio=request.json['precio']
    stock=request.json['stock']
    codigo=request.json['codigo']
    imagen=request.json['imagen']
    new_producto=Producto(nombre,precio,stock,codigo,imagen)
    db.session.add(new_producto)
    db.session.commit() # confirma el alta
    return producto_schema.jsonify(new_producto)


@app.route('/productos_info/<id>' ,methods=['PUT'])
def update_producto(id):
    producto=Producto.query.get(id)
 
    producto.nombre=request.json['nombre']
    producto.precio=request.json['precio']
    producto.stock=request.json['stock']
    producto.codigo=request.json['codigo']
    producto.imagen=request.json['imagen']


    db.session.commit()    # confirma el cambio
    return producto_schema.jsonify(producto)    # y retorna un json con el producto
 