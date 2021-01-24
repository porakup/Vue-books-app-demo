<template>
<v-dialog v-model="openModal"
  no-click-animation
  persistent
  max-width="456">
    <v-card>
    <v-card-title class="headline red darken-3">
        <div class="title">Error</div>
      </v-card-title>
    <v-card-text>
      <div class="text">{{errMessage}}</div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="red darken-3" text @click="close">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<style scoped lang="scss">
.title {
  margin-top: -5px;
  color: white;
}

.text {
  color: black;
  padding: 15px;
}
</style>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "@vue/composition-api";


export default defineComponent({
  name: 'ErrorModal',
  props: {
    openModal: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {

    const state = reactive({
      errMessage: ''
    });

    watch( () => props.message,
        async (message) => {
        if (message) {
          state.errMessage = message
        }else {
          state.errMessage = ''
        }
      });

    const close = () => {
      emit('close');
    }

    return {
      ...toRefs(state),
      close
    }
  }
});
</script>