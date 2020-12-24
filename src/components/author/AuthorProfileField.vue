<template>
  <div class="field">
    <label>{{ fieldName }}：</label>
    <template v-if="tag === 'input'">
      <span v-if="!isEditing">{{ fieldValue }}</span>
      <b-form-input
        v-else
        v-model="childFieldValue"
        class="input"
        @input="$emit('update:fieldValue', childFieldValue)"
      />
      <span
        v-if="helpMessage"
        :title="helpMessage"
        class="help-message"
      >
        ❔
      </span>
    </template>
    <template v-else-if="tag === 'textarea'">
      <div v-if="!isEditing">
        <p
          v-for="(item, index) in fieldContent"
          :key="index"
        >
          {{ item }}
        </p>
      </div>
      <b-form-textarea
        v-else
        v-model="childFieldValue"
        rows="10"
        class="textarea"
        @input="$emit('update:fieldValue', childFieldValue)"
      />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    fieldName: {
      type: String,
      default: '名稱',
    },
    fieldValue: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: 'input',
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    helpMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      childFieldValue: this.fieldValue,
    }
  },
  computed: {
    fieldContent() {
      return this.fieldValue.split('\n')
    },
  },
  watch: {
    fieldValue(val) {
      this.childFieldValue = val
    },
  },
}
</script>

<style lang="scss" scoped>
  .field {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;

    label {
      margin-bottom: 0;
    }

    &.introduce {
      label {
        width: 100%;
      }

      div {
        margin-left: 20px;
      }
    }
  }

  .input {
    flex-grow: 1;
    width: auto;
  }

  .edit {
    cursor: pointer;
    color: #238ac5;
  }

  .btn {
    margin-left: 5px;
  }

  .help-message {
    cursor: help;
  }
</style>