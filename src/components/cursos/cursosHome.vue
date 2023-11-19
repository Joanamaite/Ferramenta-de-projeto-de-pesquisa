<!-- eslint-disable -->
<template>
  <div class="cards  row  mb-5">
     <div
  class="card col-sm-6 col-md-4 col-lg-3">
        <div class="card__img">
          <img :src="projects.logo_projeto" :style="{ 'height': '150px', 'object-fit': 'cover', 'border-radius': '12px' }" />
        </div>
        <div class="card__body">
          <h2 class="card__head">{{ projects.tema }}</h2>
          <p class="card__desc">{{ projects.titulo }}</p>
        </div>
        <a href="#" class="card__btn" @click.prevent="visualizar(projects.id_projeto)">
          Visualizar
        </a>
      </div>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
  data: () => ({
    model: null,
    autoPlayInterval: null,
    projects: [],
  }),
 
  watch: {
    '$route.params.id': 'loadProjects', 
  },
  created() {
    this.loadProjects();
    window.addEventListener('resize', this.handleResize);
  },

  beforeDestroy() {
    this.stopAutoPlay();
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    visualizar(projectId) {
      this.$router.push(`/Visualizar/Projeto/${projectId}`);
    },

    loadProjects() {
      const courseId = this.$route.params.id;

      if (courseId) {
        Axios.get(`https://api-thesis-track.vercel.app/projeto/lista/aluno/curso/${courseId}`)
          .then((response) => {
            this.projects = response.data;
          })
          .catch((error) => {
            console.error('Erro ao carregar projetos:', error);
          });
      }
    },

    handleResize() {
      const screenWidth = window.innerWidth;
      const navigationHeader = document.querySelector(".navigation_header");

      if (screenWidth > 675) {
        navigationHeader.classList.remove("menu-aberto");
      }
    },

    stopAutoPlay() {
      clearInterval(this.autoPlayInterval);
    },
  },
};
</script>

<style scoped>
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
   display: flex;
   align-items: center;
}

.cards {
  display: flex;
  justify-content: space-around;
  gap: 20px; 
  width: 100%;
  margin-top: 6rem;
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
  margin-bottom: 20px; 
  box-shadow: 0 10px 30px -7px #171e35;
  height: 100%;
  border: 1px solid #ffffff;
  transition: transform 0.3s ease-in-out;
}
.card__img {
  filter: drop-shadow(0 4px 10px rgba(black, .4));
  border-radius: 12px; 
}

.card__body {
  margin: 1rem 0;
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

  border: 2px solid var(--clr-border);
  border-radius: 5px;
  transition: all 250ms ease-in-out;
  background-color: #fff;
  color: #171e35;
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
      max-height: 90%;
   }
   .card:nth-child(2) {
      position: relative;
      box-shadow: none;
      margin: 0;
   }
} 
</style>