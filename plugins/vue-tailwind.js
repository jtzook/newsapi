import Vue from 'vue'
import VueTailwind from 'vue-tailwind/dist/full'

import {
  //   TInput,
  //   TTextarea,
  //   TSelect,
  //   TRadio,
  //   TCheckbox,
  //   TButton,
  //   TInputGroup,
  //   TCard,
  //   TAlert,
  TModal
  //   TDropdown,
  //   TRichSelect,
  //   TPagination,
  //   TTag,
  //   TRadioGroup,
  //   TCheckboxGroup,
  //   TTable,
  //   TDatepicker,
  //   TToggle,
  //   TDialog,
} from 'vue-tailwind/dist/components'

const settings = {
  // Use the following syntax
  't-modal': {
    component: TModal,
    props: { hideCloseButton: true }
  }
}

Vue.use(VueTailwind, settings)
