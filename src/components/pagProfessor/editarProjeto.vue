<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <div>
            <div class="col-sm-6  container">
                <h1 class="tituloProjetos d-flex">EDITE SEU PROJETO</h1>
            </div>
        </div>
        <hr class="linhaAzul">

 <!-- Exibição do Spinner durante o carregamento -->
        <v-col cols="12" v-if="loading">
            <div v-if="loading" class="loading-spinner">
                <div class="three-body">
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                    <div class="three-body__dot"></div>
                </div>
            </div>
        </v-col>

        <div class="container align-items-center justify-content-center mx-auto d-flex ">
            <div class="row">
                <div class="col-md-10 col-sm-8 align-self-center  shadow-lg">
                    <v-text-field label="Título" hide-details="auto" class="input" filled dense rounded elevation="2"
                        v-model="projetoEdit.titulo" maxlength="50">
                    </v-text-field>
                </div>
                <div class="col-md-10 col-sm-8 align-self-center  shadow-lg">
                    <v-text-field label="Tema" hide-details="auto" class="input" filled dense rounded elevation="3"
                        v-model="projetoEdit.tema" maxlength="45">

                    </v-text-field>
                </div>
                <div class="col-md-10 col-sm-8 align-self-center  shadow-lg ">
                    <v-textarea label="Problema" hide-details="auto" class="input" filled dense rounded elevation="3"
                        v-model="projetoEdit.problema" maxlength="200"></v-textarea>
                </div>
                <div class="col-md-10 col-sm-8 align-self-center  shadow-lg ">
                    <v-textarea label="Objetivo geral" hide-details="auto" class="input" filled dense rounded
                        elevation="3" v-model="projetoEdit.objetivo_geral" maxlength="100"></v-textarea>
                       
                </div>
                <div class="col-md-10 col-sm-8 align-self-center  shadow-lg ">
                    <v-textarea label="Objetivo especifico" hide-details="auto" class="input" filled dense rounded
                        elevation="3" v-model="projetoEdit.objetivos_especificos" maxlength="255"></v-textarea>
                </div>
                <div class="col-md-10 col-sm-8 align-self-center  shadow-lg  ">
                    <v-textarea label="Resumo" hide-details="auto" class="input" filled dense rounded elevation="3"
                        v-model="projetoEdit.resumo"></v-textarea>
                </div>
                <div class="col-md-10 col-sm-8 align-self-center ">
                    <v-textarea label="Abstract" hide-details="auto" class="input" filled dense rounded elevation="3"
                        v-model="projetoEdit.abstract"></v-textarea>
                </div>
                <div class="col-md-10 col-sm-8 align-self-center  shadow-lg">
                    <v-text-field label="URL do Projeto" hide-details="auto" class="input" filled dense rounded
                        elevation="3" v-model="projetoEdit.url">
                    </v-text-field>
                </div>
                <div class="col-md-10 col-sm-8 align-self-center  shadow-lg">
                    <label class="custom-file-upload">
                        <input type="file" ref="fileInput" id="fileInput" name="file" multiple @change="handleFileUpload($event)" />

                        <span>Adicionar logo</span>
                    </label>
             
                </div>
                <p class="cor" v-if="arquivoAdicionado" >Arquivo adicionado com sucesso</p>
                
                <!-- Botão de Adicionar PDF -->
                <div class="col-md-6 col-sm-6 align-self-center mt-5 shadow-lg">
                    <label class="custom-file-upload">
                        <input type="file" ref="fileInput" id="fileInput" name="file" @change="handleFile"
                            accept=".pdf" />
                        <span>Adicionar PDF</span>
                    </label>
                </div>
                <!-- Exibe a mensagem de sucesso após adicionar PDF -->
                <p class="cor" v-if="pdfAdicionado">PDF adicionado com sucesso</p>

            </div>
        </div>
        <div>
            <label for="privacyToggle" class="toggle-label ms-5">Projeto {{ isPrivate ? 'Privado' : 'Público' }}</label>
            <input type="checkbox" id="privacyToggle" @change="togglePrivacy" class="toggle-checkbox ms-3"
                :checked="isPrivate">
        </div>
        <div class="float-end mb-5 me-5 ">
            <v-btn class="color" @click="editarProjeto" :disabled="loading">
                <template v-if="loading">
                    <v-col cols="12">
          <div  class="loading-spinner">
            <div class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
          </div>
        </v-col>
                </template>
                <template v-else>
                    <span>Salvar</span>
                </template>
            </v-btn>
        </div>

        <div v-if="mensagemSucesso" class="alert alert-success">
            {{ mensagemSucesso }}
        </div>

    </div>
