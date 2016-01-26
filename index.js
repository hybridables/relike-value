/*!
 * relike-value <https://github.com/hybridables/relike-value>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var relike = require('relike')
var sliced = require('sliced')

/**
 * Will try to promisify `fn` with native Promise,
 * otherwise will use `Bluebird` or you can give
 * different promise module to `relikeValue.promise`, for example `pinkie`.
 *
 * **Example**
 *
 * ```js
 * const fs = require('fs')
 * const request = require('request')
 * const relikeValue = require('relike-all')
 *
 * relikeValue(fs.readFile, 'package.json', 'utf-8').then(data => {
 *   console.log(JSON.parse(data).name)
 * })
 *
 * // handles multiple arguments by default (comes from `request`)
 * relikeValue(request, 'http://www.tunnckocore.tk/').then(result => {
 *   const [httpResponse, body] = result
 * })
 * ```
 *
 * @name   relike-all
 * @param  {Anything} `[args...]` any number of any type from string to function (number, array, boolean, etc)
 * @return {Promise} promise
 * @api public
 */
module.exports = function relikeValue (val) {
  relike.promise = relikeValue.promise
  var args = sliced(arguments)
  if (typeof val !== 'function') {
    return relike.call(this, function () {
      if (require('isarray')(args) && args.length === 1) {
        return args[0]
      }
      return args
    })
  }
  return relike.apply(this, args)
}
