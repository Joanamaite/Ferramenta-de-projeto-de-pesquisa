<!-- eslint-disable vue/multi-word-component-names -->
<template id="template">
  <div
    v-if="$route.path !== '/login' && $route.path !== '/cadastro' && $route.path !== '/Login' && $route.path !== '/senha' && $route.path !== '/enviar'">
    <v-app-bar app dark color="#1B2F4A">
      <div id="body container-fluid navbar navbar-expand-lg bg-body-tertiary">
        <div class="header" id="header">
          <button @click="toggleSidebar" class="btn_icon_header">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-list"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
          <div class="logo_header col-md-10">
            <img src="Images/Logo.png" alt="Logo GN" class="img_logo_header img-fluid" @click="escola">
          </div>

          <div class="navigation_header" :class="{ showSidebar: isMenuOpen }" id="navigation_header">
            <button @click="toggleSidebar" class="btn_icon_header">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x mt-5"
                viewBox="0 0 16 16">
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>

            <!--header dos professores-->
            <!--header dos alunos-->
            <div class="ajustando" v-if="userType === 'professor'">

              <v-btn text class="itens_header" @click="professor()">INÍCIO</v-btn>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn class="itens_header  col-md-2 col-sm-2" text v-on="on">CURSOS</v-btn>
                </template>
                <v-list class="lista">
                  <v-list-item @click="cursos(course.id)" v-for="course in courses" :key="course.id" class="itemDrop">
                    {{ course.name }}
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-btn text class="button-item itens_header margin" @click="projetos()">PROJETOS</v-btn>
              <v-container>
                <v-row justify="center">
                  <v-menu bottom min-width="200px" rounded offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn icon x-large v-on="on">
                        <v-img src="Images/icone.png" class="imagemIcone" size="40">

                        </v-img>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-list-item-content class="justify-center">
                        <div class="mx-auto text-center">
                          <v-img src="Images/icone.png" class="imagemIcone">

                          </v-img>
                          <h3>{{ userName }}</h3>
                          <p class="text-caption mt-1">
                            {{ userEmail }}
                          </p>
                          <v-divider class="my-3"></v-divider>
                          <v-btn depressed rounded text @click="logout">
                            Deslogar
                          </v-btn>
                          <v-divider class="my-3"></v-divider>
                          <v-btn depressed rounded text @click="trocaSenha">
                            Troca de senha
                          </v-btn>
                        </div>
                      </v-list-item-content>
                    </v-card>
                  </v-menu>
                </v-row>
              </v-container>
              <div class="search-box telaMenor">
                <input class="search-txt" type="text" name="" placeholder="Tecle para pesquisar" v-model="searchQuery">
                <button class="search-button" @click="searchProjectsHome">
                  <i class="fa-solid fa-magnifying-glass" style="color: #1B2F4A;"></i>
                </button>


              </div>


            </div>


            <!--header dos alunos-->
            <div class="ajustando" v-else-if="userType === 'aluno'">
               <v-btn text class="itens_header" @click="professor()">INÍCIO</v-btn>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn class="itens_header  col-md-2 col-sm-2" text v-on="on">CURSOS</v-btn>
                </template>
                <v-list class="lista">
                  <v-list-item @click="cursos(course.id)" v-for="course in courses" :key="course.id" class="itemDrop">
                    {{ course.name }}
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-btn text class="button-item itens_header margin" @click="projetos()">PROJETOS</v-btn>
              <v-container>
                <v-row justify="center">
                  <v-menu bottom min-width="200px" rounded offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn icon x-large v-on="on">
                        <v-img src="Images/icone.png" class="imagemIcone" size="40">

                        </v-img>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-list-item-content class="justify-center">
                        <div class="mx-auto text-center">
                          <v-img src="Images/icone.png" class="imagemIcone">

                          </v-img>
                          <h3>{{ userName }}</h3>
                          <p class="text-caption mt-1">
                            {{ userEmail }}
                          </p>
                          <v-divider class="my-3"></v-divider>
                          <v-btn depressed rounded text @click="logout">
                            Deslogar
                          </v-btn>
                          <v-divider class="my-3"></v-divider>
                          <v-btn depressed rounded text @click="trocaSenha">
                            Troca de senha
                          </v-btn>
                        </div>
                      </v-list-item-content>
                    </v-card>
                  </v-menu>
                </v-row>
              </v-container>
              <div class="search-box telaMenor">
                <input class="search-txt" type="text" name="" placeholder="Tecle para pesquisar" v-model="searchQuery">
                <button class="search-button" @click="searchProjectsHome">
                  <i class="fa-solid fa-magnifying-glass" style="color: #1B2F4A;"></i>
                </button>


              </div>

            </div>
            <!--header usuario não logados-->
            <div class="ajustando" v-else>
              <v-btn text class=" itens_header col-md-2 col-sm-2" @click="home()">INÍCIO</v-btn>
              <div class="button-group">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn class="itens_header col-md-2 col-sm-2" text v-on="on">CURSOS</v-btn>
                  </template>
                  <v-list class="lista">
                    <v-list-item @click="cursos(course.id)" v-for="course in courses" :key="course.id">
                      {{ course.name }}
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <v-btn text class=" itens_header" @click="login()">ENTRAR</v-btn>
            </div>
          </div>
          <div class="search-box display">
                <input class="search-txt" type="text" name="" placeholder="Tecle para pesquisar" v-model="searchQuery">
                <button class="search-button" @click="searchProjectsHome">
                  <i class="fa-solid fa-magnifying-glass" style="color: #1B2F4A;"></i>
                </button>


              </div>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>


