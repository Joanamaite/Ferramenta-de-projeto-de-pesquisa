<template>
  <div>
    <div v-if="userType === 'aluno'" class="imagemFundo col-sm-6 col-md-12">
      <div class="container" style="height: auto; display: flex; flex-direction: column;">
        <div class="row align-items-center">
          <div class="col-sm-4 col-md-6">
            <h1 class="escreva">Área do Aluno</h1>
            <p class="escritaProjetos mt-4">Esta é sua área de projetos. Aqui você poderá criar, alterar e
              excluir seus projetos compartilhados. Use este espaço para se organizar e orientar.</p>
          </div>
          <div class="col-md-6 col-sm-4">
            <img src="Images/projetos.png" class="imagem img-fluid">
          </div>
        </div>
      </div>
    </div>
    <div v-if="userType === 'professor'" class="imagemFundo col-sm-6 col-md-12">
      <div style="height: auto; display: flex; flex-direction: column;">
        <div class="row align-items-center">
          <div class="col-sm-4 col-md-6">
            <h1 class="escreva">Área do professor</h1>
            <p class="escritaProjetos mt-4">Esta é sua área de projetos. Aqui você poderá criar, alterar e
              excluir seus projetos compartilhados. Use este espaço para se organizar e orientar.</p>
          </div>
          <div class="col-md-6 col-sm-4">
            <img src="Images/projetos.png" class="imagem img-fluid">
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="container" style="display: flex;">
  <h1 class="tituloProjetos col-sm-4 col-lg-4" @click="adicionar">{{ pageTitle }}</h1>
  <div class="col-sm-4 col-lg-4 maisProjeto d-flex" @click="adicionar">
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor"
         class="bi bi-plus-circle ms-5 d-flex rounded float-end" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
  </div>
</div>
    </div>
    <hr class="linhaAzul">
    <v-row class="fade-in-down cards mx-auto justify-content-between">
      <div v-if="semProjeto" class="col-12 text-center mt-5 textAlter">
        <img src="Images/sem projeto.png" class="imagemilustrada" alt="imagem ilustrativa">
        <p class="textAlter mb-5">Você não possui nenhum trabalho aqui.</p>
      </div>
      <div class="cards row mt-5 mb-5">
        <div
  v-for="projeto in projetosDoUsuario"
  :key="projeto.id_projeto"
  class="card col-sm-6 col-md-4 col-lg-3"
>
  <div class="card__img">
    <img
      v-if="projeto.logo_projeto"
      :src="projeto.logo_projeto"
      :style="{ 'height': '150px', 'object-fit': 'cover', 'border-radius': '12px' }"
    />
    <img
      v-else
      src="Images/Logo.png"
      :style="{ 'height': '140px', 'object-fit': 'cover', 'border-radius': '12px' }"
    />
  </div>
  <div class="card__body">
    <h2 class="card__head">{{ projeto.titulo }}</h2>
    <h2 class="card__desc">{{ projeto.publico ? 'Público' : 'Privado' }}</h2>

  </div>
  <a href="#" class="card__btn" @click.prevent="visualizar(projeto.id_projeto)">
    Visualizar
  </a>
</div>
    </div>

    </v-row>
  </div>
</template>
<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  props: {
    projeto: Object,
  },
  computed: {
    userType() {
      const userType = Cookies.get('userType');
      return userType || 'default';
    },
    userId() {
      const userId = Cookies.get('id');
      return userId || null;
    },
  },

  data() {
    return {
      projetosDoUsuario: [], // Array para armazenar os projetos filtrados
      semProjeto: false,
      pageTitle: 'Meus Projetos',
    };
  },


  destroyed() {
    // Certifique-se de remover o ouvinte de redimensionamento quando o componente for destruído
    window.removeEventListener('resize', this.updatePageTitle);
  },

  methods: {
    isPublic(projeto) {
      return projeto.publico === 1 ? 'Projeto Público' : 'Projeto Privado';
    },
    editarProjeto(projeto) {
      console.log("Projeto ID:", projeto);
      this.$router.push(`/Editar/${projeto}`);
    },

    async loadProjects() {
      try {
        let response;
        const token = localStorage.getItem('token');
        const headers = {
          'x-access-token': `${token}`
        };
        if (this.userType === 'professor') {
          // Chamada para buscar os projetos do professor
          response = await axios.get(`https://api-thesis-track.vercel.app/projeto/orientador/${this.userId}`, { headers });
          console.log(response);
        } else if (this.userType === 'aluno') {
          // Chamada para buscar os projetos do aluno
          response = await axios.get(`https://api-thesis-track.vercel.app/aluno/projetos/${this.userId}`, { headers });
          console.log(response);
        }

        this.projetosDoUsuario = response.data;
        this.checkIfEmptyProjects(); // Verifica se a lista de projetos está vazia
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      }
    },
    updatePageTitle() {
      if (window.innerWidth <= 484) {
        this.pageTitle = 'Projetos';
      } else {
        this.pageTitle = 'Meus Projetos';
      }
    },
    checkIfEmptyProjects() {
      if (this.projetosDoUsuario.length === 0) {
        this.semProjeto = true;
        console.log("Você não possui nenhum trabalho aqui.");
      }
    },
    adicionar() {
      this.$router.push('/Adicionar');
    },
    getAutoresNome(response) {
      try {
        const autores = JSON.parse(response.alunos);
        console.log(autores)
        if (autores && autores.length > 0) {
          return autores.map(autor => autor.nome).join(', ');
        }
      } catch (error) {
        console.error('Error parsing autores:', error);
        return '';
      }
    },
    visualizar(projeto, orientadorId) {
      // Redirecionar para a página de visualização do projeto com o ID do projeto e do orientador
      this.$router.push({ path: `/Visualizar/${projeto}`, query: { orientadorId } });
    }

  },
  created() {
    this.loadProjects();
    // Detectar o tamanho da tela e atualizar pageTitle
    window.addEventListener('resize', this.updatePageTitle);
    this.updatePageTitle(); // Chame a função para definir o valor inicial
  },

};
</script>

  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inika&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inder&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Agbalumo&display=swap');
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
  gap: 20px; /* Adicionado espaço uniforme entre os cards */
  width: 100%;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1b2f4afa;
  backdrop-filter: blur(80px);
  padding: 1.5em; /* Reduzi o padding para diminuir a altura do card */
  border-radius: 12px;
  text-align: center;
  width: calc(33.33% - 20px);
  box-sizing: border-box;
  margin-bottom: 20px; /* Adicionado um espaço inferior entre os cards */
  box-shadow: 0 10px 30px -7px #171e35;
  border: 1px solid #ffffff;
  transition: transform 0.3s ease-in-out;
  max-width: 80%;
}
.card__img {
  filter: drop-shadow(0 4px 10px rgba(black, .4));
  border-radius: 20px; 
}

