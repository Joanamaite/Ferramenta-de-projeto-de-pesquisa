<template>
  <div>
    <v-container v-if="projeto">
      <v-row>
        <v-col cols="12">
          <h1 class="titulo text-center">
            {{ projeto.titulo || '' }}
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div v-if="projetoDeletado" class="loading-spinner">
            <div class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <p class="estiloEscrita">
            Autores: {{ getAutoresNome(projeto) || '' }}
          </p>
        </v-col>
        <v-col cols="12" sm="4">
          <p class="estiloEscrita">
            Orientador: {{ getOrientadorNome(projeto) || '' }}
          </p>
        </v-col>
           <v-col cols='12' sm="4" >
          <p class="estiloEscrita"> Publicado em {{ projeto.ano_publicacao || '' }}</p>
        </v-col>
      </v-row>

      <div class="expansion align-items-center justify-content-center mx-auto" col="12" >
        <div  class="expansion">
        <v-expansion-panels inset class="my-3 expansion">
              <v-expansion-panel>
                <v-expansion-panel-header class="expansion-header">
                  <div class="title">O tema do projeto</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
                    <p>
                      {{ projeto.tema || '' }}
                    </p>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels inset class="my-3 ">
              <v-expansion-panel>
                <v-expansion-panel-header class="expansion-header">
                  <div class="title">Problema</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
                    <p>
                      {{ projeto.problema|| '' }}
                    </p>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
                 <v-expansion-panels inset class="my-3 ">
              <v-expansion-panel>
                <v-expansion-panel-header class="expansion-header" >
                  <div class="title">Objetivo geral</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
                    <p>
                      {{ projeto.objetivo_geral || '' }}
                    </p>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels inset class="my-3">
              <v-expansion-panel>
                <v-expansion-panel-header class="expansion-header">
                  <div class="title">Objetivo especifico</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
                    <p>
                      {{ projeto.objetivo_especifico || '' }}
                    </p>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
             <v-expansion-panels inset class="my-3">
              <v-expansion-panel>
                <v-expansion-panel-header class="expansion-header">
                  <div class="title">Resumo</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
                    <p>
                      {{ projeto.resumo || '' }}
                    </p>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
             <v-expansion-panels inset class="my-3">
              <v-expansion-panel>
                <v-expansion-panel-header class="expansion-header" >
                  <div class="title">Abstract</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
                    <p>
                      {{ projeto.abstract || '' }}
                    </p>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              </v-expansion-panels>
            </div>
             <a v-if="projeto.url_projeto && projeto.url_projeto !== ''" :href="projeto.url_projeto" target="_blank"
              class="estiloEscritaGrande mt-5 mb-5" style="color: #1B2F4A; text-decoration: underline;">
              Visitar Projeto
            </a>
            <a v-if="projeto.arquivo && projeto.arquivo !== ''" :href="projeto.arquivo" target="_blank"
              class="estiloEscritaGrande mt-5 mb-5" style="color: #1B2F4A; text-decoration: underline;">
              Projeto finalizado
            </a>
          </div>
      <v-col cols="12" sm="4" class="float-end">
        <div class="botoes-container d-flex justify-end">
          <v-btn class=" botao-editar" v-if="canEditOrDelete" @click="editarProjeto">Editar</v-btn>
          <v-btn @click="deletarProjeto" v-if="canEditOrDelete" color="red" class="ml-2" dark>
            Deletar Projeto
          </v-btn>
        </div>
      </v-col>
    </v-container>
    <v-container v-else>
      <div>
        Projeto não encontrado.
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      projetos: [],
      projeto: null,
      alunos: [],
      aluno: null,
      projetoDeletado: false,
      loadingDelecao: false,
      currentUserId: null
    };
  },
  computed: {
  canEditOrDelete() {
  if (!this.projeto || !this.currentUserId) {
    return false;
  }

  try {
    const autores = JSON.parse(this.projeto.autores);
    const professores = JSON.parse(this.projeto.orientadores);

    const userIdString = this.currentUserId.toString();

    if (
      autores.some(autor => autor.id.toString() === userIdString) ||
      professores.some(professor => professor.id.toString() === userIdString)
    ) {
      return true;
    }
  } catch (error) {
    console.error('Error parsing autores or orientadores:', error);
  }

  return false;
}
},

  async created() {
    const projetoId = this.$route.params.id;
    const orientadorId = this.$route.query.orientadorId;
    const response = await this.fetchProjeto(projetoId);

    if (response && response.data) {
      this.projeto = response.data;
      this.orientadorId = orientadorId;
      console.log(this.projeto);
      this.currentUserId = Cookies.get('id');
    } else {
      console.error('Projeto não encontrado ou erro na resposta');
    }
  },



  methods: {

    getAutoresNome(projeto) {
  try {
    const autores = JSON.parse(projeto.autores);
    if (autores && Array.isArray(autores) && autores.length > 0) {
      return autores.map(autor => autor.nome).join(', ');
    }
  } catch (error) {
    console.error('Error parsing autores:', error);
  }
  return '';
},
    getOrientadorNome(projeto) {
      try {
        const orientadores= JSON.parse(projeto.orientadores);
        if (orientadores && Array.isArray(orientadores) && orientadores.length > 0) {
          return orientadores.map(orientador => orientador.nome).join(', ');
        }
      } catch (error) {
        console.error('Error parsing orientadores:', error);
        return '';
      }
    },

    async fetchProjeto(projetoId) {
      const userId = Cookies.get('id');
      console.log('UserID:', userId);
      console.log('ProjetoID:', projetoId);
      try {
        const response = await axios.get(`https://api-thesis-track.vercel.app/projeto/listar/${projetoId}/pessoa/${userId}`);
        console.log('Resposta da API:', response.data);

        if (response.status === 200) {
          this.projeto = response.data;
          console.log('Projeto:', this.projeto);
          this.currentUserId = Cookies.get('id');
        } else {
          console.error('Status de resposta inesperado:', response.status);
        }

        return response;
      } catch (error) {
        console.error('Erro na solicitação:', error);
        return null;
      }
    },

    async deletarProjeto() {
      const token = localStorage.getItem('token');
      try {
        if (!this.projeto) {
          return;
        }

        const headers = {
          'x-access-token': `${token}`
        };

        const projetoId = this.$route.params.id;
        console.log(projetoId )


        this.projetoDeletado = true;
        const response = await axios.delete(`https://api-thesis-track.vercel.app/projeto/delete/${projetoId}`, { headers });
        console.log(response)
        // Desativar o estado de carregamento após um curto atraso
        setTimeout(() => {
          this.loadingDelecao = false;
          if (response.status === 200) {
            this.projetoDeletado = true;
            setTimeout(() => {
              this.projetoDeletado = false;
              this.$router.push("/projetos");
            }, 3000);
          }
        }, 2000);

      } catch (error) {
        console.error('Error:', error);
        // Certifique-se de desativar o estado de carregamento em caso de erro
        this.loadingDelecao = false;
      }
    },

    async editarProjeto() {
      const projetoId = this.$route.params.id;
      console.log("Projeto ID:", projetoId);
      this.$router.push(`/Editar/${projetoId}`);
    }

  },

};


