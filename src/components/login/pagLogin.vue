<!--eslint-disable-->
<template>
  <div class="body">
    <div class="section">
      <div class="container">
        <div class="row full-height justify-content-center">
          <div class="col-12 text-center align-self-center py-5">
            <div class="section pb-5 pt-5 pt-sm-2 text-center">

              <div :class="['card-3d-wrap mx-auto', { active: checked }]">
                <div class="card-3d-wrapper">
                  <div class="card-front">
                    <div v-if="isLoading" class="loading-animation">

                          <div class="spinner"></div>
                          </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                      class="bi bi-chevron-left justify-content-start" viewBox="0 0 16 16" @click="Home">
                      <path fill-rule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                    <div class="center-wrap">
                      <div class="section text-center">
                        <h4 class="mb-4 pb-3">Logar</h4>
                        <div id="app">
                          <div class="form-group">
                            <input type="email" name="logemail" class="form-style" placeholder="Seu E-mail" id="logemail"
                              autocomplete="off" v-model="loginEmail" :class="{ 'invalid-input': isEmailInvalid }" />
                            <i class="input-icon uil uil-at"></i>
                            <p class="error-message" v-if="isEmailInvalid">Email inválido. Por favor, insira um email
                              válido.</p>
                          </div>
                          <div class="form-group mt-2">
                            <input type="password" name="logpass" class="form-style" placeholder="Sua Senha" id="logpass"
                              autocomplete="off" v-model="loginPassword"
                              :class="{ 'invalid-input': isPasswordInvalid }" />
                            <i class="input-icon uil uil-lock-alt"></i>
                            <p class="error-message" v-if="loginError">Tipo de usuário inválido </p>
                            <p class="error-message" v-if="credenciaisError">Email ou senha incorretos</p>
                            <p class="error-message" v-if="select">Selecione um tipo de usuário</p>
                          </div>
                          <div class="d-flex justify-content-between">
                            <div class="form-check col-sm-6 ms-5">
                              <v-radio-group v-model="selectedOption">
                                <v-radio userType="professor" value="professor" label="Professor" class="raio"></v-radio>
                              </v-radio-group>
                            </div>
                            <div class="form-check col-sm-6">
                              <v-radio-group v-model="selectedOption">
                                <v-radio userType="aluno" value="aluno" label="Aluno"></v-radio>
                              </v-radio-group>
                            </div>
                          </div>
                          <button @click="submitForm" class="btn mt-4">Enviar</button>

                        </div>
                      </div>
                      <p class="mb-0 mt-4 text-center"><a @click="cadastro()" class="link">Não possui cadastro?</a></p>
                      <p class="mb-0 mt-4 text-center"><a @click="senha()" class="link">Esqueceu a senha?</a></p>
 
                    </div>
                  </div>
                </div>
                <div class="card-back">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      checked: false,
      isProfessorChecked: "",
      isAlunoChecked: "",
      loginEmail: '',
      loginPassword: '',
      isEmailInvalid: false,
      isPasswordInvalid: false,
      confirmPassword: '',
      isSidebarOpen: false,
      password: '',
      email: '',
      name: '',
      selectedOption: '',
      loginError: false,
      credenciaisError: false,
      select: '',
      isLoading: false,
    };
  },

  methods: {
    validateEmail(email) {
      const emailRegex = /.+/;
      return emailRegex.test(email);
    },

    handleCheck() {
      this.checked = !this.checked;
    },

    Home() {
      this.$router.push('/');
    },

    cadastro() {
      this.$router.push('/cadastro');
    },

    senha() {
      this.$router.push('/senha');
    },

    //verifica a validação do email 
    submitForm() {

      if (!this.validateEmail(this.loginEmail)) {
        this.isEmailInvalid = true;
        this.isPasswordInvalid = false;
        return;
      }

      if (!this.loginPassword.length) {
        this.isEmailInvalid = false;
        this.isPasswordInvalid = true;
        return;
      }

      //define qual será o tipo de usuario logado
      let userType = '';
      if (this.selectedOption === 'professor') {
        userType = 'professor';
        this.select = false;
      } 
      
      else if (this.selectedOption === 'aluno') {
        userType = 'aluno';
        this.select = false;
      } else {
        console.log('Por favor, selecione um tipo de usuário.');
        this.select = true;
        return;
      }

      this.loginError = false;
      this.credenciaisError = false;
      this.select = false;
      //informações que foram enviadas na requisição
    
      const formData = {
        email: this.loginEmail,
        senha: this.loginPassword,
        userType: userType
      };

      this.isLoading = true;
 
      axios
        .post('https://api-thesis-track.vercel.app/user/login', formData)
        .then((response) => {
          console.log(response);

          if (response.data.auth) {
            if ((userType == 'professor' && response.data.user.professor === 1) ||
              (userType == 'aluno' && response.data.user.professor === 0)) {
              //salvando informações nos cookies definindo seu tempo 
              axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
              Cookies.set('token', response.data.token, { expires: 8 / 24 });
              localStorage.setItem('token', response.data.token);
              Cookies.set('userType', userType, { expires: 8 / 24 });
              Cookies.set('id', response.data.user.id, { expires: 8 / 24 });
              if (userType == 'professor') {

                this.$router.push('/Professor');
                window.location.reload();
                this.isLoading = true;
              } else if (userType == 'aluno') {
                this.$router.push('/Professor');
                window.location.reload();
                this.isLoading = true;
              }
            } else {
              this.isLoading = false;
              console.log('Tipo de usuário inválido');
              this.loginError = true;
            }
          } else {
            this.isLoading = false;
            console.log('Credenciais inválidas');
            this.credenciaisError = true;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              // Email não cadastrado
              console.log('Email não cadastrado');
              this.isLoading = false;
            } else {
              // Outros erros de resposta
              console.error(error.response.data);
              this.isLoading = false;
            }
          } else {
            // Erro de requisição
            console.error(error);
          }
        });
    },
    exibirDados() {
      const dados = {
        email: this.loginEmail,
        senha: this.loginPassword
      };
      const dadosJSON = JSON.stringify(dados);
      console.log(dadosJSON);
    }
  }

};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900');

