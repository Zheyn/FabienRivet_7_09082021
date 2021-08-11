<template>
  

      
</template>

<script>


export default {
  
  
  

}
 
</script>


<style scoped>


/* EMojiPicker */

.wrapper {
  
  display: inline-block;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 20rem;
  height: 12rem;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66,153,225,.5);
}

.emoji-invoker {
  top: 0.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  
  z-index: 1;
  font-family: Inter;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  overflow-x: hidden;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
  width: 10rem;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #818181;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}


</style>