</template>
  
<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {

    created() {
        const projetoId = this.$route.params.id;

        if (projetoId) {
            // Buscar as informações do projeto pelo ID
            this.fetchProjeto(projetoId);
        }

        this.carregarAlunos();
        this.carregarProfessores();
    },


    data() {
        return {
            projetoEdit: {
                titulo: '',
                tema: '',
                delimitacao: '',
                problema: '',
                resumo: '',
                abstract: '',
                publico:this.decidir,
                arquivoAdicionado: false,
                logo_projeto: [],
                alunosSelecionados: [],
                alunoSelecionado: { id: null },
                professoresSelecionados: [],
                professorSelecionado: { id: null },
                orientadorSelecionados: [],
                orientadorSelecionado: { id: null },
                alunosDisponiveis: [],
                professoresDisponiveis: [],
                numeroMaximoAutores: 3,
                loading: false, 
                mensagemSucesso: null, 
                pdfAdicionado:false,
                isPrivate:false,
                  charCount: {
                titulo: 0,
                tema: 0,
                delimitacao: 0,

            },
            },
        };
    },

    methods: {
               limitCharCount(field, limit) {
            if (this[field].length > limit) {
                this[field] = this[field].substr(0, limit);
            }
            this.charCount[field] = this[field].length;
        },
        togglePrivacy() {
            this.isPrivate = !this.isPrivate;
            const decidir = this.projetoEdit.publico = this.isPrivate ? 0 : 1;
            console.log(decidir)
        },

        limitarAutores() {
            if (this.projetoEdit.autores.length > this.numeroMaximoAutores) {
                this.projetoEdit.autores.pop();
            }
        },
        computed: {

            alunosIds() {
                return this.alunosSelecionados?.map(aluno => aluno.id) || [];
            },
            professoresIds() {
                return this.professoresSelecionados?.map(professor => professor.id) || [];
            },
            orientadorIds() {
                return this.orientadorSelecionados?.map(professor => professor.id) || [];
            }
        },
        async handleFile(event) {
    try {
      const file = event.target.files[0];
      const cloudinaryCloudName = 'dzpbclwij';
      const cloudinaryUploadPreset = 'bdsmg4su';
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('resource_type', 'raw');
        formData.append('upload_preset', cloudinaryUploadPreset);

        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/raw/upload`, formData, {
        
            headers: {
            'Content-Type': 'multipart/form-data',
          },
        });


        if (cloudinaryResponse.status === 200 && cloudinaryResponse.data.secure_url) {


          this.projetoEdit.arquivo = cloudinaryResponse.data.secure_url;
          
          console.log(cloudinaryResponse.data.secure_url);

          this.pdfAdicionado = true;
        } else {
          console.error('Erro ao fazer upload do PDF:', cloudinaryResponse.data);
        }
      } else {
        console.warn('Nenhum arquivo selecionado');
      }
    } catch (error) {
      console.error('Erro:', error);
    
    }
  },
        handleFileUpload(event) {
    const files = event.target.files;
    console.log(files);

    if (files.length > 0) {
        this.projetoEdit.logo_projeto = []; 
        const cloudinaryCloudName = 'dzpbclwij';
        const cloudinaryUploadPreset = 'bdsmg4su';
        const uploadPromises = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', cloudinaryUploadPreset);

            uploadPromises.push(
                axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`, formData)
            );
             this.arquivoAdicionado = true;
        }
       

        Promise.all(uploadPromises)
            .then((responses) => {
                const imageUrls = responses.map((response) => response.data.secure_url);
                this.projetoEdit.logo_projeto = imageUrls;
                console.log(this.projetoEdit.logo_projeto);
            })
            .catch((error) => {
                console.error('Erro ao fazer upload de logo:', error);
            });
    } else {
        console.warn('Nenhuma logo selecionado');
    }
},
        async carregarAlunos() {
            const token = localStorage.getItem('token');
            console.log(token)
            const headers = {
                'x-access-token': `${token}`
            };

            try {
                const response = await axios.get('https://api-thesis-track.vercel.app/listar/alunos', { headers });
                this.alunosDisponiveis = response.data.map(aluno => ({
                    id: aluno.matricula_aluno,
                    nome: aluno.nome_aluno,
                }));
            } catch (error) {
                console.error('Erro ao carregar alunos:', error);
            }

        },
        async carregarProfessores() {
            const token = localStorage.getItem('token');
            console.log(token)
            const headers = {
                'x-access-token': `${token}`
            };
            try {
                const response = await axios.get('https://api-thesis-track.vercel.app/listar/orientador', { headers });
                this.professoresDisponiveis = response.data.map(professor => ({
                    id: professor.pessoa_id_pessoa,
                    nome: professor.nome_professor,
                }));
            } catch (error) {
                console.error('Erro ao carregar professores:', error);
            }
        },

        adicionarAluno() {
            if (this.alunoSelecionado.id !== null) {
                this.alunosSelecionados.push(this.alunoSelecionado);
                this.alunoSelecionado = { id: null };
            }
        },
        async fetchProjeto() {
            try {
                const token = localStorage.getItem('token');

                const headers = {
                    'x-access-token': `${token}`
                };
                const userId = Cookies.get('id');

                const response = await axios.get(`https://api-thesis-track.vercel.app/projeto/listar/${this.$route.params.id}/pessoa/${userId}`, { headers });
                console.log(response);
                // Preencher os campos do projeto com as informações obtidas
                this.projetoEdit = response.data;
                this.projetoEdit.autores = null;
                this.projetoEdit.orientadores = null;
               

            } catch (error) {
                console.error('Erro ao buscar projeto:', error);
            }
        },

        async editarProjeto() {   
    try {
         this.loading = true;
        const token = localStorage.getItem('token');
        const headers = {
            'x-access-token': `${token}`
        };

        await axios.put(`https://api-thesis-track.vercel.app/projeto/atualiza/${this.$route.params.id}`, this.projetoEdit, { headers });
        this.loading = false;
        this.mensagemSucesso = 'Projeto editado com sucesso';
        this.$router.push(`/visualizar/${this.$route.params.id}`);
        console.log('Projeto editado com sucesso');
    } catch (error) {
        console.error('Erro ao editar projeto:', error);
    }finally {

                this.loading = false;
            }
}
    }
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inika&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inder&display=swap');

