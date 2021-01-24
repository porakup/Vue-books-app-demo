<template>
  <v-select
    ref="selectCustom"
    class="select-custom"
    v-bind="$attrs"
    v-on="$listeners"
    :value="$attrs.value"
    item-color="indigo"
    :append-icon=" !$attrs.value || ($attrs.multiple && !$attrs.value || !$attrs.value.length)? 'mdi-menu-down' : '' "
    :chips="$attrs.multiple"
    :deletable-chips="$attrs.multiple"
    outlined
    :dense="!$attrs.multiple || ($attrs.multiple && !$attrs.value || !$attrs.value.length)"
    clearable
    placeholder="Please select"
    :menu-props="{ top: false, offsetY: true }"
    @change="changeData"/>
</template>

<style scoped lang="scss">

::-webkit-input-placeholder {
   text-align: left;
}

.select_custom .v-input__append-inner {
  margin-top: 9px !important;
}
.v-input__icon--clear {
  margin-top: -1px !important;
}
.v-input__icon--clear button::before {
  font-size: .8em !important;
}
.v-input__icon--clear button::after {
  font-size: .8em !important;
}

</style>

<script lang="ts">
import { defineComponent, nextTick, ref } from '@vue/composition-api';

export default defineComponent({ 
  name: 'SelectCustom'
  ,setup(props, { emit }) {
    
    const selectCustom = ref();

    function changeData () {
      selectCustom.value.focus();
      nextTick(() => {
        selectCustom.value.blur()
      })
      emit('change');
    }

    return {
      selectCustom,
      changeData
    }
  }
});
</script>