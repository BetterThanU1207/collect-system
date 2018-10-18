# Tooltip Control

Dependencies:
``` zsh
bower install && npm install
```

Build to dest folder
``` zsh
grunt
```


## Usage

HTML (Jade):
``` jade
  .target(data-tooltip) // required attribute
    .tooltip-content // display: none
      h5 Title
      img(src='...')
      p Foobar
```

JavaScript:
``` javascript
lab.ui.tooltip.init();  // find all targets with data-tooltip attribute
```

or with custom selector

``` javascript
lab.ui.tooltip.init('.mytargets');
```
