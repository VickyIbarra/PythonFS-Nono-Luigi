
from flask import jsonify, request, redirect, render_template, url_for,flash
from app import app, db
from Modelos.usuario_modelo import Usuario
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, Length
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user

#esta funcion maneja el registro y el inicio de sesion
@app.route('/registro_login', methods=['GET', 'POST'])
def registro_login():
    if request.method == 'POST':
        form_type = request.form.get('form_type')
        
        if form_type == 'registro':
            nombre = request.form.get('nombre')
            email = request.form.get('email')
            contraseña = generate_password_hash(request.form.get('password'))
            rol = request.form.get('rol', 'usuario')  # Default role is 'usuario'
            usuario = Usuario(nombre=nombre, email=email, contraseña=contraseña, rol=rol)
            db.session.add(usuario)
            db.session.commit()
            return jsonify({'message': 'Registro exitoso, por favor inicia sesión.'})
        
        if form_type == 'iniciarSesion':
            email = request.form.get('email')
            contraseña = request.form.get('password')
            usuario = Usuario.query.filter_by(email=email).first()
            if usuario and check_password_hash(usuario.contraseña, contraseña):
                login_user(usuario)
                return jsonify({'redirect': url_for('dashboard', usuario_id=usuario.id)})
            else:
                return jsonify({'message': 'Credenciales incorrectas, por favor intenta nuevamente.'})
    
    return render_template('ingresar.html')


#la funcion dashboard es para obtener el usuario y derivarlo a su pagina correspondiente
@app.route('/dashboard/<int:usuario_id>')
@login_required
def dashboard(usuario_id):
    usuario = Usuario.query.get(usuario_id)
    if usuario.rol == 'admin':
        return render_template('index_adm.html')
    else:
        return render_template('index.html')
    

# la funcion logout cierra la sesion y la redirige al formulario
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('registro_login'))

@app.route('/')
def bienvenida():
    return "Bienvenidos al backend"   # retorna el JSON de un usuario recibido como parametro
