/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var testsContext = __webpack_require__(1);

	var runnable = testsContext.keys();

	runnable.forEach(testsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./Dao1901Members.test.js": 2,
		"./Owned.test.js": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Dao1901Members = __webpack_require__(3);

	var assert = __webpack_require__(5).assert;

	var alice = void 0,
	    bob = void 0,
	    carol = void 0;

	// Retrieve the current list of members
	function memberList(daoMembers) {
	  var members = [];
	  var addr = daoMembers.head();
	  while (addr != 0) {
	    if (daoMembers.isMember.call(addr)) {
	      members.push(addr);
	    }
	    addr = daoMembers.subscriptions(addr)[1]; // Access with .next ?
	  }
	  return members;
	}

	function getTransactionError(func) {
	  return Promise.resolve().then(func)
	  // using Geth - a transaction is still created, spending all the gas, but no state changes occur.
	  .then(function (txid) {
	    var tx = _Dao1901Members.web3.eth.getTransaction(txid);
	    var txr = _Dao1901Members.web3.eth.getTransactionReceipt(txid);
	    if (txr.gasUsed === tx.gas) throw new Error("all gas used");
	  })
	  // using TestRPC - actually throws the error
	  .catch(function (err) {
	    return err;
	  });
	}

	function init() {
	  // Give name to accounts
	  alice = _Dao1901Members.web3.eth.accounts[0];
	  console.log('alice: ', alice);
	  bob = _Dao1901Members.web3.eth.accounts[1];
	  console.log('bob: ', bob);
	  carol = _Dao1901Members.web3.eth.accounts[2];
	  console.log('carol: ', carol);
	}

	describe.only('Dao1901Members', function () {
	  before(function () {
	    init();
	  });

	  describe('initialization phase', function () {
	    it('should deploy contract', function () {
	      console.log('Dao1901Members.address', _Dao1901Members.Dao1901Members.address);
	      assert(_Dao1901Members.Dao1901Members.address, "contract is not deployed");
	    });

	    it('should have Alice as owner', function () {
	      console.log('Dao1901Members.owner()', _Dao1901Members.Dao1901Members.owner());
	      assert(_Dao1901Members.Dao1901Members.owner() == alice, "first owner is not contract creator");
	    });

	    it('should have members list head correctly initialized to 0x00', function () {
	      console.log('Dao1901Members.head()', _Dao1901Members.Dao1901Members.head());
	      assert(_Dao1901Members.Dao1901Members.head() == 0x00, "members list head is not correctly initialized");
	    });
	  });

	  describe('Member Management', function () {
	    it('should not have Bob as a member if not added', function () {
	      console.log('Dao1901Members.isMember(bob)', _Dao1901Members.Dao1901Members.isMember(bob));
	      assert(!_Dao1901Members.Dao1901Members.isMember(bob), "Bob is a DAO member before subscribing");
	    });

	    it('should add Bob as a member for 1 year', function () {
	      // subscribe account 1 for 1 year
	      console.log('Owner adds a member...');
	      _Dao1901Members.Dao1901Members.subscribe.sendTransaction(bob, 1, { from: alice });
	      assert(_Dao1901Members.Dao1901Members.isMember(bob), "Bob is not a DAO member after subscribing");
	    });

	    it('should have owner able to revoke a member', function () {
	      console.log('Owner revokes a member...', alice, _Dao1901Members.Dao1901Members.owner());
	      _Dao1901Members.Dao1901Members.subscribe.sendTransaction(bob, 0, { from: alice }); // Subscription ends now
	      assert(!_Dao1901Members.Dao1901Members.isMember(bob), "Bob is still a member after revokation");
	    });

	    it('should readd bob and add carol', function () {
	      console.log('Owner renews Bob subscription and adds Carol as a member...');
	      _Dao1901Members.Dao1901Members.subscribe.sendTransaction(bob, 1, { from: alice }); // renew subscription
	      _Dao1901Members.Dao1901Members.subscribe.sendTransaction(carol, 1, { from: alice }); // add account 2
	      assert(_Dao1901Members.Dao1901Members.isMember(bob), "Bob is not a DAO member after renewal");
	      assert(_Dao1901Members.Dao1901Members.isMember(carol), "Carol is not a DAO member after subscribing");
	    });

	    it('should retrieve the list of members', function () {
	      var members = memberList(_Dao1901Members.Dao1901Members);
	      assert(members.length === 2, "Dao should have 2 members");
	      assert(members.indexOf(bob) !== -1, "Bob should be a member");
	      assert(members.indexOf(carol) !== -1, "Carol should be a member");
	    });

	    it('should revoke head (the last added member) and retrieve list', function () {
	      console.log('Owner revokes head()...', alice, _Dao1901Members.Dao1901Members.owner());
	      _Dao1901Members.Dao1901Members.subscribe.sendTransaction(_Dao1901Members.Dao1901Members.head(), 0, { from: alice });

	      var members = memberList(_Dao1901Members.Dao1901Members);
	      assert(members.length === 1, 'Dao should have 1 members, got ' + members.length);
	      assert(members.indexOf(bob) !== -1, "Bob should be a member");
	      assert(members.indexOf(carol) === -1, "Carol should not be a member");
	    });
	  });

	  describe('Access Control', function () {
	    it('should not be able to add a member if not owner', function () {
	      console.log('Non-owner tries to insert a subscription...');
	      return getTransactionError(function () {
	        return _Dao1901Members.Dao1901Members.subscribe.sendTransaction(carol, 1, { from: carol });
	      }).then(function (err) {
	        assert.isDefined(err, "transaction should have thrown");
	        assert(!_Dao1901Members.Dao1901Members.isMember(carol), "non-owners was able to add a member");
	      });
	    });

	    it('should not be able to transfer ownership if not owner', function () {
	      console.log('Non-owner tries to transfer ownership...');
	      return getTransactionError(function () {
	        return _Dao1901Members.Dao1901Members.changeOwner.sendTransaction(carol, { from: carol });
	      }).then(function (err) {
	        assert.isDefined(err, "transaction should have thrown");
	        assert(_Dao1901Members.Dao1901Members.owner() === alice, "non-owner was able to transfer ownership");
	      });
	    });

	    it('should be able to transfer ownership if owner', function () {
	      console.log('Owner transfer ownership...');
	      _Dao1901Members.Dao1901Members.changeOwner.sendTransaction(bob, { from: alice });
	      assert(_Dao1901Members.Dao1901Members.owner() === bob, "ownership was not transferred to Bob");
	    });

	    it('should be able to add a member if owner', function () {
	      console.log('New owner bob adds carol as a member...');
	      assert(!_Dao1901Members.Dao1901Members.isMember(carol), "Carol should not be a member");
	      _Dao1901Members.Dao1901Members.subscribe.sendTransaction(carol, 1, { from: bob });
	      assert(_Dao1901Members.Dao1901Members.isMember(carol), "Carol was not added by new owner");
	    });
	  });
		});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Web3 Helper
	 * Returns initialized web3 instance
	 *
	 * @author: U-Zyn Chua <chua@uzyn.com>
	 */
	var Web3 = __webpack_require__(4);
	var web3;
	if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	 web3 = new Web3(window.web3.currentProvider);
	} else {
	 web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	}

	module.exports = {
	"Dao1901Members": web3.eth.contract([{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_member","type":"address"},{"name":"_yearsDuration","type":"uint256"}],"name":"subscribe","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"head","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_member","type":"address"}],"name":"isMember","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"subscriptions","outputs":[{"name":"end","type":"uint256"},{"name":"next","type":"address"}],"payable":false,"type":"function"}]).at("0xa4dbe8f496e68506f51cd7d895cef1df45a493ac"),
	"Owned": web3.eth.contract([{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"}]).at("0x05ea78c98f55fd0769ab69b685a702b44fa59926"),
	web3: web3
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("web3");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Owned = __webpack_require__(7);

	var assert = __webpack_require__(5).assert;
	var alice = void 0,
	    bob = void 0,
	    carol = void 0;

	function init() {
	  // Give name to accounts
	  alice = _Owned.web3.eth.accounts[0];
	  console.log('alice: ', alice);
	  bob = _Owned.web3.eth.accounts[1];
	  console.log('bob: ', bob);
	  carol = _Owned.web3.eth.accounts[2];
	  console.log('carol: ', carol);
	}

	describe('Owned', function () {
	  before(function () {
	    init();
	  });

	  it('should deploy contract', function () {
	    console.log('Owned.address', _Owned.Owned.address);
	    assert(_Owned.Owned.address, "contract is not deployed");
	  });

	  it.skip('should not be able to transfer DAO1901 ownership', function () {
	    console.log('Non-owner tries to transfer ownership...', carol, _Owned.Owned.owner());
	    _Owned.Owned.changeOwner.sendTransaction(carol, { from: carol });
	    assert(_Owned.Owned.owner() == alice, "non-owner was able to transfer ownership");
	  });

	  it('should transfer DAO1901 ownership', function () {
	    console.log('Owner transfer ownership...');
	    _Owned.Owned.changeOwner.sendTransaction(bob, { from: alice });
	    assert(_Owned.Owned.owner() == bob, "ownership was not transfered to Bob");
	  });
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Web3 Helper
	 * Returns initialized web3 instance
	 *
	 * @author: U-Zyn Chua <chua@uzyn.com>
	 */
	var Web3 = __webpack_require__(4);
	var web3;
	if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	 web3 = new Web3(window.web3.currentProvider);
	} else {
	 web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	}

	module.exports = {
	"Owned": web3.eth.contract([{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"}]).at("0x810acdfde31839aa1b41ac95bf579cc881692e1a"),
	web3: web3
	};


/***/ }
/******/ ]);
//# sourceMappingURL=c6e287959db72285351cd0b175b01172-output.js.map