.loading-animation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  position: fixed;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 9999;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.v-input__control {
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;
  justify-content: center;

}

.bi {
  margin-left: -25rem !important;
  margin-top: 1rem;
  cursor: pointer;
}

.body {
  font-family: 'Poppins', sans-serif;
  background-color: #1B2F4A;
}

.logo-cici {
  margin-right: 3080px;
  margin-bottom: -130px;
}

a {
  cursor: pointer;
  transition: all 200ms linear;
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

.link {
  color: #000;
}

.link:hover {
  color: #1B2F4A;
}

p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;

}

.invalid-input {
  border-color: red;
}

.error-message {
  color: red;
  margin-top: 5px;
  font-size: 14px;
}

h4 {
  font-weight: 600;
  color: #1B2F4A;
}

h6 span {
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
}

.section {
  position: relative;
  width: 100%;
  display: block;
}

.full-height {
  min-height: 100vh;
}

.checkbox:checked+label,
.checkbox:not(:checked)+label {
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #fff;
}

.checkbox:checked+label:before,
.checkbox:not(:checked)+label:before {
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  background-color: #102770;
  font-family: 'unicons', sans-serif;
  content: '\eb4f';
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}

.card-3d-wrap {
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 550px;
  perspective: 800px;
  margin-top: 60px;
}

.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  transition: all 600ms ease-out;

}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  background-color: #E6E6E6;
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}


.center-wrap {
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}

.form-group {
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
}

.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #1f2029;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
}

.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2);
}

.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #fff;
}

.input {
  cursor: pointer;
}

.btn {
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  padding: 0 30px;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  text-align: center;
  border: none;
  background-color: #fff;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255, 235, 167, .2);
}

.btn:active,
.btn:focus {
  background-color: #102770;
  color: #fff;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, .2);
}

.btn:hover {
  background-color: #102770;
  color: #fff;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, .2);
}

.logo {
  position: absolute;
  top: 30px;
  right: 30px;
  display: block;
  z-index: 100;
  transition: all 250ms linear;
}

.logo img {
  height: 26px;
  width: auto;
  display: block;
}
</style>