.imagemFundo {
    background-color: #1B2F4A;
    max-width: 100%;
    max-height: 75vh;
}

.toggle-label {
    font-weight: bold;
}

.toggle-checkbox {
    width: 40px;
    height: 20px;
    -webkit-appearance: none;
    appearance: none;
    background-color: #ccc;
    border-radius: 20px;
    position: relative;
    cursor: pointer;
}

.toggle-checkbox:checked {
    background-color: #3498db;
}

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

.cor {
    color: #1b4a3c;
}

.custom-file-upload {
    background-color: #1B2F4A;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    transition: background-color 0.3s ease;
}

.custom-file-upload:hover {
    background-color: #1B2F4A;
}

input[type="file"] {
    display: none;
}

.toggle-checkbox::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    left: 0;
    transition: 0.3s;
}

.toggle-checkbox:checked::before {
    left: 20px;
}

.color {
    background-color: #1B2F4A !important;
    color: #fff !important;

}

.three-body {
  --uib-size: 35px;
  --uib-speed: 0.8s;
  --uib-color: #1B2F4A;
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

.container {
    display: inline-block;
}

.linhaAzul {
    width: 85%;
    height: 4px;
    background-color: #1B2F4A;
    margin-left: 4rem;
}

.tituloProjetos {
    font-family: 'Inika', serif;
    margin-top: 5rem;
    margin-left: 5rem;

}

.input {
    background-color: #f1eded48;
    border-radius: 5px;
    border-bottom: #7a7272 solid 2px;
    box-shadow: #2e2626;
}

.custom-input {
    min-height: 30vh !important;
}

@keyframes slidein {
    from {
        margin-left: 100%;
        width: 200%;
    }

    to {
        margin-left: 15%;
        width: 100%;
    }
}

@media screen and (max-width: 430px) {
    .tituloProjetos {
        font-size: 6vw;
    }
    .input{
    border:none !important;
}

    .linhaAzul {
        margin: 0;
        width: 100%;
    }
}
</style>