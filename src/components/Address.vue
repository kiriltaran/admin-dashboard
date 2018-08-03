<template/>

<script>
export default {
  name: 'Address',
  created() {
    if (window.google) {
      this.geocoder = new window.google.maps.Geocoder();
    }
  },
  methods: {
    lookup() {
      this.geocoder.geocode(
        { address: this.companyForm.address, language: 'ru' },
        (results, status) => {
          console.log(status);
          console.log(results);
          // if (status === 'OK') {
          // } else {
          //
          // }
        },
      );
    },
  },
};
</script>
