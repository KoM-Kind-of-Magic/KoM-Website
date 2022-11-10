<template>
  <div class="wrapper">
    <div class="main-head">
      <div class="deck-name">{{deckName}}</div>
      <div class="deck-desc">{{deckDesc}}</div>
    </div>
    <div class="content">
      <div class="masonry">
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
import CardLine from '../components/card/CardLine.vue';

export default {
  name: 'DeckView',
  components: {
    CardLine,
  },
  data() {
    return {
      deckName: "Deck's name",
      deckFormat: '',
      deckDesc: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.",
      cards: [
        {
          name: 'Lotus Cobra',
          id: '10',
          imgUrl: 'https://cards.scryfall.io/large/front/a/4/a4b759f0-901f-4be3-93fa-224609b08d48.jpg?1604199124',
          type: 'creature',
          number: 1,
        },
        {
          name: 'Sword of heart and home',
          id: '11',
          imgUrl: 'https://cards.scryfall.io/large/front/a/1/a16fabbe-4557-4067-b882-f2e5dbd8b458.jpg?1626099357',
          type: 'artifact',
          number: 1,
        },
        {
          name: 'Talisman of curiosity',
          id: '12',
          imgUrl: 'https://cards.scryfall.io/normal/front/f/d/fd52688a-39fd-430f-b950-cb56e0004396.jpg?1562202516',
          type: 'artifact',
          number: 2,
        },
        {
          name: 'Talisman of indulgence',
          id: '13',
          imgUrl: 'https://cards.scryfall.io/normal/front/f/a/fa6c62c7-8fd4-46f1-a7f4-fc6e74d34b35.jpg?1631589255',
          type: 'artifact',
          number: 1,
        },
        {
          name: 'Wishclaw Talisman',
          id: '14',
          imgUrl: 'https://cards.scryfall.io/normal/front/0/7/07c17b01-ee5d-491a-8403-b3f819b778c4.jpg?1572490271',
          type: 'artifact',
          number: 1,
        },
        {
          name: 'Yoshimaru, Ever Faithfull',
          id: '15',
          imgUrl: 'https://cards.scryfall.io/large/front/a/a/aa409269-3698-42a2-8c51-75557b27a6f6.jpg?1664653410',
          type: 'creature',
          number: 1,
        },
        {
          name: 'Yarok, the Desecrated',
          id: '1',
          imgUrl: 'https://cards.scryfall.io/normal/front/a/1/a1001d43-e11b-4e5e-acd4-4a50ef89977f.jpg?1592517590',
          type: 'creature',
          number: 1,
        },
        {
          name: 'Zur, the enchanter',
          id: '16',
          imgUrl: 'https://cards.scryfall.io/normal/front/a/e/aeb0160a-dfdc-4b1f-865e-ef905aee65d5.jpg?1662987603',
          type: 'creature',
          number: 1,
        },
        {
          name: 'Zur, Eternal Schemer',
          id: '17',
          imgUrl: 'https://cards.scryfall.io/normal/front/4/d/4d987435-2403-4e0f-b19d-693da923ba50.jpg?1663051659',
          type: 'creature',
          number: 1,
        },
        {
          name: 'Chandra',
          id: '8',
          imgUrl: 'https://cards.scryfall.io/large/front/4/9/49d2a680-4f3b-4bfa-b77b-d2dfaced9f23.jpg?1592516849',
          type: 'planeswalker',
          number: 4,
        },
        {
          name: 'Phyrexian Tower',
          id: '9',
          imgUrl: 'https://cards.scryfall.io/large/front/0/5/05b2cc68-1d20-421f-9800-af0996071554.jpg?1601081190',
          type: 'planeswalker',
          number: 1,
        },
      ],
    };
  },
  mounted() {
    console.log('TODO : make API call to get cards from deck');
  },
  methods: {
  },
  computed: {
    sortByTypes() {
      const res = {};
      const cardTypes = [...new Set(this.cards.map((c) => c.type))];
      //
      cardTypes.sort((a, b) => {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
      });
      cardTypes.forEach((t) => {
        res[t] = [];
      });
      this.cards.forEach((c) => {
        res[c.type].push(c);
      });
      return res;
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
