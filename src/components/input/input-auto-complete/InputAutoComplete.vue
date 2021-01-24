<template>
  <v-autocomplete
    ref="InputAutoComplete"
    class="input-auto-complete"
    v-bind="$attrs"
    v-on="$listeners"
    :value="autoCompleteModel"
    :item-value="autoCompleteCode"
    :item-text="autoCompleteName"
    :filter="autoCompleteFilter"
    outlined
    dense
    placeholder="Please input"
    :clearable="!!autoCompleteModel"
    :menu-props="{ top: false, offsetY: true }"
    :search-input.sync="autoCompleteQuery"
    @change="changeData">
    <template v-slot:append>
      <v-icon class="i_icon" v-if="!autoCompleteModel || !autoCompleteQuery">mdi-magnify</v-icon>
      <v-icon v-else></v-icon>
    </template>
  </v-autocomplete>
</template>

<style scoped lang="scss">

 .i_icon {
  color: #cbc7c7 !important;
  transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transition: 0s !important;
 }

</style>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api';

export default defineComponent({ 
  name: 'InputAutoComplete',
  props: {
    autoCompleteCode: {
      type: String,
      default: 'autoCompleteCode'
    },
    autoCompleteName: {
      type: String,
      default: 'autoCompleteName'
    }
  },
  setup(props, {emit, attrs}) {

      const InputAutoComplete = ref();

      const state = reactive({
        autoCompleteModel: '',
        autoCompleteQuery: ''
      });


    onMounted( async () => {
        if(typeof attrs.value === 'string'){
          state.autoCompleteModel = attrs.value;
        }
    });

    
      watch( () => attrs.value,
      () => {
        if(typeof attrs.value === 'string'){
        state.autoCompleteModel = attrs.value || '';
      }
        // if (!state.autoCompleteQuery && state.autoCompleteModel) {
        //   emit('search', state.autoCompleteModel)
        // }
      });

      // watch( () => state.autoCompleteQuery,
      // (query) => {
      //   if (query && query.length >= 3) {
      //   emit('search', query)
      // }});

      function changeData () {
        InputAutoComplete.value.focus();
        nextTick(() => {
          InputAutoComplete.value.blur();
        })
        emit('change');
      }

      function autoCompleteFilter(item: any, queryText: string): boolean | void {
        if(typeof props.autoCompleteCode !== 'string' || typeof props.autoCompleteName !== 'string') {
          return;
        }
        const code = item[props.autoCompleteCode].toLowerCase();
        const name = item[props.autoCompleteName].toLowerCase();
        const query = queryText.toLowerCase()

        return code.indexOf(query) > -1 ||
              name.indexOf(query) > -1;
      }

      return {
        ...toRefs(state),
        InputAutoComplete,
        changeData,
        autoCompleteFilter
      }

  }
 });
</script>