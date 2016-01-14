[![github-stats](http://i.imgur.com/1cEkaOy.png)](#)

# `$ github-stats` [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Version](https://img.shields.io/npm/v/github-stats.svg)](https://www.npmjs.com/package/github-stats) [![Downloads](https://img.shields.io/npm/dt/github-stats.svg)](https://www.npmjs.com/package/github-stats) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Visualize stats about GitHub users and projects in your terminal.

This project is under the [`git-stats`](https://github.com/IonicaBizau/git-stats) umbrella. `git-stats` tracks your local commits and the visualization is similar. :sparkle:

[`github-profile-languages`](https://github.com/IonicaBizau/github-profile-languages) provides the same pie chart visualization, but in browser (for users and repositories).

[![github-stats](http://i.imgur.com/JFNQxbv.png)](#)

## Installation

You can install the package globally and use it as command line tool:

```sh
$ npm i -g github-stats
```

Then, run `github-stats --help` and see what the CLI tool can do.

## Example

Here is an example how to use this package as library. To install it locally, as library, you can do that using `npm`:

```sh
$ npm i --save github-stats
```

```js
// Dependencies
var GitHubStats = require("github-stats");

// Create the GitHubStats instance
var stats = new GitHubStats({

    // Enable light theme for calendar
    theme: "LIGHT"

    // Provide the repository and the username
  , repo: "hubber-memory-game"
  , user: "alysonla"

    // Visualize repository, user and calendar stats
  , s_repo: true
  , s_user: true
  , cal: true

    // A token could help to visualize private stats
  , token: "an optional token"
});

// Stringify everything
stats.toString(function (err, output, warns) {
    console.log(err || output);
});
```

## Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md