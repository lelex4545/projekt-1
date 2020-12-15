<template>
    <div id="quizContainer">
        <div id="question">
            <span id="questionH" class="unmarkable">Frage</span>
            <span id="questionB" contenteditable @input="onInput">{{questionContent}}</span>
        </div>
        <div id="answer">
            <span id="answerH" class="unmarkable">Antwort</span>
            <button id="reveal" v-if="blury" @click="blury=false" class="unmarkable">Press here or Spacebar to reveal</button>
            <span id="answerB" :class="{'blur-content': blury, 'unmarkable': blury}">{{answerContent}}</span>
        </div>
        <div id="buttonBox" class="unmarkable">
            <button id="btnE" @click="easyEvent">Easy</button>
            <button id="btnN" @click="normalEvent">Normal</button>
            <button id="btnH" @click="hardEvent">Hard</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuizItem',
    data: () => ({
        blury: true,
        difficulty: 0,
        questionContent: '',
        answerContent: '',
        questionEditable: false
    }),
    mounted(){
        this.questionContent = "Was ist der Standardtext bei HTML?"
        this.answerContent = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        
        window.addEventListener("keypress", this._spaceListener);
    },
    beforeDestroy(){
        window.removeEventListener('keypress', this._spaceListener)
    },
    methods:{
        onInput(e){
            this.questionContent = e.target.innerText
            console.log(this.questionContent)
        },
        _spaceListener(e){
            if (e.key === ' ' || e.key === 'Spacebar')
                this.blury = !this.blury;
        },
        easyEvent() {
            var dif = this.difficulty;
            if(dif==0){
                this.difficulty = 1;
                console.log(this.difficulty)
            }
            alert("Was Easy du kleiner Pisser, lüg nicht")
        },
        normalEvent() {
            alert("Naja")
        },
        hardEvent(){
            alert("Kek")
        },
        calculateDay(){

        }
    }
}
</script>

<style lang="scss" scoped>
#quizContainer{
    position: absolute;
    top: 1em;
    left: 1em;

    border: 1px solid black;
    border-radius: 1em;
    width: 30em;
    height: 38em;

    padding: 2em;

    background-color: #12232E;

    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
}
#quizContainer>div{
    border-radius: 1em;
    margin: 1em 0 1em 0;
    color: black;
    background: #EEFBFB;
}
#question{
    flex: 2;   
    border: 1px solid black;
    background: #EEFBFB;
    padding: 1em;

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
}
#questionH{
    font-size: 1.4em;
    flex: 1;
    font-weight: bold;
}
#questionB{
    flex: 1;
}
#answer{
    flex: 7;
    border: 1px solid black;
    background: #EEFBFB;
    padding: 1em;

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
}
#answerH{
    flex: 1;
    font-size: 1.4em;
    font-weight: bold;
}
#reveal{
    position: absolute;
    border: none;
    font-size: 1.5em;
    font-weight: bold;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -45%);
    z-index: 1;
    cursor: pointer;

    background: transparent;
}
#answerB{
    flex: 6;
}
.blur-content{
    filter: blur(.35em);
}
#buttonBox{
    flex: 1;
    
    background: none !important;

    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
}
#buttonBox button{
    flex: 1;
    border: 1px solid black;
    border-radius: 1em;
}
#btnE{
    background:  #78b662;
    cursor: pointer;
    &:hover{
        background:  #598648;
    }
}
#btnN{
    background: #f0b350;
    cursor: pointer;
    &:hover{
        background:  #c08f3f;
    }
}
#btnH{
    background: #b64137;
    cursor: pointer;
    &:hover{
        background:  #96362d;
    }
}
button:focus{
    outline: 1px solid white;
}
.unmarkable{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>