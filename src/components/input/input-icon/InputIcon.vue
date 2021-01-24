<template>
  <div class="input_icon">
    <input type="text" ref="inputIcon" v-model="inputValue" @input="onInput" @blur="clear" placeholder="Please input"/>
    <div class="icon-container"><v-icon class="i-icon" @click="search()" :style="dynamicStyle">mdi-magnify</v-icon></div>
</div>
</template>

<style scoped lang="scss">

.input_icon {
    position:relative;
    width: 100%;
    margin-bottom: 3px;
}

input {
    height: 37px;
    padding-left: 10px;
    padding-right: 35px;
    background-color: white;
    width: 100%;
    border: 1px solid rgb(202, 198, 198);
    outline: none;
}

::-webkit-input-placeholder {
   color: rgb(202, 198, 198);
}

  .input_icon > input[type=text] {
    cursor: text;
  }

.icon-container:hover::after {
  content: "Search";
  position: absolute;
  top: -.90rem;
  right: -2.8rem;
  font-size: 13px;
  width: fit-content;
  padding: 0 4px;
  background: rgba(0,0,0,0.72);
  color: white;
  transform: translateX(-50%);
  z-index: 12px;
}

.i-icon {
    position: absolute;
    bottom: 7px;
    right: 8px;
    width: 24px;
    height: 24px;
    color: #cbc7c7;
    transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transition: 0s !important;
    cursor: pointer;
}

</style>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from '@vue/composition-api';
import store from '../../../store/index';

export default defineComponent({
  name: 'InputIcon',
  setup(props, {emit}) {

    const inputIcon = ref();

    const isChange = ref(false);

    const dynamicStyle = computed( () => { return { color: isChange.value ? 'black': '#cbc7c7' } });

    const filterState = computed( () => { return store.getters.getFilter });

    const state = reactive({
      inputValue: ''
    });

    const onInput = () => {
       state.inputValue = inputIcon.value.value;
       if(inputIcon.value.value) {
         isChange.value = true;
       }else {
         isChange.value = false;
       }
    }

    const search = () => {
      if(inputIcon.value.value) {
        isChange.value = false;
        emit('search', inputIcon.value.value);
      }
    }

    const clear = () => {
      setTimeout(() => {
        if(!inputIcon.value.value) {
          emit('search', '');
        }else {
          state.inputValue = filterState.value.category;
        }
          isChange.value = false;
      }, 500);
    }

    onMounted(() => {
      state.inputValue = filterState.value.category;
    })

    return {
      search,
      inputIcon,
      clear,
      filterState,
      dynamicStyle,
      isChange,
      ...toRefs(state),
      onInput
    }
  }
});
</script>