</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fondamento&family=IM+Fell+French+Canon&family=Inter&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Brygada+1918&display=swap');
.mensagem-deletado {
  background-color: #8a0000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.expansion {
  width: 100%;
  color: #000;
  justify-content:center;
  
}


.expansion-panels {
  width: 100%; 
}

.expansion-panel-content {
  width: 100%; 
}

.expansion-header {
  cursor: pointer;
}

.expansion-header.active {
  background-color: #f0f0f0; 
}


.three-body {
  --uib-size: 35px;
  --uib-speed: 0.8s;
  --uib-color: #fff;
  position: relative;
  display: inline-block;
  height: var(--uib-size);
  width: var(--uib-size);
  animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
}

.three-body__dot {
  position: absolute;
  height: 100%;
  width: 30%;
}

.three-body__dot:after {
  content: '';
  position: absolute;
  height: 0%;
  width: 100%;
  padding-bottom: 100%;
  background-color: var(--uib-color);
  border-radius: 50%;
}

.three-body__dot:nth-child(1) {
  bottom: 5%;
  left: 0;
  transform: rotate(60deg);
  transform-origin: 50% 85%;
}

.three-body__dot:nth-child(1)::after {
  bottom: 0;
  left: 0;
  animation: wobble1 var(--uib-speed) infinite ease-in-out;
  animation-delay: calc(var(--uib-speed) * -0.3);
}

