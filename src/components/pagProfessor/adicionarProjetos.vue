<!-- eslint-disable-next-line  -->
<template>
    <div>
        <!-- Seção de Título -->
        <div>
    <div class="col-sm-12 container d-flex justify-content-center align-items-center">
      <h1 class="tituloProjetos animated-title">ADICIONE SEU PROJETO</h1>
    </div>
  </div>

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

        <!-- Linha divisória -->
        <hr class="linhaAzul">

        <!-- Container principal -->
        <div class="container d-flex align-items-center justify-content-center mx-auto">

            <!-- Linha de formulário -->
            <div class="row">
                <!-- Seleção de Alunos -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5  shadow-lg">
                    <v-combobox v-model="alunosSelecionados" :items="alunosDisponiveis" label="Selecione um Aluno"
                        item-text="nome" item-value="id" :search-input.sync="alunoSearch" chips clearable multiple
                        hide-details="auto" @change="validateAlunosSelecionados"></v-combobox>
                </div>

                <!-- Seleção de Orientador -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5  shadow-lg">
                    <v-combobox v-model="orientadorSelecionado" :items="professoresDisponiveis"
                        label="Selecione um orientador" item-text="nome" item-value="id"
                        :search-input.sync="orientadorSearch" chips clearable placeholder="Selecione um orientador">
                    </v-combobox>
                </div>

                <!-- Campo de Título -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5  shadow-lg">
                    <v-text-field label="Título" hide-details="auto" class="input rounded-counter" filled dense rounded
                        elevation="2" maxlength="100" :value="titulo" v-model="titulo"
                        @input="limitCharCount('titulo', 100)">
                        <template v-slot:append>
                            <div class="char-counter">{{ charCount.titulo }}/100</div>
                        </template>
                    </v-text-field>
                </div>

                <!-- Campo de Tema -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5  shadow-lg">
                    <v-text-field label="Tema" hide-details="auto" class="input rounded-counter" filled dense rounded
                        elevation="3" maxlength="45" :value="tema" v-model="tema" @input="limitCharCount('tema', 45)">
                        <template v-slot:append>
                            <div class="char-counter">{{ charCount.tema }}/45</div>
                        </template>
                    </v-text-field>
                </div>

                <!-- Campo de Problema -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5  shadow-lg ">
                    <v-textarea label="Problema" hide-details="auto" class="input" filled dense rounded elevation="3"
                        maxlength="200" v-model="problema" @input="limitCharCount('problema', 200)">
                        <template v-slot:append>
                            <div class="char-counter">{{ charCount.problema }}/200</div>
                        </template>
                    </v-textarea>
                </div>

                <!-- Campo de Objetivo Geral -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5  shadow-lg">
                    <v-textarea label="Objetivo geral" hide-details="auto" class="input rounded-counter mensagem" filled
                        dense rounded elevation="2" maxlength="200" :value="objetivo_geral" v-model="objetivo_geral"
                        rows="4" @input="limitCharCount('objetivo_geral', 200)">
                        <template v-slot:append>
                            <div class="char-counter">{{ charCount.objetivo_geral }}/200</div>
                        </template>
                    </v-textarea>
                </div>

                <!-- Campo de Objetivo Específico -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5  shadow-lg">
                    <v-textarea label="Objetivos específicos" hide-details="auto" class="input" filled dense rounded
                        elevation="3" maxlength="255" :value="objetivo_especifico" v-model="objetivo_especifico"
                        @input="limitCharCount('objetivo_especifico', 255)">
                        <template v-slot:append>
                            <div class="char-counter">{{ charCount.objetivos_especificos }}/255</div>
                        </template>
                    </v-textarea>
                </div>

                <!-- Campo de Resumo -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5 shadow-lg">
                    <v-textarea label="Resumo" hide-details="auto" class="input mensagem" filled dense rounded elevation="3"
                        v-model="resumo" rows="4" @input="limitCharCount('resumo', 300)" maxlength="300" :required="true">
                        <template v-slot:append>
                            <div class="char-counter">{{ charCount.resumo }}/300</div>
                        </template>
                    </v-textarea>
                </div>

                <!-- Campo de Abstract -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5 ">
                    <v-textarea label="Abstract" hide-details="auto" class="input" filled dense rounded elevation="3"
                        v-model="abstract" @input="limitCharCount('abstract', 300)" maxlength="300">
                        <template v-slot:append>
                            <div class="char-counter">{{ charCount.abstract }}/300</div>
                        </template>
                    </v-textarea>
                </div>

                <!-- Campo de URL do Projeto -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5  shadow-lg">
                    <v-text-field label="URL do Projeto" hide-details="auto" class="input" filled dense rounded
                        elevation="3" v-model="url">
                    </v-text-field>
                </div>

                <!-- Campo de Ano de Publicação com Menu de Data -->
                 <div class="col-md-10 col-sm-8 align-self-center mt-5 shadow-lg">
    <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y origin="top center" full-width>
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="ano_publicacao"
          label="Data de Publicação"
          hide-details="auto"
          v-on="on"
          v-bind="attrs"
        >
          <template v-slot:append>
            <v-btn icon @click="menu = !menu">
              <v-icon>mdi-calendar</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </template>

      <v-date-picker v-model="ano_publicacao" @input="menu = false" scrollable :year="true" format="DD/MM/YYYY">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
        <v-btn text color="primary" @click="$refs.picker.save(ano_publicacao)">OK</v-btn>
      </v-date-picker>
    </v-menu>
  </div>

                <!-- Upload de Arquivos -->
                <div class="col-md-6 col-sm-6 align-self-center mt-5 shadow-lg">
                    <label class="custom-file-upload">
                        <input type="file" ref="fileInput" id="fileInput" name="file" multiple @change="handleFileUpload" />
                        <span>Adicionar logo </span>
                    </label>
                </div>

                <!-- Mensagem de sucesso após adicionar arquivos -->
                <p class="cor" @click="projetos" v-if="logoAdicionada">Arquivo adicionado com sucesso</p>

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
                
                <!-- Exibição de mensagem de erro -->
                <div class="col-md-10 col-sm-8 align-self-center mt-5  shadow-lg">
                    <div v-if="!mensagemErro" class="text-danger">
                        {{ mensagemErro }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Controle de Privacidade -->
      <div>
            <label for="privacyToggle" class="toggle-label ms-5">Tornar {{ isPrivate ? 'Público' : 'Privado' }} ?</label>
            <input type="checkbox" id="privacyToggle" @change="togglePrivacy" class="toggle-checkbox ms-3"
                :checked="isPrivate">
        </div>

        <!-- Botão de Navegação de Voltar -->
        <div class="row q-gutter-sm">
            <div>
                <q-btn round size="sm" color="accent" @click="showNotif('left')">
                    <q-icon name="arrow_back" />
                </q-btn>
            </div>
        </div>

        <!-- Botão de Adicionar Projeto -->
        <div class="float-end mb-5 ">
            <v-btn class="color" @click="projetos">Adicionar</v-btn>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br'; // Se desejar usar o formato de data em português

export default {
    data() {
        return {
            valueDeterminate: 50,
            alunosSelecionados: [],
            alunoSelecionado: { id: null },
            professoresSelecionados: [],
            professorSelecionado: { id: null },
            orientadorSelecionados: [],
            coorientadoresSelecionados: [],
            orientadoresSelecionados: [],
            orientadorSelecionado: null,
            novoAutor: '',
            titulo: '',
            tema: '',
            delimitacao: '',
            problema: '',
            resumo: '',
            logo_projeto: '',
            objetivo_geral: '',
            abstract: '',
            objetivo_especifico: '',
            ano_publicacao: '',
            autores: [],
            imagens: [],
            isPrivate: false,
            pdfAdicionado:false,
            alunosDisponiveis: [],
            professoresDisponiveis: [],
            logoAdicionada: false,
            mensagemErro: true,
            sucessoAdicao: false,
            loading: false,
            url: '',
            menu:false,
            charCount: {
                titulo: 0,
                tema: 0,
                delimitacao: 0,

            },
            requiredFields: [
                'alunosSelecionados',
                'orientadorSelecionado',
                'titulo',
                'tema',
                'problema',
                'objetivo_geral',
                'resumo',
                'objetivo_especifico',
                'abstract',
                'ano_publicacao',
            ],

        };
   },
  computed: {
    formattedDate() {
      if (this.ano_publicacao && moment(this.ano_publicacao).isValid()) {
        return moment(this.ano_publicacao).format('DD/MM/YYYY');
      }
      return '';
    },
  },
  created() {
    this.carregarAlunos();
    this.carregarProfessores();
  },

    methods: {
        limitCharCount(field, limit) {
            if (this[field].length > limit) {
                this[field] = this[field].substr(0, limit);
            }
            this.charCount[field] = this[field].length;
        },

        shouldHideDetails(selectedItems) {
            return selectedItems.length === 0 ? 'auto' : true;
        },

        validateAlunosSelecionados() {
            if (this.alunosSelecionados.length > 3) {
                this.alunosSelecionados.pop();
            }
        },

        togglePrivacy() {
            this.isPrivate = !this.isPrivate;
            console.log(this.isPrivate)    
        },

        //função para enviar o pdf para o Cloudinary
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

          const urlPdf = cloudinaryResponse.data.secure_url;

          this.urlPdf = urlPdf;
          console.log(this.urlPdf)
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

      //função para enviar a imagem para o Cloudinary
        handleFileUpload(event) {
            const files = event.target.files;

            if (files.length > 0) {

                const cloudinaryCloudName = 'dzpbclwij';
                const cloudinaryUploadPreset = 'bdsmg4su';
                const uploadPromises = [];

                for (const file of files) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('resource_type', 'raw');
                    formData.append('upload_preset', cloudinaryUploadPreset);

                    uploadPromises.push(
                        axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`, formData)
                    );
                }
                this.logoAdicionada = true;
                Promise.all(uploadPromises)
                    .then((responses) => {
                        const imageUrls = responses.map((response) => response.data.secure_url);
                        this.logo_projeto = imageUrls;
                        console.log(this.logo_projeto);
                    })
                    
                    .catch((error) => {
                        console.error('Erro ao fazer upload de logo:', error);
                    });
            } else {
                console.warn('Nenhuma logo selecionado');
            }
        },


        jumpForward() {
        },
        adicionarAluno() {
            if (this.alunoSelecionado.id !== null) {
                this.alunosSelecionados.push(this.alunoSelecionado);
                this.alunoSelecionado = { id: null };
            }
        },
        adicionarProfessor() {
            if (this.professorSelecionado.id !== null) {
                this.professoresSelecionados.push(this.professorSelecionado);
                this.professorSelecionado = { id: null };
            }
        },
        adicionarOrientador() {
            if (this.orientadorSelecionado.id !== null) {
                this.coorientadoresSelecionados.push(this.orientadorSelecionado);
                this.orientadorSelecionado = { id: null };
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
            },
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
                    id: aluno.pessoa_id_pessoa,
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
                console.log(response)
                this.professoresDisponiveis = response.data.map(professor => ({
                    id: professor.pessoa_id_pessoa,
                    nome: professor.nome_professor,
                }));
            } catch (error) {
                console.error('Erro ao carregar professores:', error);
            }
        },

        async projetos() {
            try {
                this.loading = true;
                await new Promise(resolve => setTimeout(resolve, 2000));
                const token = localStorage.getItem('token');
                const alunosIds = this.alunosSelecionados.map(aluno => ({ "id": aluno.id }));
                const orientadorId = this.orientadorSelecionado.id;
                const cloudinaryCloudName = 'dzpbclwij';
                const cloudinaryUploadPreset = 'atk1tfs8';
                this.sucessoAdicao = true;

                for (const field of this.requiredFields) {
                    if (!this[field]) {
                        this.mensagemErro = `Por favor, preencha o campo ${field.replace(/_/g, ' ')}.`;
                        console.log(this.mensagemErro)
                        return;
                    }
                }

                let uploadedImageUrls = [];
                for (const file of this.logo_projeto) {
                    const formData = new FormData();
                    formData.append('resource_type', 'raw');
                    formData.append('file', file);
                    formData.append('upload_preset', cloudinaryUploadPreset);
                    console.log(formData)
                    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'application/pdf',
                            },
                        }
                    );
                    console.log(response)
                    console.log(formData)

                    if (response.status === 200 && response.data.secure_url) {
                        uploadedImageUrls.push(response.data.secure_url);
                    } else {
                        console.error('Erro ao fazer upload:', response.data);
                    }
                }

                const formData = {
                    titulo: this.titulo,
                    tema: this.tema,
                    resumo: this.resumo,
                    problema: this.problema,
                    abstract: this.abstract,
                    objetivo_geral: this.objetivo_geral,
                    objetivo_especifico: this.objetivo_especifico,
                    ano_publicacao: this.ano_publicacao,
                    alunos: alunosIds,
                    url_projeto: this.url,
                    professores: [{ "id": orientadorId }],
                    publico: this.isPrivate ? 0 : 1,
                    logo_projeto: this.logo_projeto,
                    arquivo:this.urlPdf
                };
                console.log(formData);
                console.log(this.publico);


                const headers = {
                    'x-access-token': `${token}`
                };
                const response = await axios.post('https://api-thesis-track.vercel.app/projeto/adiciona', formData, { headers });
                this.mensagemErro = null;
                if (response && response.status === 200 && response.data) {
                    console.log(response);
                    const projeto = response.data;
                    const projetoId = projeto.id_projeto;

                    // Redirecione para a rota apropriada com os detalhes do projeto
                    this.$router.push({
                        path: '/Projetos',
                        query: { projetoId: projetoId }
                    });
                } else {
                    console.error('Resposta inválida:', response);
                }
            } catch (error) {
                console.error('Erro:', error);

                this.mensagemErro = 'Ocorreu um erro ao adicionar o projeto. Por favor, tente novamente.';
            } finally {

                this.loading = false;
            }
        }
    }
}
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inika&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inder&display=swap');

:root {
    --uib-size: 35px;
    --uib-speed: 0.8s;
    --uib-color: #fff;
    --background-color: #1B2F4A;
    --primary-color: #1b4a3c;
}

.animated-title {
  position: relative;
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
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

.three-body__dot:nth-child(1),
.three-body__dot:nth-child(2) {
    bottom: 5%;
    width: 30%;
}

.three-body__dot:nth-child(1) {
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

.imagemFundo {
    background-color: #1B2F4A;
    max-width: 100%;
    max-height: 75vh;
}

.cor {
    color: #1b4a3c;
}

.mensagem {
    padding-bottom: 20px;
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

.file-list {
    list-style: none;
    padding: 0;
    margin: 0;
    color: #1B2F4A;
}

.file-list li {
    margin-top: 5px;
    font-size: 14px;
}

.char-counter {
    font-size: 12px;
    color: #888;
    margin-right: 10px;
}

.color {
    background-color: #1B2F4A !important;
    color: #fff !important;
}

.flip-enter-active,
.flip-leave-active {
    transition: transform 0.3s ease-in-out;
}

.flip-enter,
.flip-leave-to {
    transform: rotateY(180deg);
    opacity: 0;
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

.container {
    display: flex;
    align-items: center;
}

.linhaAzul {
    width: 100%;
    height: 3px;
    background-color: #1B2F4A;
}

.tituloProjetos {
    font-family: 'Inika', serif;
    margin-top: 6rem;
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

@media screen and (max-width: 409px) {
    .card {
        max-width: 300px;
    }

    .escreva {
        margin-left: 2rem;
        font-size: 7vw;
        width: 60vw;
    }

    .escritaProjetos {
        margin-left: 1rem;
        font-size: 4vw;
        width: 70vw;
    }

    .linhaAzul {
        margin-left: 0;
        width: 100%;
    }

    .tituloProjetos {
        font-size: 5vw;
    }
}

@media screen and (max-width: 512px) {
    .color {
        margin-right: 1rem;
    }

    .input {
        border: none !important;
    }
}
</style>