<script>
import Cookies from 'js-cookie';
import axios from 'axios';
export default {
  computed: {
    userType() {
      return Cookies.get('userType') || 'default';
    },
    userName() {
      const userName = Cookies.get('userName');
      return userName || 'default';
    },
    userEmail() {
      const userEmail = Cookies.get('userEmail');
      return userEmail || 'default';
    },
  },
  created() {
    // Verifique se o usuário já fez login e atualize o userType com base nos cookies.
    this.updateUserTypeFromCookies();
  },
  data() {
    return {
      searchQuery: '',
      searchQueryAno: '',
      searchOption: '',
      isMenuOpen: false,
      drawer: null,
      items: [
        { title: 'Deslogar', icon: 'mdi-view-dashboard' },//botão de deslogar
      ],
      courses: [
        { id: 3, name: 'Informática' },
        { id: 4, name: 'Meio ambiente' },
        { id: 5, name: 'Eletrônica' },
        { id: 6, name: 'Mecânica' },
        { id: 7, name: 'Química' },
        { id: 8, name: 'Design de móveis' },
        { id: 9, name: 'Eletrotécnica' },
        { id: 10, name: 'Móveis' },
      ],
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },

  methods: {
    redirectAndCloseMenu(path) {
      this.$router.push(path); // Redirecionar para a página desejada
      this.isMenuOpen = false; // Fechar o menu
    },
    async searchProjectsHome() {
      try {
        if (this.searchQuery && /^\d{4}$/.test(this.searchQuery)) {
          // Se a pesquisa contém um ano válido (4 dígitos numéricos), pesquise por ano
          const response = await axios.get('https://api-thesis-track.vercel.app/buscar-projetos/ano', {
            params: { ano: this.searchQuery },
          });
          this.projects = response.data.data;
        } else {
          // Caso contrário, pesquise por título
          const response = await axios.get('https://api-thesis-track.vercel.app/buscar-projetos', {
            params: { titulo: this.searchQuery },
          });
          this.projects = response.data.data;
        }
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        alert('Erro ao buscar projetos. Tente novamente.');
      }
    },


    connect(index) {
      this.activeIndex = index;

    },

    updateUserTypeFromCookies() {
      const userType = Cookies.get('userType');
      if (userType) {
        this.$data.userType = userType;
      }
    },
    //botão de logout para deslogar usuario da conta
    logout() {
      localStorage.removeItem('token');
      Cookies.remove('token');
      Cookies.remove('userType');
      Cookies.remove('userName');
      this.$router.push('/');
      window.location.reload();
    },
    trocaSenha() {
      this.$router.push('/enviar');
    },
    escola() {
      window.open("http://www.cimol.g12.br/", "_blank"); //leva para o site do cimol
    },
    login() {
      this.$router.push("/login"); //Já existe
    },
    cadastro() {
      this.$router.push("/cadastro"); //Já existe
    },
    cursos(courseId) {
      this.$router.push(`/Cursos/${courseId}`);
      this.toggleSidebar();
    },
    home() {
      this.$router.push("/"); //Já existe
    },
    exemplos() {
      this.$router.push("/exemplos"); //já existe
    },
    projetos() {
      this.$router.push("/projetos");
      this.toggleSidebar();
    },
    professor() {
      this.$router.push("/Professor");
      this.toggleSidebar();
    },
    aluno() {
      this.$router.push("/Aluno");
    },
    AreaAluno() {
      this.$router.push("/AreaAluno");
    },
    handleResize() {
      const screenWidth = window.innerWidth;
      const navigationHeader = document.querySelector(".navigation_header");

      if (screenWidth > 675) {
        navigationHeader.classList.remove("menu-aberto");
      }

    },

    toggleMenu() {
      const navigationHeader = document.querySelector(".navigation_header");
      navigationHeader.classList.toggle("menu-open");
    },

    toggleSidebar() {
      const navigationHeader = document.getElementById('navigation_header');
      navigationHeader.classList.toggle("showSidebar");
      const content = document.getElementById('content');
      content.classList.toggle("showSidebar");
      this.isMenuOpen = !this.isMenuOpen;

      setTimeout(() => {
        const navigationHeader = document.getElementById('navigation_header');
        navigationHeader.classList.remove('showSidebar');
        const content = document.getElementById('content');
        content.classList.remove('showSidebar');
      }, 300);
    },

    closeSidebar() {
      const navigationHeader = document.getElementById('navigation_header');
      navigationHeader.classList.remove("showSidebar");
      const content = document.getElementById('content');
      content.classList.remove("showSidebar");
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#template {
  background-color: #ffff;
}

.button-group {
  display: flex;
  align-items: center;
}
.display{
  display:none !important;
}

.imagemIcone {
  width: 0.2vw;
  align-items: center !important;
}

.ajustando {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.select {
  border: #fff 1px solid;
}

.search-box {
  position: absolute;
  margin-left: auto;
  top: 18%;
  left: 70%;
  background: #1B2F4A;
  height: 40px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  border: 2px solid #fff;

}

.margin {
  margin-right: 7% !important;
}

.search-button {
  float: right;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
}

.search-box:hover>.search-txt {
  width: 300px;
  padding: 0 7.5px;
}

.search-box:hover>.search-button {
  background: #ffffff;
}

.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: #ffffff;
  font-size: 20px;
  transition: 0.4s;
  line-height: 50px;
  width: 0;
}


.button-group {
  display: flex;
  align-items: center;
}


.email {
  font-size: 1vw;
  margin-top: 0.5rem;
}

.imagem {
  width: 3vw;
  border-radius: 20px;
  cursor: pointer;
  justify-content: end;
}

.perfil {
  background-color: #1B2F4A !important;
}

.color {
  background-color: transparent !important;
  width: 8vw;
  border: none !important;
  box-shadow: none !important;
}

.logo_header {
  height: 8.5vh;
  margin-bottom: 1rem;
}

.btn_icon_header {
  background-color: transparent;
  border: none;
  color: #ffff;
  cursor: pointer;
  display: none;
}

.bi.bi-x {
  background-color: transparent;
}

.img_logo_header {
  width: 35px;
}

.header,
.navigation_header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header {
  background-color: var(--color-dark2);
  height: 3.5em;
  box-shadow: 1px 1px 4px var(--color-dark4);
}

.content {
  padding-top: 5em;
  text-align: center;
  height: 100vh;
  transition: 1s;
}

.active {
  background: var(--color-dark3);
  padding: 10px;
  border-radius: 10px;
}

.btn_icon_header {
  background: transparent;
  border: none;
  color: var(--color-white);
  cursor: pointer;
  display: none;
}

.itens_header {
  width: 4vw;
  margin-left: 3.5rem;
  margin-right: 0.3rem;
}

@media screen and (max-width: 675px) {
  .search-box{
    top:60%;
    left:40%;

  }
  .telaMenor{
    display:none;
  }
  .display{
    top:10%;
    display:flex !important;
  }
  .margin {
  margin-right: 0% !important;
}
  .search-box:hover>.search-txt{
    width:150px;
  }
  .search-button{
    widows: 10vw;
  }
  .navigation_header {
    position: absolute;
    flex-direction: column !important;
    top: 0;
    height: 100vh;
    width: 60vw;
    margin-left: -100vw;
    background-color: #1B2F4A;
    backdrop-filter: blur(50px);
    z-index: 1;
    transform-origin: top right;
    opacity: 0;
  }

  .container {
    margin-left: 0 !important;
  }

  .v-application--is-ltr {
    margin-left: 0 !important;
  }

  .ajustando {
    flex-direction: column;
  }

  .menu-aberto {
    flex-direction: column !important;
  }

  .button-group {
    display: block;
  }

  .navbar {
    background-color: #1B2F4A !important;
  }

  #body {
    background-color: #1B2F4A !important;
  }

  .itens_header {
    width: 30vw;
    height: 5vh !important;
    margin-top: 2rem;
    padding: 0% !important;
    display: block;
    z-index: 5;
    margin-left: 0%;
  }

  .v-menu__content {
    width: 20%;
    background-color: #fff;
  }

  .v-list-item {
    font-size: 2.5vw;
  }

  .lista {
    z-index: 3;
    background-color: #fff;
  }

  .btn_icon_header {
    display: block;
  }

  .showSidebar {
    margin-left: -10vw;
    background-color: #1b2f4a7e !important;
    transform: scale(1);
    opacity: 1;
    animation: 0.5s ease-in-out;
    animation: bubble 0.5s ease-in-out;

  }

  .img_logo_header {
    display: none;
  }

  .imagem {
    display: none;
  }
}

@media screen and (max-width: 409px) {
  v-app-bar {
    width: 20vw;
  }

  .itemDrop {
    font-size: 3vw;
    text-align: center;
  }
}


@keyframes bubble {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>