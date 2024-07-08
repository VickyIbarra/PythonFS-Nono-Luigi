/*funcionalidad para activar el juego de formularios*/
const $btnSignIn = document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),
      $SignUp = document.querySelector('.sign-up'),
      $SignIn = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $SignIn.classList.toggle('active');
        $SignUp.classList.toggle('active');
    }
});


/*funcionalidad para formulario registro el localStorage*/
const registro=document.querySelector('#registro')
registro.addEventListener('submit',(e) =>{
    e.preventDefault()
    const nombre=document.querySelector("#nombre").value
    const email= document.querySelector("#email").value
    const password=document.querySelector("#password").value
    const adminCode = document.querySelector("#adminCode").value;

    /*aqui verifica el codigo de administrador*/
    const ADMIN_CODE = 'secreto123';  
    const isAdmin = adminCode === ADMIN_CODE
    
    const Users= JSON.parse(localStorage.getItem('users')) || []
    const IsUserRegistered=Users.find(user =>user.email === email)
    if(IsUserRegistered){
        return alert('El usuario ya esta registrado')
    }
    
    Users.push({nombre:nombre , email:email, password:password,isAdmin: isAdmin })
    localStorage.setItem('users',JSON.stringify(Users))
    alert('Registro Exitoso')
})

/*funcionalidad para el login*/
const iniciarSesion = document.querySelector('#iniciarSesion')
    iniciarSesion.addEventListener('submit',(e) =>{
    e.preventDefault()
    const email= document.querySelector("#email").value
    const password = document.querySelector("input[name='password']").value
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const validUser= Users.find(user => user.email === email && user.password === password)
    if(!validUser){
        return alert('usuario y/o contraseña incorrectos')
    }
    
    alert(`Bienvenid@ ${validUser.nombre}`)
    if (validUser.isAdmin) {
        window.location.href = 'index_adm.html'
      } else {
        window.location.href = 'carrito.html'
      }
 })