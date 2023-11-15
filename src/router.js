import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import homePrincipal from './components/home/homePrincipal.vue';
import pagLogin from './components/login/pagLogin.vue';
import enviarCodigo from './components/trocarPerfil/enviarCodigo.vue';
import trocarSenha from  './components/trocarPerfil/trocarSenha.vue';
import cursos from "./components/cursos/cursosHome.vue";
import visualizar from "./components/visualizar/visualizarTcc.vue";
import professor from "./components/pagProfessor/homeProfessor";
import projetosVisu from "./components/pagProfessor/projetosVisualizar.vue";
import adicionar from "./components/pagProfessor/adicionarProjetos.vue";
import editar from "./components/pagProfessor/editarProjeto.vue";
import cadastro from "./components/cadastro/cadastroUsuario.vue";
import visualizarProjetos from "./components/visualizar/visualiazarProjetos.vue";

Vue.use(VueRouter);

// Redirecionando rotas do projeto
const routes = [
  { path: '/', component: homePrincipal, meta: { allowBoth: true, requireAuth: false }},
  { path: '/login', component: pagLogin, meta: { allowBoth: true, allowAluno: true, allowProfessor: true } },
  { path: '/enviar',  component: enviarCodigo, meta: { allowBoth: true } },
  { path: '/senha', component: trocarSenha, meta: { allowBoth: true, allowAluno: true, allowProfessor: true } },
  { path: '/cursos/:id', component: cursos , props: true, meta: { allowBoth: true, allowAluno: true, allowProfessor: true } },
  { path: '/visualizar/:id', component: visualizar, props: true, meta: { allowBoth: true, allowAluno: true, allowProfessor: true } },
  { path: '/visualizar/projeto/:id', component: visualizarProjetos, props: true, meta: { allowBoth: true, allowAluno: true, allowProfessor: true } },
  { path: '/professor', component: professor, meta: { allowAluno: true, allowProfessor: true } },
  { path: '/projetos', component: projetosVisu, meta: { allowAluno: true, allowProfessor: true } },
  { path: '/adicionar', component: adicionar, meta: { allowAluno: true, allowProfessor: true } },
  { path: '/editar/:id', component: editar, props: true, meta: { allowAluno: true, allowProfessor: true } },
  { path: '/cadastro', component: cadastro, meta: { allowBoth: true } },
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const userTypeCookie = Cookies.get('userType');
  const tokenCookie = Cookies.get('token');

  const allowAccess = (userType) => {
    Vue.prototype.$userType = userType;

    if (
      (userType === 'aluno' && to.meta.allowAluno) ||
      (userType === 'professor' && to.meta.allowProfessor)
    ) {
      // Se o tipo de usuário é permitido para esta rota, permite o acesso
      next();
    } else {
      // Se o tipo de usuário não é permitido, redireciona para a home
      next('/');
    }
  };

  if (to.meta.allowBoth) {
    // Se a rota permite ambos os tipos de usuários, permite o acesso
    next();
  } else {
    if (userTypeCookie && tokenCookie) {
      const userType = userTypeCookie;

      if (userTypeCookie === userType) {
        allowAccess(userType);
      } else {
        // Se os cookies estão presentes, mas o tipo de usuário é inconsistente, redireciona para a home
        next('/');
      }
    } else {
      // Se os cookies não estão presentes, a rota não requer autentificação.
      // Permite o acesso à rota
      if (!to.meta.requireAuth) {
        next("/");
      } else {
        // Se a rota requer autentificação, redireciona para a home
        next('/professor');
      }
    }
  }
});

export default router;
