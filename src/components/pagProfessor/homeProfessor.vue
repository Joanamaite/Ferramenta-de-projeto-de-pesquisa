<template>
  <div>
    <div class="imagemFundo col-sm-12">
      <div class="container">
        <!--Caso o aluno esteja logado ele direciona este texto e imagem-->
        <div class="row" v-if="userType === 'aluno'">
          <div class="col-sm-8">
            <h1 class="escreva fade-up">Olá {{ userName }}, Desenvolva todos os seus projetos aqui na nossa plataforma</h1>
          </div>
          <div class="col-sm-4">
            <img src="Images/image 40.png" class="imagem">
          </div>
        </div>

        <!--Caso o professor esteja logado ele direciona este texto e imagem-->
        <div class="row" v-else-if="userType === 'professor'">
          <div class="col-sm-8">
         <h1 class="escreva fade-up">Olá {{ userName }}, Orientar seus alunos ficou mais fácil</h1>
          </div>
          <div class="col-sm-4">
            <img src="Images/alunos4.png" class="imagem">
          </div>
        </div>
      </div>
    </div>
    <div class="cards row mt-5 mb-5 me-2">
      <div
        v-for="project in projects"
        :key="project.id_projeto"
        class="card col-sm-6 col-md-4 col-lg-3"
      >
      <div class="card__img">
    <img
      v-if="project.logo_projeto"
      :src="project.logo_projeto"
      :style="{ 'height': '150px', 'object-fit': 'cover', 'border-radius': '12px' }"
    />
    <img
      v-else
      src="Images/Logo.png"
      :style="{ 'height': '140px', 'object-fit': 'cover', 'border-radius': '12px' }"
    />
  </div>
        <div class="card__body">
          <h2 class="card__head">{{ project.tema }}</h2>
          <p class="card__desc">{{ project.titulo }}</p>
        </div>
        <a href="#" class="card__btn" @click.prevent="visualizar(project.id_projeto)">
          Visualizar
        </a>
      </div>
    </div>
  </div>
</template>

  <script>
  import Cookies from 'js-cookie';
  import axios from 'axios';
  
  export default {
    name: "HomePrincipal",
    data() {
      return {
      projects: [], 
      activeIndex: -1,
    };
      },
    computed: {
      userType() {
        const userType = Cookies.get('userType');
        return userType || 'default';
      },
      userName() {
       const userName = Cookies.get('userName');
       return userName || 'default';
      },
    },
    methods: {
          connect(index) {
      this.activeIndex = index;
      // Add your connect logic here
    },
      async loadProjects() {
        try {
        
          const response = await axios.get('https://api-thesis-track.vercel.app/projeto/listar');
          console.log(response);
          // Armazenar os projetos na variável projects
          this.projects = response.data;
          // const id = this.projects.id_projeto
          console.log(this.projects);
        } catch (error) {
          console.error('Erro ao carregar projetos:', error);
        }
      },
      
      visualizar(projectId) {
        // Redirecionar para a página de visualização do projeto com o ID do projeto
        this.$router.push(`/Visualizar/Projeto/${projectId}`);
      },
    },
    created() {
      this.loadProjects(); // Carregar os projetos ao entrar na página
    },
  };
  </script>
  
  
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inika&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inika&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

