<template>
  <div class="content">
    <div class="btns-container">
      <div class="content-btns" @click="newHand()" @keydown="c">New hand</div>
      <div class="content-btns" @click="drawCard(true)" @keydown="c">Add Another Card</div>
      <div class="content-btns" @click="mulligan()" @keydown="c">Mulligan</div>
    </div>
    <div class="cards-container" v-if="hand.length > 0">
      <div class="item" v-for="(card, i) in hand" :key="i">
        <img
          alt="card's card-image"
          :src="`https://api.scryfall.com/cards/${card.scryfallId}?format=image`"
          v-if="card.scryfallId"
          style="width: 100%"
        />
        <div
          v-show="(((i-hand.length)*-1)-defaultHandSize+mulliganCount) > 0"
          class="card-position"
        >
          # {{((i-hand.length)*-1)-defaultHandSize+mulliganCount}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ElMessage,
} from 'element-plus';

export default {
  name: 'DeckHandView',
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.newHand();
  },
  data() {
    return {
      library: [],
      hand: [],
      mulliganCount: 0,
      cardsDrewAmount: 0,
      defaultHandSize: 7,
    };
  },
  methods: {
    newHand(numberOfCardsToDraw = this.defaultHandSize) {
      this.cardsDrewAmount = 0;
      this.library = this.shuffleArray(this.cards);
      this.hand = [];
      if (numberOfCardsToDraw === this.defaultHandSize) {
        this.mulliganCount = 0;
      }
      for (let i = 0; i < Math.min(numberOfCardsToDraw, this.library.length + 1); i += 1) {
        this.drawCard();
      }
    },
    mulligan() {
      if (this.mulliganCount + 1 < this.defaultHandSize) {
        this.mulliganCount += 1;
        const numberOfCardsToDraw = Math.min(this.defaultHandSize, this.cards.length)
          - this.mulliganCount;
        this.newHand(numberOfCardsToDraw);
      } else {
        ElMessage({
          message: 'No more mulligans possible!',
          type: 'warning',
        });
      }
    },
    shuffleArray(array) {
      const shuffledArray = [...array];
      // return array
      //   .map((value) => ({ value, sort: Math.random() }))
      //   .sort((a, b) => a.sort - b.sort)
      //   .map(({ value }) => value);
      for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      console.log(shuffledArray);
      return shuffledArray;
    },
    drawCard(fromButton = false) {
      if (this.library.length > 0) {
        this.hand.unshift(this.library[0]);
        this.library.splice(0, 1);
        this.cardsDrewAmount += 1;
      } else if (fromButton) {
        ElMessage({
          message: 'There are no more cards in the deck.',
          type: 'warning',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

  .cards-container {
    display: flex;
    // grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    flex-wrap: wrap;
  }

  .item {
    display: flex;
    & img {
      width: 100%;
      border-radius: 15px;
    }
    display: flex;
    position: relative;
    width: calc((100% / 2) - 12px);
    margin: 6px;
  }

  @media (min-width: 800px) {
    .item {
      grid-template-columns: repeat(3, 1fr);
      width: calc((100% / 3) - 12px);
    }
  }

  @media (min-width: 1100px) {
    .item {
      grid-template-columns: repeat(5, 1fr);
      width: calc((100% / 5) - 12px);
    }
  }

  @media (min-width: 1550px) {
    .item {
      grid-template-columns: repeat(7, 1fr);
      width: calc((100% / 7) - 12px);
    }
  }

  .content {
    background: rgba(255, 255, 255, 0.1);
    padding: 12px;
    gap: 12px;
    display: flex;
    flex-direction: column;
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

  .btns-container {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-self: center;
  }

  .content-btns {
    display: flex;
    padding: 6px 12px;
    border-radius: 16px;
    color: white;
    background: rgba(255, 255, 255, 0.15);
    transition: 0.3s;
    align-self: center;
    &:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.35);
    }
  }

  .card-position {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #1111118f;
    padding: 6px;
    font-size: 26px;
    border-radius: 6px;
  }

</style>
