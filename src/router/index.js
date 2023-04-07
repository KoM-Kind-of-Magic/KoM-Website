import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DeckListsView from '../views/DeckListsView.vue';
import DeckMainView from '../views/DeckMainView.vue';
import DeckView from '../views/DeckView.vue';
import DeckHandView from '../views/DeckHandView.vue';
import DeckEditorView from '../views/DeckEditorView.vue';
import CardView from '../views/CardView.vue';
import SearchView from '../views/SearchView.vue';

import WorkInProgress from '../views/WorkInProgress.vue';
import PageNotFound from '../views/PageNotFound.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/deckLists',
    name: 'deckLists',
    component: DeckListsView,
  },
  {
    path: '/deck/:id',
    component: DeckMainView,
    children: [
      {
        path: '',
        name: 'deck',
        component: DeckView,
      },
      {
        path: 'hand',
        name: 'deckHand',
        component: DeckHandView,
      },
    ],
  },
  {
    path: '/deckEditor/:id',
    name: 'deckEditor',
    component: DeckEditorView,
  },
  {
    path: '/card/:uuid',
    name: 'cardPage',
    component: CardView,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
  },
  {
    path: '/wip',
    name: 'wip',
    component: WorkInProgress,
  },
  {
    path: '/PageNotFound',
    name: 'PageNotFound',
    component: PageNotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/PageNotFound',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const allowedRouted = [
    'login',
    'register',
    'search',
    'cardPage',
  ];
  if (allowedRouted.includes(to.name)) {
    return;
  }
  const user = JSON.parse(localStorage.userInfo);
  if (user.token != null) {
    axios.get(
      `${process.env.VUE_APP_API_URL}/auth/checkToken`,
      {
        headers: {
          'x-access-token': user.token,
        },
      },
    ).then((res) => {
      console.log('ok');
    }).catch((error) => {
      router.push({ name: 'login' });
    });
  } else {
    router.push({ name: 'login' });
  }
});

export default router;
