export const stateOptions = [
    { value: "", label: "Choose State" },
    { value: "Bagmati", label: "Bagmati" },
    { value: "Madhesh", label: "Madhesh" },
    { value: "Gandaki", label: "Gandaki" },
    { value: "Lumbini", label: "Lumbini" },
    { value: "Karnali", label: "Karnali" },
    { value: "Sudurpaschim", label: "Sudurpaschim" },
  ];
  
export const cityOptions = [
    { value: "", label: "Choose City" },
    { value: "Kathmandu", label: "Kathmandu" },
    { value: "Bhaktapur", label: "Bhaktapur" },
    { value: "Lalitpur", label: "Lalitpur" },
  ];
  
export const formFields = [
    {
      name: 'name',
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
    },
    {
      name: 'phone',
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
      required: true,
    },
    {
      name: 'email',
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email address",
      required: true,
    },
    {
      name: 'streetaddress',
      label: "Street Address",
      type: "text",
      placeholder: "Enter your street address",
      required: true,
    },
]