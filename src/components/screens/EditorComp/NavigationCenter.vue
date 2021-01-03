<template>
    <div id="navCenter" class="containerDesignHome">
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "@/assets/theme.scss";


#profil{
    display: flex;
    background-color: $div_color;
    width: 250px;
    height: 7em;
    box-shadow: 1px 1px 2px rgb(126, 126, 126);
    border-radius: 1em;

    justify-content: center;
    align-items: center;
    flex-flow: column;

    &:hover {
        color: $hover_color_change;
        cursor: pointer;
    }
}

#profilBild{
    width: 4em;
    height: 4em;
   
    transition: font-size 0.8s;

    display: flex;
    justify-content: center;
    align-items: center;
}

#pb{
    width: 100%;
    border-radius: 5em;
    height: auto;
}

#name{
    margin: .5em;
}
</style>