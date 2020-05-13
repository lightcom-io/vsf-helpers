# vsf-helpers
A set of helpers for Vue Storefront setups.

## Imgix
### Configuration
```
import { Imgix } from '@lightcom/vsf-helpers'

Vue.use(Imgix, config)
```

Where `config` is an object with imgix endpoints like this:
```json
{
    "default": {
        "url": "https://some-namespace.imgix.net/",
        "defaults": { // Any Imgix compatible query options
            "auto": "format",
            "fit": "crop"
        }
    },
    "other": {
        "url": "https://some-other-namespace.imgix.net/",
        "defaults": { // Any Imgix compatible query options
            "auto": "compress",
        }
    }
}
```

For Vue Storefront this would ideally come from the global config files, so: `Vue.use(Imgix, config.imgix)`

### Usage
An `$imgix` method will be exposed on the Vue prototype.

**$imgix**[.*endpoint*](*image*, *options*)
 - **endpoint**: Any endpoint in the configuration. If omitted, `default` endpoint will be used.
 - **image**: The relative image url.
 - **options**: [Imgix Url API options](https://docs.imgix.com/apis/url).

 
### Examples

#### Vue component template context:

```html
<img :src="$imgix('my-image.jpg')" />

<img :src="$imgix.other('my-other-image.jpg')" />

<img :src="$imgix.other('my-other-image.jpg',{ width: 200, height: 100 })" />
```

#### Vue component script context:
```js
this.$imgix('image.jpg')
```
