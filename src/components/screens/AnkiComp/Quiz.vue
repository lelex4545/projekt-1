<template>
    <div id="quizContainer">
        <div id="question">
            <span id="questionH" class="unmarkable">Frage</span>
            <span id="questionB">{{questionContent}}</span>
        </div>
        <div id="answer">
            <span id="answerH" class="unmarkable">Antwort</span>
            <div id="answerB">
                <span :class="{'blur-content': blury, 'unmarkable': blury}">{{answerContent}}</span>
                <transition name="h1-fade">
                    <h1 v-if="blury" class="unmarkable" @click="blury=!blury">
                        Click or press Space to reveal
                    </h1>
                </transition>
            </div>
        </div>
        <div id="buttonBox" class="unmarkable">
            <button id="btnE" @click="easyEvent">Easy ({{calculatePlaceholder(5)}} Days)</button>
            <button id="btnN" @click="normalEvent">Normal ({{calculatePlaceholder(3)}} Days)</button>
            <button id="btnH" @click="hardEvent">Hard ({{calculatePlaceholder(1)}} Days)</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuizItem',
    props: ['item'],
    data: () => ({
        blury: true,
        questionContent: '',
        answerContent: '',

        //SM2-Algorithmus Implementierung
        repetitions: 0,     
        easiness: 2.5,      
        interval: 0,        
        nextDate : null
    }),
    mounted(){
        this.questionContent = this.item.question
        this.answerContent = this.item.answer
        this.repetitions = this.item.repetitions
        this.easiness = this.item.easiness
        this.interval = this.item.interval
        this.nextDate = this.item.nextDate

        window.addEventListener("keypress", this._spaceListener);
    },
    beforeDestroy(){
        window.removeEventListener('keypress', this._spaceListener)
    },
    methods:{
        _spaceListener(e){
            e.preventDefault()
            if (e.key === ' ' || e.key === 'Spacebar')
                this.blury = !this.blury;
        },
        easyEvent() {
            this.calculateSuperMemo2Algorithm(5)
        },
        normalEvent() {
            this.calculateSuperMemo2Algorithm(3)
        },
        hardEvent(){
            this.calculateSuperMemo2Algorithm(1)
        },
        calculateSuperMemo2Algorithm(quality){
            if(quality < 0 || quality > 5){
                quality = 0;
            }
            if(quality >= 3) {
                if(this.repetitions==0) this.interval = 1;
                else if (this.repetitions==1) this.interval = 6;
                else if (this.repetitions>1) this.interval = Math.round(this.interval * this.easiness)
                this.repetitions = this.repetitions + 1
                this.easiness = Math.max(1.3, this.easiness + 0.1 - (5.0 - quality) * (0.08 + (5.0 - quality) * 0.02))
            }else if(quality < 3){
                this.repetitions = 0
                this.interval = 1
            }

            var tageInMillisekunden = 60 * 60 * 24 * 1000
            var nextPracticeTimeMs
            if(this.nextDate === null)
            {
                var time = new Date().getTime()
                nextPracticeTimeMs = time + tageInMillisekunden * this.interval
                this.nextDate = new Date(nextPracticeTimeMs)
            } 
            else{
                nextPracticeTimeMs = this.nextDate.getTime() + tageInMillisekunden * this.interval
                this.nextDate = new Date(nextPracticeTimeMs)
            }
            this.$emit("nextCardEvent", this.item.id, this.repetitions, this.easiness, this.interval, this.nextDate)
        },
        calculatePlaceholder(quality){
            var intv
            if(quality >= 3) {
                if(this.repetitions==0) intv = 1;
                else if (this.repetitions==1) intv = 6;
                else intv = Math.round(this.interval * this.easiness)
            }else if(quality < 3){
                intv = 1
            }
            return intv
        },
    }
}
</script>

<style lang="scss">
#quizContainer{
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
    flex: 2 0;   
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
    overflow-wrap: break-word;
    word-wrap: break-word; 
}

#answer{
    flex: 7 0;
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
#answerB{
    position: relative;
    flex: 6;
    transition: .3s ease;
    overflow-wrap: break-word;
    word-wrap: break-word;
}
#answerB span{
    display: block;
    position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
    transition: .3s ease;
    z-index: 0;
}
#answerB .blur-content{
	-moz-filter: blur(.35em);
	-o-filter: blur(.35em);
	-ms-filter: blur(.35em);
	filter: blur(.35em);
}
#answerB h1{
    position: relative;
    width: 15em;
    margin: auto;
    top: 3.2em;

    font-size: 1.75em;
    text-align: center;

    z-index: 1;
    cursor: pointer;
}
.h1-fade-enter-active, .h1-fade-leave-active {
  transition: all .35s;
}
.h1-fade-enter, .h1-fade-leave-to{
  opacity: 0;
}

#buttonBox{
    flex: 1 0;
    
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
    &:focus {
        background:  #598648;
        outline: 0;
    }
}
#btnN{
    background: #f0b350;
    cursor: pointer;
    &:hover{
        background:  #b1833a;
    }
    &:focus {
        background: #b1833a;
        outline: 0;
    }
}
#btnH{
    background: #b64137;
    cursor: pointer;
    &:hover{
        background:  #8a3129;
    }
    &:focus {
        background:  #8a3129;
        outline: 0;
    }
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