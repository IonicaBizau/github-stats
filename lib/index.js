// Dependencies
var GitHubPolyglot = require("gh-polyglot")
  , GitHubCal = require("ghcal")
  , GitStatsColors = require("git-stats-colors")
  , AnsiParser = require("ansi-parser")
  , CliPie = require("cli-pie")
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
        splits = this.repo.splits("/");
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
            repo: (rows - 12) / (this.s_repo && this.s_user ? 4 : 2) - 1
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
            data.cal.output && str += data.cal.res;
        }

        // Display the repo pie
        if (data.s_repo) {
            data.s_repo.err && warns.push(data.s_repo.err);
            if (data.s_repo.output) {
                str += new CliPie(this.size.repo, data.s_repo.res).toString()
            }
        }
        // Display the user pie
        if (data.s_user) {
            data.s_user.err && warns.push(data.s_user.err);
            if (data.s_user.output) {
                str += new CliPie(this.size.user, data.s_user.res).toString()
            }
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

    self.cal && ++reqCout && self.calendar(handler("cal"));
    self.s_repo && ++reqCout && self.fromRepo(handler("repo"))
    self.s_user && ++reqCout && self.fromUser(handler("user"))
};

module.exports = GitHubStats;
