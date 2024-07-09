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


