<template>
    <div id="learningScreen">
      <div id="ankiNavbar">
        <transition name="button-animation" appear mode="out-in">
          <button class="buttonStyle" @click="createEvent=!createEvent; editing=false; learning=false; stats=false">Erstellen</button>
        </transition>
        <transition name="button-animation" appear mode="out-in">
          <button class="buttonStyle" :class="{'blockBtn': !cardsAvailable}" @click="editEvent">Verwalten</button>
        </transition>
        <transition name="button-animation" appear mode="out-in">
          <button class="buttonStyle" @click="stats=!stats; editing=false; learning=false; createEvent=false">Statistiken</button>
        </transition>
        <transition name="button-animation" appear mode="out-in">
          <button class="buttonStyle" :class="{'learning': cardsAvailable, 'blockBtn': !cardsAvailable}" @click="learningEvent">Lernen</button>
        </transition>
      </div>
<div id="ankiBody">
      <transition v-if="createEvent" name="slide-fade" appear mode="out-in">
        <CreateQuiz @createCardEvent="createCard"/>
      </transition>
      <transition v-if="learning" name="slide-fade" appear mode="out-in">
        <Quiz :key="index" :item="getNextCard" @nextCardEvent="changeCard"/>
      </transition>
      <transition v-if="editing" name="slide-fade" appear mode="out-in">
        <transition-group tag="div"> 
          <QuizManager
            v-for="card in cards"
              :key="card.id"
              :card="card"
              @saveEvent="saveEdit"
              @deleteEvent="deleteEvent"
          />
        </transition-group>
      </transition>
      <transition v-if="stats" name="slide-fade" appear mode="out-in">
        <QuizStats />
      </transition>
</div>
    </div>
</template>

<script>
import CreateQuiz from './AnkiComp/CreateQuiz.vue';
import Quiz from './AnkiComp/Quiz.vue';
import QuizManager from './AnkiComp/QuizManager.vue';
import QuizStats from './AnkiComp/QuizStats.vue';

import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

export default {
  name: 'AnkiScreen',
  components: { Quiz, CreateQuiz, QuizManager, QuizStats },
  data: () => ({
    cards: [{id: 0, question: 'Wie heißt die Hauptstadt von Australien?', answer: 'Canberra', repetitions: 0, easiness: 2.5, interval: 1, nextDate : null},
            {id: 1, question: 'Wie lautet der Standardtext von HTML?', answer: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', repetitions: 0, easiness: 2.5, interval: 1, nextDate : null},
    ],
    index: 0,
    learning: false,
    createEvent: false,
    stats: false,
    editing: false
  }),
  computed:{
    getNextCard: function(){
      return this.cards[this.index]
    },
    cardsAvailable: function(){
      return this.cards.length ? true : false
    }
  },
  methods: {
    changeCard: function(id, repetitions, easiness, interval, nextDate){
      //Update Card Arraydata
      this.cards.find(e => {
        if(e.id === id){
          e.repetitions = repetitions
          e.easiness = easiness
          e.interval = interval
          e.nextDate = nextDate
        }
      })
      //Change Card
      this.index = this.index < this.cards.length-1 ? this.index + 1 : 0;
    },
    createCard: function(question, answer){
      this.cards.push({id: this.cards.length === 0 ? 0 : (this.cards[this.cards.length-1].id + 1), question: question, answer: answer, repetitions: 0, easiness: 2.5, interval: 1, nextDate : null})
    },
    saveEdit: function(id, question, answer) {
      this.cards.findIndex(e => {
        if(e.id === id){
          e.question = question
          e.answer = answer
        }
      })
    },
    deleteEvent: function (id) {
      var pos = this.cards.findIndex(e => e.id === id)
      this.cards.splice(pos,1)
      if(!this.cardsAvailable){
        this.editing=false;
      }
    },
    learningEvent: function() {
      if(this.cardsAvailable){
        this.learning=!this.learning; this.createEvent=false; this.editing=false; this.stats=false
      }else this.$swal('No cards available')
    },
    editEvent: function() {
      if(this.cardsAvailable){
        this.editing=!this.editing; this.createEvent=false; this.learning=false; this.stats=false
      }else this.$swal('No cards available')
    }
  }
}
</script>

<style lang="scss" scoped>
#learningScreen{
  width: 100vw;
}
#ankiNavbar{
  padding: 1em;
  margin-bottom: 1em;
  background-color: #12232E;
  border-radius: 0em;
  display: flex;
  justify-content: center;
}
#ankiBody{
  display: flex;
  justify-content: center;
}
.buttonStyle{
  border: 1px solid black;
  border-radius: 1em;
  width: 25em;
  height: 3em;
  margin: 0 .25em 0 .25em;
}
.learning{
  background-color: #71b2dd;
}
.blockBtn{
  background-color: #8b9fac;
}
.button-animation-enter{
  transform: scale(0);
  opacity: 0;
}
.button-animation-enter-active{
  transition: all .7s ease;
}
.button-animation-leave-to{
  transform: scale(0);
  opacity: 0;
}
.button-animation-leave-active{
  transition: all .3s ease;
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

@media only screen and (max-width: 1400px) {
  #ankiNavbar{
    //width: 45em;
  }
}

</style>