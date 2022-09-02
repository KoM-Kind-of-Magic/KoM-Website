import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DeckListsView from '../views/DeckListsView.vue';
import DeckView from '../views/DeckView.vue';
import DeckEditorView from '../views/DeckEditorView.vue';

import WorkInProgress from '../views/WorkInProgress.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/deckLists',
    name: 'deckLists',
    component: DeckListsView,
  },
  {
    path: '/deck/:id',
    name: 'deck',
    component: DeckView,
  },
  {
    path: '/deckEditor/:id',
    name: 'deckEditor',
    component: DeckEditorView,
  },
  {
    path: '/wip',
    name: 'wip',
    component: WorkInProgress,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
