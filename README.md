
# term-colors

Convert modern color formats (rgb, hex, hsl) to [ANSI](http://en.wikipedia.org/wiki/ANSI_escape_code) and back again.

This is not a tool for printing colors in your terminal -- it is meant for conversion. For writing stdout with ANSI colors, use
[cli-color](https://github.com/medikoo/cli-color), [colors](https://github.com/marak/colors.js/), or 
[chalk](https://github.com/sindresorhus/chalk).

<img src="http://i.imgur.com/Crbmt0l.png"/>

## Test

    npm test

## API

Pop open a REPL and require `term-colors`.

    var color = require('term-colors');

Convert any format to ansi.

    color('red').ansi();          // 09

    color('#f00').ansi();         // 09

    color('rgb(255,0,0)').ansi(); // 09

Manipulate the values using the [color](https://github.com/harthur/color) api. Output with `#ansi()`.

    color('green');         // 28

    color.negate();         // 213

    color.lighten(0.1);     // 219
    color.darken(0.1);      // 213

    color.saturate(10);     // 216
    color.mix(color('red'); // 202

Convert to other formats if you want

    color().rgb(); // { r: 255, g: 0, b: 0 }

    color().hsl(); // { h: 0, s: 100, l: 50 }

## License

MIT
