## Documentation
You can see below the API reference of this module.

### `GitHubStats(options)`
Creates a new `GitHubStats` instance.

#### Params
- **Object** `options`: An object containing the following fields:
 - `repo` (String): The GitHub repository. It can be the
 - ` (String): The GitHub repository.
 - `theme` (null|String|Object): The theme to use (`"LIGHT"`, `"DARK"`).
   If `null`, no ansi styles will be used. If object, then it should met
   the `git-stats-colors` specifications.

#### Return
- **GitHubStats** The `GitHubStats` instance.

### `fromUser(callback)`
Fetches user stats.

#### Params
- **Function** `callback`: The callback function.

#### Return
- **GitHubStats** The `GitHubStats` instance.

### `fromRepo(callback)`
Fetches repository stats.

#### Params
- **Function** `callback`: The callback function.

#### Return
- **GitHubStats** The `GitHubStats` instance.

### `calendar(callback)`
Fetches user calendar statistics in JSON format.

#### Params
- **Function** `callback`: The callback function.

#### Return
- **GitHubStats** The `GitHubStats` instance.

### `toString(callback)`
Stringifies the statistics.

#### Params
- **Function** `callback`: The callback function.