.three-body__dot:nth-child(2) {
  bottom: 5%;
  right: 0;
  transform: rotate(-60deg);
  transform-origin: 50% 85%;
}

.three-body__dot:nth-child(2)::after {
  bottom: 0;
  left: 0;
  animation: wobble1 var(--uib-speed) infinite calc(var(--uib-speed) * -0.15) ease-in-out;
}

.three-body__dot:nth-child(3) {
  bottom: -5%;
  left: 0;
  transform: translateX(116.666%);
}

.three-body__dot:nth-child(3)::after {
  top: 0;
  left: 0;
  animation: wobble2 var(--uib-speed) infinite ease-in-out;
}

@keyframes spin78236 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes wobble1 {

  0%,
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(-66%) scale(0.65);
    opacity: 0.8;
  }
}

@keyframes wobble2 {

  0%,
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }

  50% {
    transform: translateY(66%) scale(0.65);
    opacity: 0.8;
  }
}

/* Estilize o spinner de carregamento */
.loading-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid rgb(5, 36, 56);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.dialog {
  width: 40vw;
  height: 50vh;
  background-color: #1B2F4A !important;
}

.botao-deletar {
  width: 30%;
}
.ano{
  margin-top: 3rem;
  display:block;
}
.titulo {
  font-family: 'Fondamento', cursive;
  margin-top: 7rem;
  justify-content: center;
}

.mensagem-deletado {
  color: #ffffff;

}

.imagemAnexo {
  width: 20vw;
}

.botao-editar {
  background-color: #1B2F4A !important;
  color: #fff !important;
}

.estiloEscrita {
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.2rem;
  display: flex;
  flex-wrap: wrap;
}

.estiloEscritaGrande {
  font-family: 'Brygada 1918', serif;
  width: 100%;
  font-size: 1.3rem;
  text-align: start;
}

.orientacao {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;
  justify-content: center;
  width: 100%;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.dialog-overlay1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 80rem;

}

button {
  margin-top: 10px;
}

.dialogo {
  width: 100%;
  height: 5vh;
  background-color: #fff !important;
  border-radius: 18px;
}

.escritadentro {
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.5rem;
  text-align: center;
}

.etapasbotao {
  background-color: #1B2F4A !important;
  color: #fff !important;
  margin-left: 4%;
}

.escritapequena {
  color: #fff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.8rem;
}

.imagemAnexo1 {
  display: none;
}

@media screen and (max-width: 959px) {
  .margin {
    margin-bottom: 50rem;
  }
}

@media screen and (max-width: 390px) {
  .titulo {
    font-size: 6vw;
  }

  .estiloEscrita {
    text-align: start !important;
  }
  .ano{
    text-align: center;
  }
}

@media screen and (max-width: 580px) {

  .imagemAnexo {
    display: none !important;
  }

  .imagemAnexo1 {
    display: block;
    width: 40vw;
    margin-left: 4rem;
    align-items: center !important;
    justify-content: center !important;
  }

  .estiloEscrita {

    display: block;
  }
  .ano{
    text-align: center;
    justify-content: center;
  }
}

@media screen and (max-width: 850px) {
  .tamanho {
    display: inline-block;
  }
}
</style>
