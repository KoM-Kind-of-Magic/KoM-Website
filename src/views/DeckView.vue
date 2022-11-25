<template>
  <div class="wrapper">
    <div class="error" v-if="error.show">
      {{error.message}}
    </div>
    <div class="main-head">
      <div class="deck-name">{{deck.name}}</div>
      <div class="deck-desc" v-show="deck.format">{{deck.format}}</div>
    </div>
    <div class="content">
      <div class="masonry" v-if="sortByTypes.length>0">
        <div class="item" v-for="types in Object.keys(sortByTypes)" :key="types">
          <div class="item__content">
            <div class="type-name">{{types}}</div>
            <CardLine v-for="card in sortByTypes[types]"
              :key="card.id"
              :card="card"
              class="card-in-deck"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="side">
      <div class="normal-btn" @click="editDeck()" @keydown="c">
        &#x270E;&nbsp;Edit
      </div>
      <div class="normal-btn" @click="DeleteDeck()" @keydown="c">
        &#128465;&nbsp;Delete
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import CardLine from '../components/card/CardLine.vue';

export default {
  name: 'DeckView',
  components: {
    CardLine,
  },
  data() {
    return {
      deck: {
        name: '',
        cards: [],
        format: '',
        type: '',
        createdAt: '',
      },
      error: {
        show: false,
        message: '',
      },
    };
  },
  mounted() {
    this.getDeck();
  },
  methods: {
    getDeck() {
      axios.get(`http://localhost:8081/deck/${this.deckId}`)
        .then((response) => {
          console.log(response.data);
          const deck = response.data.data;
          this.deck = {
            name: deck.name ?? 'Deck with no name',
            cards: deck.cards ?? [],
            format: deck.format ?? '',
            type: deck.type ?? '',
            createdAt: deck.createdAt ?? '',
          };
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.$router.push({ name: 'PageNotFound' });
          } else {
            this.error = {
              show: true,
              message: `Error ${error.response.data.status} : ${error.response.data.message.data}`,
            };
          }
          console.error(error);
        });
    },
    editDeck() {
      this.$router.push({ name: 'deckEditor', params: { id: this.deckId } });
    },
  },
  computed: {
    sortByTypes() {
      const res = {};
      const cardTypes = [...new Set(this.deck.cards.map((c) => c.type))];
      //
      cardTypes.sort((a, b) => {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
      });
      cardTypes.forEach((t) => {
        res[t] = [];
      });
      this.deck.cards.forEach((c) => {
        res[c.type].push(c);
      });
      return res;
    },
    deckId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style lang="scss" scoped>
  .masonry {
    column-count: 1;
    column-gap: 10px;
  }

  @media (min-width: 800px) {
    .masonry {
      column-count: 2;
    }
  }

  @media (min-width: 1100px) {
    .masonry {
      column-count: 3;
    }
  }

  @media (min-width: 1550px) {
    .masonry {
      column-count: 4;
    }
  }

  .item {
    display: grid;
    grid-template-rows: 1fr auto;
    margin-bottom: 10px;
    break-inside: avoid;

    &__content {
      flex-direction: column;
      width: 100%;
    }
  }

  .wrapper {
    margin: 12px;
    display: grid;
    grid-gap: 12px;
    grid-template-areas:
      "header"
      "content"
      "sidebar";
  }

  @media (min-width: 600px) {
    .wrapper {
      grid-template-columns: 1fr 300px;
      grid-template-areas:
        "content  header"
        "content sidebar";
    }
  }

  .main-head {
    grid-area: header;
    color: white;

    & .deck-name {
      font-size: 20px;
      margin: 12px;
      font-weight: bold;
    }
    & .deck-desc {
      font-size: 14px;
      margin: 12px;
    }
  }
  .content {
    grid-area: content;
    background: rgba(255, 255, 255, 0.1);
    padding: 8px;
  }
  .side {
    grid-area: sidebar;
    padding: 0 12px;
  }

  .type-name {
    text-transform: capitalize;
    margin: 4px;
    display: inline-block;
    color: white;
  }

  .card-in-deck {
    margin: 4px;
  }

  .normal-btn {
    padding: 4px 8px;
    border-radius: 5px;

    color: $text-color;
    background: $medium-glass-background;
    transition: 0.3s;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .normal-btn:hover {
    cursor: pointer;
    background: $strong-glass-background;
  }

</style>