.card__body {
  margin: 1rem 0; /* Reduzi a margem inferior para diminuir a altura do corpo do card */
}

.card:hover {
  transform: scale(1.05); /* Efeito de escala ao passar o mouse sobre o card */
}

.card__head {
  color: var(--clr-head);
  font-size: 1.375rem;
  margin-bottom: 0;
  font-weight: bold;
  color: #fff;
}

.card__desc {
  font-size: rem;
  color: #fff;
  
}

.card__btn {
  display: inline-block;
  color: var(--clr-gray);
  font-weight: bold;
  font-size: 1rem;
  padding: .6em 2em;
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
      max-height: 90%;
   }
   .card:nth-child(2) {
      position: relative;
      box-shadow: none;
      margin: 0;
   }
} 
.imagemFundo {
  background-color: #1B2F4A;
  max-width: 100%;
  max-height: 75vh;

}

.imagemilustrada {
  align-itens: center;
  margin-left:35rem;
  width: 15vw;
}

.textAlter {
  color: #3f3f3f;
  font-family: Agbalumo;
  font-size: 1.5vw;

}

.container {
  display: inline-block;
  justify-content: center;
}

h3 {
  color: #fff;

}

p {
  color: #fff;
  font-family: 'Inika', serif;
}

.adicionar {
  margin-right: 8rem;
  cursor: pointer;
}
v-row{
margin:0;
}


.linhaAzul {
  width: 95%;
  height: 4px;
  background-color: #1B2F4A;
  margin-left: 2rem;
}

.escritarfooter {
  color: #fff !important;
}

.escritascard {
  color: #fff;
}

.escritaProjetos {
  color: #fff;
  font-size: 1.5vw;
  font-family: 'Inder', sans-serif;
  font-weight: 100;
  width: 35vw;
  /*animation-duration: 5s;
    animation-name: slidein;*/
}

.imagem {
  width: 40vw;
  margin-top: 4rem;
  margin-left: 2rem;
 

}
.maisProjeto{
  margin-top:5rem;
margin-left:10rem;
}

.tituloProjetos {
  font-family: 'Inika', serif;
  margin-top: 5rem;
  margin-left: 5rem;
  width:5vw;

}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 200%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}

.escreva {
  font-family: 'Inika', serif;
  color: #fff;
  margin-top: 7rem;
  font-size: 3.5vw;

}

@media screen and (max-width: 636px) {
  .imagem {
    display: none;
  }

  .escreva {
    font-size: 5vw;
    width: 80vw;
  }

  .escritaProjetos {
    font-size: 3vw;
    width: 80vw;
  }
  .maisProjeto{
    margin-top: 5rem;
  }
}

@media screen and (max-width: 484px) {
  .card {
    margin-top: 3rem;
  }
  .imagemilustrada {
  width: 25vw;
}
.textAlter{
  font-size: 3vw;
}
  .escreva {
    font-size: 7vw;
    width: 100%;
    text-align: center;
  }

  .escritaProjetos {
    font-size: 4vw;
    width: 100%;
    text-align: center;
  }

  .linhaAzul {
    margin-left: 0;
    margin-right: 0;
    width:100%;
  }

  .maisProjeto {
    margin-top: 3rem;

  }

  .adicionar {
    margin-right: 0rem;
  }

  .tituloProjetos {
    font-size: 7vw;
    margin-top: 3rem;
  }

  .row {
    margin: 0 !important;
  }


}


</style>