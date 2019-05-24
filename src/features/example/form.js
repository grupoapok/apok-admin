export default [
  {
    title: "Fieldset 1",
    fields: [
      [
        {
          label: "field1",
          model: "field1",
          type: "text",
          id: "wtf",
          prepend: {
            icon: "face",
            materialIcon: true
          },
          append: {
            icon: 'envelope'
          }
        },
        { label: "field2", model: "field2", type: "password", prepend: "WTF" },
        { label: "field3", model: "field3", type: "textarea" }
      ],
      [
        {
          label: "field4",
          model: "field4",
          type: "select",
          props: {
            options: [
              { value: 1, text: "Option 1" },
              { value: 2, text: "Option 2" },
              { value: 3, text: "Option 3" },
              { value: 4, text: "Option 4" }
            ]
          }
        }
      ]
    ]
  },
  [
    {
      label: 'multiselect',
      model: 'field4',
      type: 'vselect',
      props: {
        clearable: false,
        options: [
          { value: 1, label: "Option 1" },
          { value: 2, label: "Option 2" },
          { value: 3, label: "Option 3" },
          { value: 4, label: "Option 4" }
        ]
      }
    }
  ],
  [
    { label: "field5", model: "field5", type: "calendar" },
    {
      label: "field6",
      model: "field6",
      type: "radio",
      props: {
        options: [
          { value: 1, text: "Option 1" },
          { value: 2, text: "Option 2" },
          { value: 3, text: "Option 3" },
          { value: 4, text: "Option 4" }
        ]
      }
    }
  ],
  [
    {
      label: "field7",
      model: "field7",
      type: "checkbox",
      props: {
        options: [
          { value: 1, text: "Option 1" },
          { value: 2, text: "Option 2" },
          { value: 3, text: "Option 3" },
          { value: 4, text: "Option 4" }
        ]
      }
    },
    { label: "field8", model: "field8", type: "range", props: { min: 1, max: 4 } }
  ],
  [
    {
      label: "field9",
      model: "field9",
      type: "multiselect",
      loading: false,
      props: {
        options: [
          { value: 1, text: "Option 1" },
          { value: 2, text: "Option 2" },
          { value: 3, text: "Option 3" },
          { value: 4, text: "Option 4" }
        ]
      }
    },
    {
      label: "field10",
      model: "field10",
      type: "file",
      props: {
        showThumbnail: true,
        thumbnail: {
          class: "float-right"
        }
      }
    }
  ]
];
