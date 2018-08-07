<template>
  <el-autocomplete
    :value="address"
    :fetch-suggestions="lookup"
    :debounce="500"
    :trigger-on-focus="false"
    prefix-icon="el-icon-location-outline"
    placeholder="Введите адрес"
    style="display:block"
    @select="handleSelect"
  />
</template>

<script>
export default {
  name: 'Address',
  props: {
    address: {
      type: String,
      default: '',
    },
    onlyCity: {
      type: Boolean,
      default: false,
    },
  },
  beforeCreate() {
    if (window.google) {
      this.geocoder = new window.google.maps.Geocoder();
    }
  },
  methods: {
    getFormattedAddress(address) {
      const {
        street,
        street_number: number,
        city,
        country: { name },
      } = address;

      const fStreet = street ? `${street}, ` : '';
      const fNumber = number ? `${number}, ` : '';
      const fCity = city ? `${city}, ` : '';

      if (this.onlyCity) {
        return `${fCity}${name}`;
      }

      return `${fStreet}${fNumber}${fCity}${name}`;
    },
    lookup(queryString, cb) {
      this.geocoder.geocode({ address: queryString }, (suggestions, status) => {
        if (status === 'OK') {
          const results = suggestions.map(s => {
            const components = s.address_components;
            if (components && components.length) {
              const location = {
                formatted_address: s.formatted_address,
                country: {
                  name: null,
                  iso: null,
                },
                region: null,
                city: null,
                sublocality: null,
                street: null,
                street_number: null,
                postal_code: null,
                place_id: s.place_id || null,
              };

              components
                .filter(c => Boolean(c.types) && c.types.length)
                .forEach(c => {
                  if (c.types.includes('country')) {
                    location.country = {
                      name: c.long_name,
                      iso: c.short_name || null,
                    };
                  }

                  if (c.types.includes('locality')) {
                    location.city = c.long_name;
                  }

                  if (c.types.includes('administrative_area_level_2')) {
                    location.region = c.long_name;
                  }

                  if (c.types.includes('sublocality_level_1')) {
                    location.sublocality = c.long_name;
                  }

                  if (c.types.includes('route')) {
                    location.street = c.long_name;
                  }

                  if (c.types.includes('street_number')) {
                    location.street_number = c.long_name;
                  }

                  if (c.types.includes('postal_code')) {
                    location.postal_code = c.long_name;
                  }
                });

              return {
                link: location,
                value: this.getFormattedAddress(location),
              };
            }

            return null;
          });
          cb(results);
        } else {
          this.$emit('error', status);
        }
      });
    },
    handleSelect(item) {
      this.$emit('input', { ...item.link, address: item.value });
    },
  },
};
</script>
