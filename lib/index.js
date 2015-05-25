// Dependencies
var GitHubPolyglot = require("gh-polyglot")
  , GitHubCal = require("ghcal")
  , GitStatsColors = require("git-stats-colors")
  , AnsiParser = require("ansi-parser")
  , CliPie = require("cli-pie")
  , Ul = require("ul")
  , Couleurs = require("couleurs")()
  ;

function GitHubStats(options) {

    var splits = null
      , rows = process.stdout.rows || 60
      , cols = process.stdout.rows || 80
      ;

    this.theme = options.theme;
    this.repo = options.repo;
    this.user = options.user;
    if (this.repo) {
        splits = this.repo.split("/");
        if (splits.length === 2) {
            this.user = splits[0];
            this.repo = splits[1];
        }
    }
    this.token = options.token;
    this.s_repo = options.s_repo;
    this.s_user = options.s_user;
    this.cal = options.cal;
    this.size = options.size || "auto";

    if (this.size === "auto") {
        this.size = {
            repo: (rows - (this.cal ? 12 : 0)) / (this.s_repo && this.s_user ? 4 : 2) - 3
        };
        this.size.user = this.size.repo;
    }

    this.size = Ul.merge(this.size, {
        repo: 10
      , user: 10
    });
}

GitHubStats.prototype.fromUser = function (callback) {
    var self = this;
    if (!self.user) {
        callback(new Error("User is missing."));
        return self;
    }
    var stats = new GitHubPolyglot(self.user, self.token);
    stats.userStats(callback);
    return self;
};

GitHubStats.prototype.fromRepo = function (callback) {
    var self = this;

    if (!self.user) {
        callback(new Error("User is missing."));
        return self;
    }
    if (!self.repo) {
        callback(new Error("Repository is missing."));
        return self;
    }

    var stats = new GitHubPolyglot([self.user, self.repo].join("/"), self.token);
    stats.repoStats(callback);
    return self;
};

GitHubStats.prototype.calendar = function (callback) {
    var self = this;
    if (!self.user) {
        return callback(new Error("User is missing."));
    }
    GitHubCal(self.user, function (err, cal) {
        if (err) { return callback(err); }
        if (self.theme) {
            cal = GitStatsColors(cal, self.theme);
        }
        callback(null, cal);
    });
    return self;
};

GitHubStats.prototype.toString = function (callback) {
    var self = this
      , reqCount = 0
      , warns = []
      , data = {}
      , str = ""
      ;

    function done() {

        // Display the calendar
        if (data.cal) {
            data.cal.err && warns.push(data.cal.err);
            data.cal.res && (str += data.cal.res);
        }

        // Display the repo pie
        if (data.repo) {
            data.repo.err && warns.push(data.repo.err);
            if (data.repo.res) {
                str += Couleurs.bold("\nRepository languages\n");
                str += new CliPie(self.size.repo, data.repo.res, {
                    legend: true
                }).toString();
            }
        }
        // Display the user pie
        if (data.user) {
            data.user.err && warns.push(data.user.err);
            if (data.user.res) {
                str += Couleurs.bold("\nUser languages\n");
                str += new CliPie(self.size.user, data.user.res, {
                    legend: true
                }).toString();
            }
        }

        if (self.theme === null) {
            str = AnsiParser.removeAnsi(str);
        }

        callback(null, str, warns);
    }

    function handler(type) {
        return function (err, res) {
            process.nextTick(function () {
                data[type] = { err: err, res: res };
                if (!--reqCount) {
                    done();
                }
            });
        }
    }

    self.cal && ++reqCount && self.calendar(handler("cal"));
    self.s_repo && ++reqCount && self.fromRepo(handler("repo"))
    self.s_user && ++reqCount && self.fromUser(handler("user"))

    if (!reqCount) {
        callback(null, "", []);
    }
};

module.exports = GitHubStats;
