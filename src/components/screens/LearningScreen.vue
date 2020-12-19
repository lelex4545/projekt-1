<template>
    <div id="learningScreen">
      <transition name="slide-fade" appear mode="out-in">
        <!--<Quiz v-if="show" :item="card" @nextCardEvent="changeToNextCard"/>-->
        <Quiz :key="index" :item="getNextCard" @nextCardEvent="changeCard"/>
      </transition>
    </div>
</template>

<script>
import Quiz from './AnkiComp/Quiz.vue'
export default {
  name: 'AnkiScreen',
  components: { Quiz },
  data: () => ({
    cards: [{id: '0', question: 'Wie heißt die Hauptstadt von Australien?', answer: 'Canberra'},
            {id: '1', question: 'Wie lautet der Standardtext von HTML?', answer: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'},
            {id: '0', question: 'Wie heißt die Hauptstadt von Australien?', answer: 'Canberra'},
    ],
    show: true,
    index: 0
  }),
  computed:{
    getNextCard: function(){
      return this.cards[this.index]
    }
  },
  methods: {
    changeCard: function(){
      this.index = this.index < this.cards.length-1 ? this.index + 1 : 0;
      console.log(this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
#learningScreen{
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slide-fade-enter-active {
  transition: all .7s ease;
}
.slide-fade-leave-active {
  transition: all .7s ease;
}
.slide-fade-enter{
  transform: translateX(70vw);
  opacity: 0;
}
.slide-fade-leave-to{
  opacity: 0;
  transform: translateX(-70vw);
  
}
@media only screen and (max-width: 760px) {
  .slide-fade-enter-active {
    transition: all .5s ease-in;
  }
  .slide-fade-leave-active {
    transition: all .5s ease-out;
  }
  .slide-fade-enter{
    transform: translateX(0);
    opacity: 0;
  }
  .slide-fade-leave-to{
    opacity: 0;
    transform: translateX(-0);
  }
}

</style>