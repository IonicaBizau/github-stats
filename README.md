
[![github-stats](http://i.imgur.com/1cEkaOy.png)](#)

# `$ github-stats`

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/github-stats.svg)](https://www.npmjs.com/package/github-stats) [![Downloads](https://img.shields.io/npm/dt/github-stats.svg)](https://www.npmjs.com/package/github-stats) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Visualize stats about GitHub users and projects in your terminal.


This project is under the [`git-stats`](https://github.com/IonicaBizau/git-stats) umbrella. `git-stats` tracks your local commits and the visualization is similar. :sparkle:

[`github-profile-languages`](https://github.com/IonicaBizau/github-profile-languages) provides the same pie chart visualization, but in browser (for users and repositories).


[![github-stats](http://i.imgur.com/JFNQxbv.png)](#)

## :cloud: Installation

You can install the package globally and use it as command line tool:


```sh
$ npm i -g github-stats
```


Then, run `github-stats --help` and see what the CLI tool can do.


```
$ github-stats --help
Usage: github-stats [options]

Options:
  -u, --user <user>        The GitHub user to get stats about.
  -r, --repo <repository>  The full repository name.
  -n, --no-ansi            Disable ansi styles.
  -l, --light              Use the light theme.
  -c, --calendar           Show the calendar.
  --user-stats, --us       Display user stats.
  --repo-stats, --rs       Display repository stats.
  -t, --token <token>      GitHub access token to access private resources or
                           to increase the rate limit.
  -h, --help               Displays this help.
  -v, --version            Displays version information.

Examples:
  gh-stats -u IonicaBizau -r gh-stats --us --rs -c # Show everything
  gh-stats -u IonicaBizau # Show the calendar
  gh-stats -r IonicaBizau/git-stats # Repository stats

Documentation can be found at https://github.com/IonicaBizau/gh-stats
```

## :clipboard: Example


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

## :memo: Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
