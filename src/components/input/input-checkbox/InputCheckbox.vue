<template>
  <div class="input-checkbox">
    <div v-if="text">{{text}}</div>
    <div v-if="component"><component class="component" :is="component" :param="param"/></div>
    <input type="checkbox" v-model="isCheckedState" ref="inputCheckboxRef">
    <span class="checkmark" @click="checkInput"></span>
  </div>
</template>

<style scoped lang="scss">
    .input-checkbox {
        display: block;
        position: relative;
        padding-left: 28px;
        font-size: 12px;
        font-weight: bold;
        width: fit-content;
    }

    .input-checkbox > input {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;     
    }

    .input-checkbox > .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        border-radius: 4px;
        background-color: #e5e5e5; 
        cursor: pointer;
    }

    .input-checkbox > input:checked ~ .checkmark {
        background-color: #0f0f86;
    }

    .input-checkbox > .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .input-checkbox input:checked ~ .checkmark:after {
        display: block;
    }

    .input-checkbox > .checkmark:after {
        left: 8px;
        top: 4px;
        width: 5px;
        height: 10px;
        border: solid #e5e5e5;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .component {
      margin-top: -5px;
    }

</style>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from '@vue/composition-api';
import Rating from '../../rating/Rating.vue'

export default defineComponent({
  name: 'InputCheckbox',
  components: { 
    Rating
  },
   props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
     component: {
      type: String,
      required: false,
      default: ''
    },
     param: {
      type: String,
      required: false,
      default: ''
    },
    checkedValue: {
      type: String,
      default: 'Y'
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {

      const inputCheckboxRef = ref();

      const state = reactive({
          text: props.label,
          isCheckedState: computed( () => { return props.isChecked })
      });

      function checkInput() {
        inputCheckboxRef.value.checked = !inputCheckboxRef.value.checked;
        if(inputCheckboxRef.value.checked){
            emit('checkboxChange', props.checkedValue);
        }else {
            emit('checkboxChange', '');
        }

      }

      watch( () => state.isCheckedState,
      (val) => {
        if (val) {
          inputCheckboxRef.value.checked = true;
        }else {
          inputCheckboxRef.value.checked = false;
        }
      });


    return {
      ...toRefs(state),
      inputCheckboxRef,
      checkInput
    };

  }
});
</script>
