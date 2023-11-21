<template>
  <div>
    <v-container v-if="projeto">
      <v-row>
        <v-col cols="12" sm='12' md='12'>
          <h1 class="titulo text-center">
            {{ projeto.titulo || '' }}
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div v-if="loadingDelecao" class="loading-spinner">
            <div class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
          </div>
        </v-col>
        <v-alert  v-if="projetoDeletado"   color="red" shaped type="info" class="mensagem-container float-end">Projeto deletado</v-alert>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <p class="estiloEscrita">
             {{ getAutoresNome(projeto) || '' }}
          </p>
        </v-col>
        <v-col cols="12" sm="4">
          <p class="estiloEscrita">
            Orientador: {{ getOrientadorNome(projeto) || '' }}
          </p>
        </v-col>
        <v-col cols='12' sm="4">
          <p class="estiloEscrita"> Publicado em {{ projeto.ano_publicacao || '' }}</p>
        </v-col>
      </v-row>

      <div class="expansion align-items-center justify-content-center mx-auto" col="12">
        <div class="expansion">
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
                    {{ projeto.problema || '' }}
                  </p>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels inset class="my-3 ">
            <v-expansion-panel>
              <v-expansion-panel-header class="expansion-header">
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
                <div class="title">Objetivos específicos</div>
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
              <v-expansion-panel-header class="expansion-header">
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

        <div>
          <a v-if="projeto.url_projeto && projeto.url_projeto !== ''" :href="projeto.url_projeto" target="_blank"
            class="estiloEscritaGrande mt-5 mb-5"
            style="color: #1B2F4A; text-decoration: none; display: flex; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
              style="width: 1.5em; height: 1.5em; margin-right: 0.5em;">
              <path
                d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM111 257.1l26.8 89.2 31.6-90.3c3.4-9.6 12.5-16.1 22.7-16.1s19.3 6.4 22.7 16.1l31.6 90.3L273 257.1c3.8-12.7 17.2-19.9 29.9-16.1s19.9 17.2 16.1 29.9l-48 160c-3 10-12 16.9-22.4 17.1s-19.8-6.2-23.2-16.1L192 336.6l-33.3 95.3c-3.4 9.8-12.8 16.3-23.2 16.1s-19.5-7.1-22.4-17.1l-48-160c-3.8-12.7 3.4-26.1 16.1-29.9s26.1 3.4 29.9 16.1z"
                fill="#4285F4" />
            </svg>
            Visite o Projeto
          </a>

          <a v-if="projeto.arquivo && projeto.arquivo !== ''" :href="projeto.arquivo" target="_blank"
            class="estiloEscritaGrande mt-5 mb-5"
            style="color: #1B2F4A; text-decoration: none; display: flex; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
              style="width: 1.5em; height: 1.5em; margin-right: 0.5em;">
              <path
                d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"
                fill="#FF0000" />
            </svg>
            Projeto finalizado
          </a>
        </div>
      </div>
      <v-col cols="12" sm="4" class="float-end">
        <div class="botoes-container d-flex justify-end">
          <v-btn class="botao-editar" v-if="canEditOrDelete" @click="editarProjeto">Editar</v-btn>
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

      const autores = this.projeto.autores || [];
      const orientadores = this.projeto.orientadores || [];

      const userIdString = this.currentUserId.toString();

      if (
        autores.some(autor => autor.id == userIdString) ||
        orientadores.some(orientador => orientador.id == userIdString)
      ) {
        return true;
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
          const numeroDeAutores = autores.length;

          if (numeroDeAutores === 1) {
            return `Autor: ${autores[0].nome}`;
          } else if (numeroDeAutores === 2) {
            return `Autores: ${autores[0].nome} e ${autores[1].nome}`;
          } else if (numeroDeAutores > 2) {
            const nomes = autores.map(autor => autor.nome);
            const autoresString = nomes.slice(0, -1).join(', ') + ` e ${nomes.slice(-1)}`;
            return `Autores: ${autoresString}`;
          }
        }
      } catch (error) {
        console.error('Error parsing autores:', error);
      }

      return '';
    },
    getOrientadorNome(projeto) {
      try {
        const orientadores = JSON.parse(projeto.orientadores);
        if (orientadores && Array.isArray(orientadores) && orientadores.length > 0) {
          return orientadores.map(orientador => orientador.nome).join(', ');
        }
      } catch (error) {
        console.error('Error parsing orientadores:', error);
        return '';
      }
    },

    async fetchProjeto(projetoId) {


      try {
        const response = await axios.get(`https://api-thesis-track.vercel.app/projeto/listar/${projetoId}}`);
        console.log('Resposta da API:', response.data);

        if (response.status === 200) {
          this.projeto = response.data;
          console.log('Projeto:', this.projeto);
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
        this.loadingDelecao = true;


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

.ano {
  display: block;
}

.expansion {
  width: 100%;
  color: #000;
  justify-content: center;

}
.mensagem-container {
  position: fixed;
  top: 20%;
  left: 30px; 
  transform: translateY(-50%);
  z-index: 999;
  background-color: rgb(189, 14, 14)818  !important ;
  color:#fff !important ;
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

.icon {
  font-size: 1.2em;
  /* Ajuste conforme necessário */
  margin-right: 5px;
  /* Adapte conforme desejado */
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

.ano {
  margin-top: 6rem;
}

.titulo {
  font-family: 'Fondamento', cursive;
  display: flex;
  margin-top: 7rem;
  flex-wrap: wrap;
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
}

@media screen and (max-width: 850px) {
  .tamanho {
    display: inline-block;
  }
}</style>
