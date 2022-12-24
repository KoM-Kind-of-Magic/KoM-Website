<template>
  <div v-if="card.scryfallId" id="cardPage">
    <div class="cardInfosContainer">
      <img
        class="cardImg"
        :alt=card.name
        :src="`https://api.scryfall.com/cards/${card.scryfallId}?format=image&version=border_crop`"
      />
      <div class="cardInfos">
        <div class="cardName">{{card.name}}</div>
        <div class="cardSlider">
          Slider
        </div>
        <div class="cardMainContainer">
          <div class="cardMainBadges">
            <div class="badge">Price (MKM)</div>
            <div class="badge">{{card.number}} - {{card.setCode}}</div>
            <div class="badge">
              <img
                class="cardExtIcon"
                alt=""
                :src="`https://svgs.scryfall.io/sets/${card.setCode.toLowerCase()}.svg`"
              />
            </div>
          </div>
          <div class="cardTextContainer">
            <div class="cardText cardExtName">Extention : {{card.setCode}}</div>
            <div class="cardText cardRarity">
              Rarity : {{card.rarity[0].toUpperCase() + card.rarity.slice(1)}}
            </div>
            <div class="cardText cardLegalities">Legalities : </div>
            <div class="cardText cardArtist">Artist : {{ card.artist }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cardRules">

    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'CardPage',
  components: {
  },
  data() {
    return {
      card: {},
    };
  },
  mounted() {
    const route = useRoute();

    this.getCardById(route.params.uuid);
  },
  methods: {
    getCardById(id) {
      axios.get(
        `${process.env.VUE_APP_API_URL}/cards/${id}`,
        {
          uuid: this.cardUuid,
        },
      )
        .then((res) => {
          console.log(res);
          this.card = res.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#cardPage {
  display: flex;
  flex-direction: row;
  justify-content: center;

  color: $text-color;
  margin: 50px 0 0 0;
}

.cardInfosContainer {
  display: flex;
  flex-direction: row;

  width: 100%;
  padding: 0 10%;
}

.cardImg {
  width: 350px;
  margin: 0 20px 0 0;
  border-radius: 5.584% / 4%;
}
.cardInfos {
  flex-direction: column;
  align-content: center;

  background: $light-glass-background;
  width: inherit;
  text-align: center;
}

.cardName {

}

.cardMainContainer,
.cardName,
.cardSlider {
  margin: 10px;
  padding: 15px 0;
  border-radius: 10px;
  background: $medium-glass-background;
}
.cardMainBadges {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: space-between;
}
.badge {
  flex: 1;
  height: 50px;
  background: $strong-glass-background;

  vertical-align: middle;
  line-height: 50px;
  border-radius: 20px;
  margin: 0 15px;
}
.badge:nth-child(2) {
  margin: 0;
}
.badge:nth-child(3) {
  display: flex;
}

.cardExtIcon {
  margin: auto;
  width: 30px;
  height: 30px;
}

.cardTextContainer {
  display: flex;
  flex-direction: column;

  padding: 15px 15px 0 15px;
  gap: 15px;
}
.cardText {
  text-align: left;
}

</style>