*, *::before,*::after {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

:root {
   --clr-head: #171e35;
   --clr-body: #6A6D78;
   --clr-bg: #eaedf6;
   --clr-border: #cfd4e7;
   --clr-gray: #A1A7C0;
}

img {
   max-width: 100%;
   display: block;
}

a {
   text-decoration: none;
}

body {
   font-family: 'Open Sans', sans-serif;
   font-size: 100%;
   line-height: 1.6;
   color: var(--clr-body);
   background-color: var(--clr-bg);
   align-items: center;
}

.cards {
  display: flex;
  justify-content: space-around;
  gap: 20px; 
  max-width: 100%;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1b2f4afa;
  backdrop-filter: blur(80px);
  padding: 1.5em; 
  border-radius: 12px;
  text-align: center;
  width: calc(33.33% - 20px);
  box-sizing: border-box;
  margin-bottom: 15px;
  box-shadow: 0 10px 30px -7px #171e35;
  max-height: 100%; 
  border: 1px solid #ffffff;
  transition: transform 0.3s ease-in-out;
}

.card__img {
  filter: drop-shadow(0 4px 10px rgba(black, .4));
  border-radius: 12px; 
  display: block;
}

.card__body {
  margin: 1rem 0; 
  flex-grow: 1;
}

.card:hover {
  transform: scale(1.05); 
}

.card__head {
  color: var(--clr-head);
  font-size: 1.375rem;
  margin-bottom: 0;
  font-weight: bold;
  color: #fff;
}

.card__desc {
  font-size: 1.125rem;
  color: #fff;
}

.card__btn {
  color: var(--clr-gray);
  font-weight: bold;
  font-size: 1rem;
  padding: .8em 3em;
  border: 2px solid var(--clr-border);
  border-radius: 5px;
  transition: all 250ms ease-in-out;
  background-color: #fff;
  color:#171e35;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card__btn:hover,
.card__btn.active {
  background-color: #ffffff;
  box-shadow: 0 10px 17px -7px #ffffff;
  color: #1b2f4a;
}

.card__btn.active {
   background-color: #fff;
   border: none;
   color: #171e35;
   box-shadow: 0 10px 17px -7px #1B2F4A;
}

 @media (max-width:900px) {
  
   .cards {
      margin-top: 5vh;
      display: grid;
      grid-template-columns: 1fr;
      max-width: 600px;
      width: 100%;
      gap: 2rem; 
      justify-items: center;
   }

   .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #1b2f4afa;
      padding: 3.4em;
      flex-grow: 1;
      width: 90%;
      height: 80%;
   }

   .card:nth-child(2) {
      position: relative;
      box-shadow: none;
      margin: 0;
   }
} 

  .imagemFundo{
    background-color: #1B2F4A;
    width: 100%;
  }

html, body {
  max-width: 100%;
  overflow-x: hidden;
}

.imagemFundo {
  background-color: #1B2F4A;
  width: 100%;
}

.elevate-12 {
  transform: translateY(50px);
}

.escrita {
  color: #fff !important;
}

.escritarfooter {
  color: #fff !important;
}

.fade-in-down {
  opacity: 0;
  transform: translateY(-50px);
  animation: fade-in-down 1s forwards;
}

.imagem {
  width: 23vw;
  margin-top: 4rem;
  margin-left: 8rem;
}

.escreva{ font-family: 'Inika', serif; color: #fff; margin-top: 5rem; font-size: 4rem; } @keyframes fade-in-down { 0% { opacity: 0; transform: translateX(-57px); } 100% { opacity: 1; transform: translateX(0); } } @keyframes slideUpFadeIn { from { opacity: 0; transform: translateY(50px); /* Altere a distância desejada do slide-up */ } to { opacity: 1; transform: translateY(0); } } .fade-up { animation: slideUpFadeIn 3s ease-in-out; }

.cardsTela {
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;
  justify-content: center;
}

@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateX(-57px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@media screen and (max-width: 636px) {
  .imagem {
    display: none;
  }

  .escreva {
    font-size: 12vw;
    width: 100%;
  }
}

@media screen and (max-width: 484px) {
  .card {
    margin-top:3rem !important;
    justify-content: center !important;
  }

  .tam{
    max-width: 350px !important;
    margin-left: 0 !important;
  }

  .row{
    margin:0 !important;
  }

  .escreva{
    font-size: 10vw;
    text-align: center;
  }
}

@media screen and (max-width: 370px) {

.tam{
  max-width: 300px !important;
  margin-left: 0 !important;
}

.row{
  margin:0 !important;
}
}
</style>